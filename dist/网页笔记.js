parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"IOSg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.a=void 0;var e="999";exports.a=e;
},{}],"GvD6":[function(require,module,exports) {
"use strict";var e=require("./m1");!function(){var t;console.log(e.a),document.addEventListener("mouseover",function(e){e.target instanceof HTMLElement&&(t=function(e){var t=[e];for(;null!=e.parentElement;)e=e.parentElement,t.push(e);return t}(e.target),function e(n){if("2px solid red"==n.style.outline)return;n.style.outline="2px solid red";setTimeout(function(){n!=t[0]?n.style.outline="":e(n)},500)}(e.target))}),document.addEventListener("keydown",function(e){if(!e.ctrlKey)return!1;switch(e.code){case"KeyQ":t[0].setAttribute("contenteditable","true"),o();break;case"Backspace":n.appendChild(t[0]),n.innerHTML="";break;case"KeyC":o();case"KeyW":console.log("path",t);break;default:return!0}return e.preventDefault(),e.returnValue=!1,!1});var n=document.createElement("div");n.style.display="none";var r=document.createElement("input");function o(){for(var e,n=0;n<t.length-2&&!(e=t[n].getAttribute("title"));n++);r.setAttribute("value",e),r.select(),document.execCommand("copy")}r.setAttribute("type","hidden"),r.setAttribute("readonly","readonly"),document.body.appendChild(r)}();
},{"./m1":"IOSg"}]},{},["GvD6"], null)
//# sourceMappingURL=/网页笔记.js.map