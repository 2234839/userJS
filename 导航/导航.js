// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://shenzilong.cn/markdown.html
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  const menu = document.querySelectorAll("h1,h2,h3,h4,h5,h6,h7,h8");
  const container = document.querySelector("#崮生_userjs_导航") || document.createElement("details");
  if (document.querySelector("html").offsetWidth >= 1200) container.setAttribute("open", "");
  container.id = "#崮生_userjs_导航";
  container.innerHTML = `<summary>目录</summary>`;
  container.style = `
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 1rem;
    top: 1rem
  `;
  document.body.appendChild(container);

  menu.forEach((h) => {
    const level = Number(h.tagName.replace("H", ""));
    const { textContent: title, id } = h;

    const item = document.createElement("a");
    /** 反复横跳是因为中文id在href中是跳不过去的 */
    item.href = "#" + encodeURIComponent(decodeURIComponent(id));
    item.style.marginLeft = level + "rem";
    item.textContent = title;
    container.appendChild(item);
  });
})();
