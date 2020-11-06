// ==UserScript==
// @name         uri preview 预览链接
// @namespace    https://shenzilong.cn.net/
// @version      0.0.1
// @description  预览鼠标指向的链接内容
// @author       崮生 2234839456@qq.com
// @include      *
// @grant        unsafeWindow
// @connect      shenzilong.cn
// @grant        GM.xmlHttpRequest
// ==/UserScript==
//@ts-ignore
import App from "./main.svelte";
async function main() {
  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  const app = new App({
    target: app_div,
  });
}
main();

export const a = 3;
