import { default as AnsiUp } from "ansi_up";

const ansi_up = new AnsiUp();
`
// ==UserScript==
// @name         ansi-to-html
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description
// @author       崮生 2234839456@qq.com
// @include      *://www.showdoc.cc/*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
`;
import "./ansi_to_html.css";
(async function () {
  const btn = document.createElement("button");
  btn.textContent = "美化输出";
  btn.classList.add("llej_userjs_ansi-btn");
  document.body.appendChild(btn);
  btn.addEventListener("click", function () {
    Array.from(document.querySelectorAll(".console-output")).forEach((el) => {
      const html = ansi_up.ansi_to_html(el.innerHTML);
      console.log(el, html);
      el.classList.add("llej_userjs_ansi-pre");
      el.innerHTML = html;
    });
  });
})();
