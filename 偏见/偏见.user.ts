// ==UserScript==
// @name         偏见
// @namespace    https://shenzilong.cn/
// @version      0.0.1
// @description  偏见是常态，没有偏见是一种很难做到的事情；可用于知乎彻底拉黑
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @grant        unsafeWindow
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.deleteValue
// @grant        GM.registerMenuCommand
// @connect      shenzilong.cn
// ==/UserScript==
import "./视之不见.css";
//@ts-ignore
import ConfigView from "./config.svelte";
import { allRule, config, user_config } from "./config";
import { Flag } from "./flag.enum";
import { AjaxHook } from "../util/ajax-hook";

export async function main() {
  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  new ConfigView({
    target: app_div,
    props: { 重新执行回调: 屏蔽检测循环.reload },
  });
}

type 规则列表 = Required<
  allRule & {
    数据: string[];
  }
>[];

function user_config_transform(config: config): 规则列表 {
  return config
    .filter((el) => new RegExp(el.生效范围正则).test(location.href))
    .map((el) => {
      return el.规则列表.map((规则) => {
        const 处理函数 = (() => {
          try {
            const f = eval(`(${规则.处理函数文本})`);
            if (typeof f === "function") {
              return f;
            } else {
              return () => {
                console.log(
                  `警告： ${el.标签文本} 的 ${规则.处理函数文本} eval 得到的值不是一个函数`,
                );
              };
            }
          } catch (error) {
            return () => {
              console.log(
                `警告： ${el.标签文本} 的 ${规则.处理函数文本} eval 失败`,
                error,
              );
            };
          }
        })();

        return {
          ...规则,
          数据: el.数据,
          处理函数,
        };
      });
    })
    .reduce((a, b) => {
      a.push(...b);
      return a;
    }, [] as 规则列表);
}

namespace 屏蔽检测循环 {
  let 循环id = 0 as any;

  export function stop() {
    clearInterval(循环id);

    const flag_str = Object.keys(Flag).map((k) => Flag[k as keyof typeof Flag]);
    document
      .querySelectorAll(`.${Flag.标识_已被处理}`)
      .forEach((el) => el.classList.remove(...flag_str));
  }

  export function start() {
    console.log("[开启检测循环]");
    const 规则列表 = user_config_transform(user_config);
    AjaxHook.ResHandler = (config, res) => {
      规则列表.forEach((规则) => {
        if (规则.type === "res") {
          const { 处理函数, 数据 } = 规则;
          处理函数(config, res, 数据, Flag);
        }
      });
    };
    循环id = setInterval(() => {
      规则列表.forEach((规则) => {
        if (规则.type === "dom") {
          const { 目标选择器, 处理函数, 数据 } = 规则;
          Array.from(document.querySelectorAll(目标选择器))
            .filter((el) => !el.classList.contains(Flag.标识_已被处理))
            .forEach((el) => {
              try {
                处理函数(el, 数据, Flag);
              } finally {
                el.classList.add(Flag.标识_已被处理);
              }
            });
        }
      });
    }, 800);
  }
  /** 开始循环前会清理之前的循环以及标识 */
  export function reload() {
    stop();
    start();
  }
}

main();
