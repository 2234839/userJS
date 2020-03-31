// ==UserScript==
// @name         请求代理
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  console.log(666);
  let handler = {
    get: function(target: typeof XMLHttpRequest, name: keyof typeof XMLHttpRequest) {
      console.log("XMLHttpRequest", name);

      return target[name];
    },
  };

  XMLHttpRequest = new Proxy(XMLHttpRequest, handler);
  // Your code here...
})();
