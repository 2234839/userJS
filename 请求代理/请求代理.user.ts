import App from "./request_agent_interface.svelte";

if (typeof unsafeWindow === "undefined") {
  window.unsafeWindow = window;
} else {
  window = unsafeWindow;
}
const { proxy, unProxy, hook } = require("ajax-hook");
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
// ==/UserScript==
(async function () {
  let Xhr = window.XMLHttpRequest;
  let urlHandler = (url: string) => url;
  proxy({
    //请求发起前进入
    onRequest: (config: any, handler: any) => {
      console.log("[💚开始请求]", config.url, config);
      config.url = urlHandler(config.url);
      /** 关闭 withCredentials 避免触发跨域 */
      config.withCredentials = false;
      handler.next(config);
    },
    //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
    onError: (err: any, handler: any) => {
      handler.next(err);
    },
    //请求成功后进入
    onResponse: (response: any, handler: any) => {
      handler.next(response);
    },
  });
  /** 替换 XMLHttpRequest */
  window.XMLHttpRequest = XMLHttpRequest;
  document.createElementNS("http://www.w3.org/1999/xhtml","div")
  const app_div = document.createElement("div");
  setTimeout(() => {
    document.body.appendChild(app_div);
  }, 1000);
  let defaultCode = `(url) => {
    return "" + url;
  }`;
  const code = localStorage.getItem("urlHandler") || defaultCode;
  setProcessingMethod(eval(code));
  const app = new App({
    target: app_div,
    props: {
      setProcessingMethod,
      defaultCode: code,
    },
  });
  function setProcessingMethod(handler: typeof urlHandler, code?: string) {
    urlHandler = handler;
    if (code) {
      localStorage.setItem("urlHandler", code);
    }
  }
})();
