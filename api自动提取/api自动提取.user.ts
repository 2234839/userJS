import util from "../网页笔记/util";
import { api } from "./i_api";
import { apiToTypeScriptCode } from "./parse/apiToTypeScriptCode";
import { getRap2Api } from "./parse/rap2-taobo";
import { getShowDocApi } from "./parse/showDocApi";
import { swagger_bootstrap_ui } from "./parse/swagger-bootstrap-ui";
import { getYapiApi, 修改人列表_扩展 } from "./parse/yapi";

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  使用方式是打开控制台，输入_api你可以看到一些方法，在支持的网站执行对应的方法就ok了，
// @author       崮生 2234839456@qq.com
// @include      *://www.showdoc.cc/*
// @include      *://192.*
// @include      *://rap2.taobao.org/*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
(async function () {
  const uw = window.unsafeWindow ? window.unsafeWindow : window;

  async function getCode(fun: () => Promise<api>) {
    return async () => {
      const api = apiToTypeScriptCode(await fun());
      util.copyTitle(api);
      return api;
    };
  }
  const api = {
    getShowDocApiCode: await getCode(getShowDocApi),
    getYapiApiCode: await getCode(getYapiApi),
    get_swagger_bootstrap_ui_code: await getCode(swagger_bootstrap_ui),
    get_rap2_taobao_code: await getCode(getRap2Api),
  };
  uw._api = api;
  type f = () => Promise<string>;
  let get_api = undefined as undefined | f;
  if (document.getElementById("yapi")) {
    修改人列表_扩展();
    set_default(api.getYapiApiCode);
  }

  /** 设置当前默认使用的api */
  function set_default(f: f) {
    get_api = f;
    复制按钮_扩展();
  }

  function 复制按钮_扩展() {
    const btn = document.createElement("button");
    btn.textContent = "生成代码";
    btn.style.cssText = `
      z-index:60;
      position: fixed;
      top: 100px;right:20px;
    `;
    btn.addEventListener("click", async () => {
      util.copyTitle(await get_api());
      alert("复制成功");
    });
    document.body.appendChild(btn);
  }
  // 拖拽多选();
  // setTimeout(() => {
  //   const code = uw._api.getYapiApiCode();
  //   console.log(code);

  //   util.copyTitle(code);
  // }, 3000);
})();
