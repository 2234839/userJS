// ==UserScript==
// @name         祭奠百度
// @namespace    http://tampermonkey.net/
// @version      1.38
// @description  或许未来只有一片精致的灰 ！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==
(() => {
  const style_el = document.createElement("style");

  const gray = `-webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;`;
  style_el.innerHTML = `
    ${pan_contained([
      /** 百度 */
      "baidu",
      /** 百度静态资源 */
      "bdstatic",
      /**  */
      "bdimg",
    ])},
    /** https://pan.baidu.com/buy/checkoutcounter?from=non&vip=1 */
    .cashier-page-logo
    {${gray}}
    `;
  function pan_contained(selector: string[]) {
    return selector
      .map(
        (s) => `[src*=${s}],
          [style*=${s}]`,
      )
      .join(",");
  }
  console.log(style_el.innerHTML);

  document.body.appendChild(style_el);
})();
