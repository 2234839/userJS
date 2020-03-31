import App from "./app.svelte";
import { CommandControl } from "./function/command";
import { setLocalItem } from "./lib/store";

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.37
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==
(async function() {
  /** 调试用 */
  (<any>window).CommandControl = CommandControl;
  setLocalItem("__开发者__", " 崮生 admin@shenzilong.cn");

  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  const app= new App({
    target: app_div,
  });
})();
