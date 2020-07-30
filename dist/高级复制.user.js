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
})({"Rfy6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.拖拽多选 = 拖拽多选;

function 拖拽多选(Options) {
  let flag = false;
  let 选区 = [0, 0, 0, 0];
  const div = document.createElement("div");
  div.style.cssText = `position: fixed;background: gray;opacity: .3;`;
  document.body.appendChild(div);
  let 选区矩形 = 选区_to_矩形(选区);
  document.addEventListener("mousedown", event => {
    遮罩.remove();

    if (event.ctrlKey) {
      flag = true;
      选区[0] = event.clientX;
      选区[1] = event.clientY;
      event.preventDefault(); // 阻止默认行为

      event.stopPropagation(); // 阻止事件冒泡
    }
  });
  document.addEventListener("mousemove", event => {
    if (!flag) {
      return;
    }

    选区[2] = event.clientX;
    选区[3] = event.clientY;
    选区矩形 = 选区_to_矩形(选区);
    div.style.left = 选区矩形[0] + "px";
    div.style.top = 选区矩形[1] + "px";
    div.style.width = 选区矩形[2] - 选区矩形[0] + "px";
    div.style.height = 选区矩形[3] - 选区矩形[1] + "px";
  });
  document.addEventListener("mouseup", event => {
    if (!flag) {
      return;
    }

    const td_list = Array.from(document.querySelectorAll(Options.targetSelector));
    const 选中 = td_list.filter(el => 矩形相交(选区矩形, HtmlElement_to_矩形(el))); // console.log(选区矩形, 选中.map(HtmlElement_to_矩形), 选中);

    Options.选择完毕(选中);
    选中.map(HtmlElement_to_矩形).forEach(遮罩.add);
    flag = false;
  });
  return event;
}

function HtmlElement_to_矩形(el) {
  const rect = el.getBoundingClientRect();
  return [rect.left, rect.top, rect.right, rect.bottom];
}

function 矩形相交(rect1, rect2) {
  var a_min_x = rect1[0];
  var a_min_y = rect1[1];
  var a_max_x = rect1[2];
  var a_max_y = rect1[3];
  var b_min_x = rect2[0];
  var b_min_y = rect2[1];
  var b_max_x = rect2[2];
  var b_max_y = rect2[3];
  return a_min_x <= b_max_x && a_max_x >= b_min_x && a_min_y <= b_max_y && a_max_y >= b_min_y;
}

function 选区_to_矩形(选区) {
  if (选区[0] > 选区[2] || 选区[1] > 选区[3]) {
    return [选区[2], 选区[3], 选区[0], 选区[1]];
  } else {
    return 选区;
  }
}

var 遮罩;

(function (遮罩) {
  let list = [];

  function add(rect) {
    const div = document.createElement("div");
    div.style.cssText = `position: fixed;background: gray;opacity: .3;`;
    div.style.left = rect[0] + "px";
    div.style.top = rect[1] + "px";
    div.style.width = rect[2] - rect[0] + "px";
    div.style.height = rect[3] - rect[1] + "px";
    list.push(div);
    document.body.appendChild(div);
  }

  遮罩.add = add;

  function remove() {
    list.forEach(el => el.remove());
    list = [];
  }

  遮罩.remove = remove;
})(遮罩 || (遮罩 = {}));
},{}],"FU2n":[function(require,module,exports) {
"use strict";

var _ = require("../util/dom/\u62D6\u62FD\u591A\u9009");

// ==UserScript==
// @name         请求代理
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  请求代理,可以对请求的url进行重定向
// @author       崮生 2234839456@qq.com
// @include      *
// @grant        unsafeWindow
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      shenzilong.cn
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

// ==/UserScript==
(function () {
  return __awaiter(this, void 0, void 0, function* () {
    let a = (0, _.拖拽多选)({
      targetSelector: ".commit-list .commit",

      选择完毕(els) {
        console.log(els);
      }

    });
  });
})();
},{"../util/dom/拖拽多选":"Rfy6"}]},{},["FU2n"], null)