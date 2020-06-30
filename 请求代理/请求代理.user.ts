import App from "./request_agent_interface.svelte";

if (typeof unsafeWindow === "undefined") {
  window.unsafeWindow = window;
} else {
  window = unsafeWindow;
  console.log("替换window", window);
}
const { proxy, unProxy, hook } = require("ajax-hook");
// ==UserScript==
// @name         请求代理
// @namespace    http://tampermonkey.net/
// @version      1.0.0
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
      // console.log(err.type);
      handler.next(err);
    },
    //请求成功后进入
    onResponse: (response: any, handler: any) => {
      // console.log(response.response);
      handler.next(response);
    },
  });

  // hook({
  //   //拦截回调
  //   onreadystatechange: function (xhr: any, event: any) {
  //     console.log("onreadystatechange called: %O");
  //     //返回false表示不阻断，拦截函数执行完后会接着执行真正的xhr.onreadystatechange回调.
  //     //返回true则表示阻断，拦截函数执行完后将不会执行xhr.onreadystatechange.
  //     return false;
  //   },
  //   onload: function (xhr: any, event: any) {
  //     console.log("onload called");
  //     return false;
  //   },
  //   //拦截方法
  //   open: function (args: any, xhr: any) {
  //     console.log("[💚打开请求]: method:%s,url:%s,async:%s", args[0], args[1], args[2]);
  //     //拦截方法的返回值含义同拦截回调的返回值
  //     return false;
  //   },
  // });
  // let Hook_XHR = window.XMLHttpRequest;
  // unsafeWindow.XMLHttpRequest = Hook_XHR;
  // window.XMLHttpRequest = Hook_XHR;
  // //@ts-ignore  axios 使用了这个
  // // window._XMLHttpRequest = Hook_XHR;
  // XMLHttpRequest = Hook_XHR;
  console.log("[Hook_XHR]", window, XMLHttpRequest, window.XMLHttpRequest, XMLHttpRequest === window.XMLHttpRequest);
  /** 替换 XMLHttpRequest */
  window.XMLHttpRequest = XMLHttpRequest;
  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  // console.log("[app_div]", App, app_div);
  let defaultCode = `(url) => {
    return "http://192.168.1.45:8082" + url;
  }`;
  const code = localStorage.getItem("urlHandler") || defaultCode;
  setProcessingMethod(eval(code));
  console.log("[code]", code);
  const app = new App({
    target: app_div,
    props: {
      setProcessingMethod,
      defaultCode:code,
    },
  });
  function setProcessingMethod(handler: typeof urlHandler, code?: string) {
    urlHandler = handler;
    if (code) {
      localStorage.setItem("urlHandler", code);
    }
  }
  /** 测试请求 */
  // var xhr = new XMLHttpRequest();
  // xhr.addEventListener("readystatechange", function () {
  //   if (this.readyState === 4) {
  //     console.log(111, this.responseText);
  //   }
  // });
  // xhr.open("GET", "https://shenzilong.cn/util/ip");
  // xhr.send();
})();
