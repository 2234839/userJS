// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"IOSg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = void 0;
var a = "导入模块的尝试";
exports.a = a;
},{}],"GvD6":[function(require,module,exports) {
"use strict";

var _m = require("./m1");

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.17
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  console.log(_m.a); //对本地打开的网页的修改貌似无法保存......
  //获取鼠标位置

  var path;
  document.addEventListener('mouseover', function (event) {
    if (event.target instanceof HTMLElement) {
      path = nodePath(event.target);
      outline(event.target);
    }
  }); //监测 shift+?事件

  document.addEventListener('keydown', function (event) {
    if (!event.ctrlKey) return false;

    switch (event.code) {
      case 'KeyQ':
        editSelect();
        break;

      case 'Backspace':
        deleteSelect();
        break;

      case 'KeyC':
        //c
        copyTitle();
      //复制title  这里不加break是为了不影响正常的复制行为

      case "KeyW":
        //w
        console.log("path", path);
        break;

      default:
        return true;
    } //屏蔽浏览器对于这些快捷键的响应避免一些奇奇怪怪的操作


    event.preventDefault();
    event.returnValue = false;
    return false;
  });
  /**
   * 设置元素可编辑并获取 逐级向上获取titile
   */

  function editSelect() {
    var selectElem = path[0];
    selectElem.setAttribute("contenteditable", "true");
    copyTitle();
  }

  var div = document.createElement('div');
  div.style.display = "none";
  /**
   * 移除选中的元素 不使用remove 是因为这个方法并没有真正删除
   */

  function deleteSelect() {
    div.appendChild(path[0]);
    div.innerHTML = "";
  }

  var input = document.createElement('input');
  input.setAttribute('type', 'hidden');
  input.setAttribute('readonly', 'readonly');
  document.body.appendChild(input);
  /**
  * 设置一个影藏的文本框用来复制文本
  */

  function copyTitle() {
    //获取元素的描述并将他们添加到剪贴板  目前支持mdn 其它的可能支持
    var title; //这里抛弃后两个元素是因为他们不是一般的elem元素了

    for (var index = 0; index < path.length - 2; index++) {
      title = path[index].getAttribute("title");
      if (title) break;
    }

    input.setAttribute('value', title);
    input.select();
    document.execCommand('copy'); //复制
  }

  function outline(elemt) {
    if (elemt.style.outline == "2px solid red") return;
    elemt.style.outline = "2px solid red";
    setTimeout(function () {
      if (elemt == path[0]) {
        outline(elemt);
        return;
      }

      elemt.style.outline = "";
    }, 500);
  }
  /**
   * 获取一个元素的所有父节点到html为止
   */


  function nodePath(node) {
    var path = [node];

    while (node.parentElement != null) {
      node = node.parentElement;
      path.push(node);
    }

    return path;
  }
})();
/*
# 使网页可编辑
* 将鼠标移动到你要修改的文本上方 按下 ctrl+q 就会将该元素设为可编辑，并且复制它的title到剪贴板中
*                               按下 ctrl+ Backspace （删除键） 就会删除该元素
*                               按下 ctrl+c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）
## 为什么要开发这样一个插件?
* 这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
* 突然察觉我为什么要多此一举?
* 直接在网页中写笔记不好吗
* 所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这些改动永久保存在本地
* 建议允许插件在文件地址上运行
## v0.17 的更新介绍
* 这次主要是修改了逻辑，更加优雅，还有添加了红边框能更清楚的知道到底是再对那个元素进行了操作
*/
},{"./m1":"IOSg"}]},{},["GvD6"], null)
//# sourceMappingURL=/网页笔记.js.map
