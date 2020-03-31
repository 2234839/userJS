// ==UserScript==
// @name         自动同步文章
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://zhuanlan.zhihu.com/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

import { gm_ajax_get } from "../util/gm/xhr";

(async function() {
  "use strict";
  // const input = <HTMLInputElement>document.querySelector(".notranslate,.public-DraftEditor-content");
  // input.focus();

  console.log(/** 点一下页面，给页面焦点 */ await gm_ajax_get("http://127.0.0.1:9093/|mouse_left_click:800:600"));
  /** 知乎的编辑器主体 */
  const edit_content = <HTMLInputElement>document.querySelector(".notranslate,.public-DraftEditor-content");
  edit_content.focus();
  console.log(/** 全选 */ await gm_ajax_get("http://127.0.0.1:9093/|key_down:17|key_press:65|key_up:17"));
  console.log(/** 粘贴 */ await gm_ajax_get("http://127.0.0.1:9093/|key_down:17|key_press:86|key_up:17"));
})();
