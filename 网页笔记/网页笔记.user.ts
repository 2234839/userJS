import App from "./app.svelte";
import { saveChanges, loadChanges } from "./function/fun";
import { editElement } from "./state";
import { getLocalItem } from "./lib/store";
import { AllStoreName } from "./config";

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.38
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
  // (<any>window).CommandControl = CommandControl;
  // setLocalItem("__开发者__", " 崮生 admin@shenzilong.cn");
  /** 自动加载本地暂存更改 */
  (async () => {
    const AllStoreStr = await getLocalItem(AllStoreName, undefined);
    if (AllStoreStr === undefined) return console.warn("没有可用的存储库");
    const allStore = JSON.parse(AllStoreStr);
    if (document.readyState === "complete") {
      loadChanges(allStore);
    } else {
      window.addEventListener("load", function() {
        loadChanges(allStore);
      });
    }
  })();
  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  const app = new App({
    target: app_div,
  });

  /** 自动保存修改后的html */
  setInterval(function() {
    saveChanges(editElement);
  }, 1000 * 60);
})();
