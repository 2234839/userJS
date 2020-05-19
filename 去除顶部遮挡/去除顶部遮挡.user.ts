// ==UserScript==
// @name         去除顶部遮挡
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  我算法不太行可能通用性不行，自测(简书，google)没问题
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @grant        unsafeWindow
// @connect      shenzilong.cn

import { debounce } from "../util/fun/防抖";
import { getSelectors } from "../网页笔记/util";

// ==/UserScript==
(async function () {
  const uw = window.unsafeWindow ? window.unsafeWindow : window;
  const style = document.createElement("style");
  const className = "llej_hide";
  style.innerHTML = `
  .${className}{
    opacity:0
  }
  `;
  document.body.appendChild(style);
  window.addEventListener(
    "scroll",
    debounce((event: Event) => {
      if (document.documentElement.scrollTop < 100) {
        /** 还原 */
        // console.log("小于100", document.querySelectorAll("." + className));
        return Array.from(document.querySelectorAll("." + className)).forEach((el) => el.classList.remove(className));
      }
      if (document.querySelectorAll("." + className).length) {
        /** 已存在疑似者，不在捕获 */
        return;
      }
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      const top_el = document.elementFromPoint(x, 30);
      const center_el = document.elementFromPoint(x, y);
      // console.log(top_el, center_el);
      const top_selector = getSelectors(top_el);
      const center_selector = getSelectors(center_el);
      const min_length = top_selector.length < center_selector.length ? top_selector.length : center_selector.length;
      /** 获取最顶上的和主体不一致的元素的和主体同一级的祖先元素 */
      let top_parent_selector: string;
      for (let i = 0; i < min_length; i++) {
        if (top_selector[i] !== center_selector[i]) {
          top_parent_selector = top_selector.slice(0, i) + top_selector.slice(i).replace(/(.*?)>.*/, "$1");
          break;
        }
      }
      const top_parent = document.querySelector(top_parent_selector) as HTMLElement;
      if (isHeader(top_parent)) {
        top_parent.classList.add(className);
        console.log(top_parent_selector, center_selector);
      }
    }, 100),
  );
})();

function isHeader(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  console.log("疑似者", {
    "rect.bottom ": rect.bottom,
    "rect.top ": rect.top,
  });

  if (/** 高过一百px不再可能是了吧 */ rect.bottom > 100) {
    return false;
  }
  return true;
}
