// ==UserScript==
// @name         极客学院md文档中文版图片显示
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  不知到什么原因 http://wiki.jikexueyuan.com/project/material-design/whatis-material-design/material-properties.html 的文档加载不出图片，于是我将他图片的地址修改为github的
// @author       崮生
// @match        http://wiki.jikexueyuan.com/project/material-design/*
// @grant        none
// ==/UserScript==


// parcel build --no-minify --no-source-maps .\极客学院md文档中文版图片显示\极客学院md文档中文版图片显示.ts
(function() {
    'use strict';
   var imgs=Array.from(document.getElementsByTagName("img"))
   imgs.filter(el=>el.src.includes("/project/material-design")).forEach(img=>{
       img.src=`https://github.com/1sters/material_design_zh_2/blob/master/material-design${img.src.split("project/material-design")[1]}?raw=true`
   })
})();