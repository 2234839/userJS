"use strict";
// ==UserScript==
// @name         允许copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.removeEventListener('copy', getEventListeners(document).copy[0].listener);
        }, 2000);
    });
    function getEventListeners(dom) {
        return window.getEventListeners(dom);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsdUJBQXVCO0FBQ3ZCLHlDQUF5QztBQUN6QyxvQkFBb0I7QUFDcEIsNENBQTRDO0FBQzVDLG9CQUFvQjtBQUNwQix3Q0FBd0M7QUFDeEMscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUVsQixDQUFDO0lBQ0csWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBQztRQUMzQixVQUFVLENBQUM7WUFDUCxRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0RixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsaUJBQWlCLENBQUMsR0FBTztRQUM5QixPQUFhLE1BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9