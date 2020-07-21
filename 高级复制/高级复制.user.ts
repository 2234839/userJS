// ==UserScript==
// @name         请求代理
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  请求代理,可以对请求的url进行重定向
// @author       崮生 2234839456@qq.com
// @include      *
// @grant        unsafeWindow
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      shenzilong.cn

import { 拖拽多选 } from "../util/dom/拖拽多选";
// ==/UserScript==
(async function () {
  let a = 拖拽多选({
    targetSelector: ".commit-list .commit",
    选择完毕(els) {
      console.log(els);
    },
  });
})();
