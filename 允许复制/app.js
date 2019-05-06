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
    document.removeEventListener('copy', window.getEventListeners(document).copy[0].listener);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsdUJBQXVCO0FBQ3ZCLHlDQUF5QztBQUN6QyxvQkFBb0I7QUFDcEIsNENBQTRDO0FBQzVDLG9CQUFvQjtBQUNwQix3Q0FBd0M7QUFDeEMscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUVsQixDQUFDO0lBQ0csWUFBWSxDQUFDO0lBRWIsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzdGLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==