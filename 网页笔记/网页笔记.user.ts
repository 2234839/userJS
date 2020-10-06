import { AllStoreName } from "./config";
import { CommandControl } from "./fun/command";
import { saveChanges } from "./fun/fun";
import App from "./layout_div.svelte";
import { setLocalItem } from "./lib/store";
import { editElement } from "./state/index";

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.42
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// ==/UserScript==
(async function () {
  if (typeof unsafeWindow !== "undefined") {
    window = unsafeWindow;
  }
  /** 调试用 */
  (<any>window).CommandControl = CommandControl;
  /** 清除当前这个页面的修改 */
  (<any>window).llej_pageNotes_clearCurrentStore = () => {
    setLocalItem(AllStoreName, undefined);
    location.reload();
  };

  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  const app = new App({
    target: app_div,
  });

  /** 自动保存修改后的html  */
  setInterval(
    /**
     *  **一分钟保存一次**
     */
    function () {
      saveChanges(editElement);
    },
    1000 * 60,
  );
})();
