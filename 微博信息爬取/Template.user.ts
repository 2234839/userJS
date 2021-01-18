// ==UserScript==
// @name         qq邮件导出
// @namespace    https://shenzilong.cn.net/
// @version      0.0.1
// @description  从qq邮箱导出邮件
// @author       崮生 2234839456@qq.com
// @include      *://mail.qq.com*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==

export async function main() {
  var scroll = {
    get height() {
      return document.scrollingElement.scrollHeight;
    },
    get top() {
      return;
    },
    set top(value: number) {
      document.scrollingElement.scrollTop = value;
    },
  };

  /** 触发当前页所有博文的加载 */
  async function loadAllCard() {
    scroll.top = scroll.height;
    await awaitTime(300);
    if (document.querySelector(`.WB_cardwrap[node-type="lazyload"]`) === null) {
      return;
    } else {
      return await loadAllCard();
    }
  }

  await loadAllCard();
  // 展开全文
  for (let el of document.querySelectorAll(".WB_text_opt[target]")) {
    await awaitTime(100);
    (el as HTMLAnchorElement).click();
  }
  // 展开评论
  for (let el of document.querySelectorAll(".WB_feed_handle .WB_row_line li:nth-child(3):not(.curr) a")) {
    await awaitTime(100);
    (el as HTMLAnchorElement).click();
  }
}
async function awaitTime(t = 100) {
  return new Promise((s) => {
    setTimeout(() => {
      s(1);
    }, t);
  });
}
main();
