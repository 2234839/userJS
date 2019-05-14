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
    const old_addEventListener = window.addEventListener
    window.addEventListener('load',function(){
        setTimeout(() => {
            document.removeEventListener('copy', getEventListeners(document).copy[0].listener)
            console.log('解除cop禁制成功 ');

        }, 2000);
    })
    function getEventListeners(dom:any){
        return (<any>window).getEventListeners(dom)
    }
})();