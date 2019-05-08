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
})({"util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** 用于复制文本的input */
var input_copy = document.createElement('input'); // input_copy.style.display='none'//不能设置为none因为会导致没有可访问性

input_copy.setAttribute('style', "\n        position: absolute;\n        top: -9999px;\n        left: -9999px;");
document.body.appendChild(input_copy);
/** 工具类 */

var _default = {
  /** 复制一个元素的titil 或者一段字符串到剪贴板 */
  copyTitle: function copyTitle(el) {
    var title;
    if (typeof el === 'string') title = el;else title = el.getAttribute("title");
    input_copy.setAttribute('readonly', 'readonly');
    input_copy.setAttribute('value', title);
    input_copy.select();
    input_copy.setSelectionRange(0, 9999);
    document.execCommand('copy');
  }
};
exports.default = _default;
console.log(1211);
},{}],"网页笔记.ts":[function(require,module,exports) {
var global = arguments[3];
"use strict";

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

"use strict"; // ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.18
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @grant        GM_getValue    //油猴的存储接口
// @grant        GM_setValue
// ==/UserScript==


(function () {
  'use strict'; //为了在非油猴环境下存储依旧能起一部分的作用

  if (window.hasOwnProperty("GM_getValue") && window.hasOwnProperty("GM_setValue")) {
    localStorage.getItem = window.GM_getValue;
    localStorage.setItem = window.GM_setValue;
  } //对本地打开的网页的修改 需要在浏览器中设置允许在文件地址上运行

  /** 存储鼠标所在位置的所有元素 */


  var path;
  /** 监听鼠标移动 */

  function mouse(event) {
    if (event.target instanceof HTMLElement) {
      path = nodePath(event.target);
      outline(event.target);
    }
  }

  var global = {
    state: 0,
    elemtEdit: false
  }; //监测按键事件

  document.addEventListener('keydown', function (event) {
    var code = event.code;

    if (code === 'F2') {
      global.elemtEdit = !global.elemtEdit;
      console.log('切换编辑状态', global.elemtEdit);
      if (global.elemtEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
        document.addEventListener('mouseover', mouse);else document.removeEventListener("mouseover", mouse);
      event.preventDefault();
      event.returnValue = false;
      return false;
    } //有元素获得焦点，视为正在输入文本，不执行下面的功能


    if (document.querySelectorAll(":focus").length > 0) {
      return true;
    }

    switch (code) {
      case 'KeyQ':
        editSelect();
        break;

      case 'KeyD':
        deleteSelect();
        break;

      case 'KeyC':
        _util.default.copyTitle(path[0]);

        if (event.ctrlKey === false) //因为ctrl+c不应该被阻止
          break;

      case "KeyW":
        console.log("path", path);
        break;

      default:
        return true;
    }
  });
  /** 监听焦点事件，用于判断元素是否被修改 */

  function focus(event) {
    console.log(event);
  }

  document.addEventListener('focus', focus, true); //useCapture  参数设为true来实现事件委托，但不同浏览器的实现可能不同.....

  /** 设置元素可编辑并获取 逐级向上获取titile*/

  function editSelect() {
    var selectElem = path[0];
    selectElem.contentEditable = 'true';

    _util.default.copyTitle(selectElem);
  }

  var div = document.createElement('div');
  div.style.display = "none";
  /** 移除选中的元素 不使用remove 是因为这个方法并没有真正删除 */

  function deleteSelect() {
    div.appendChild(path[0]);
    div.innerHTML = "";
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
  /** 获取一个元素的所有父节点到html为止 */


  function nodePath() {
    for (var _len = arguments.length, path = new Array(_len), _key = 0; _key < _len; _key++) {
      path[_key] = arguments[_key];
    }

    while (path[path.length - 1].parentElement != null) {
      path.push(path[path.length - 1].parentElement);
    }

    return path;
  }
})();
/*
# 使网页可编辑
* 按下F2启用元素编辑，再次按下可以关闭
* 将鼠标移动到你要修改的文本上方 按下 q 就会将该元素设为可编辑，并且复制它的title到剪贴板中
*                           按下 d 就会删除该元素
*                           按下 c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）
* 注意！在元素获得焦点（一般是你在输入文本的时候）的情况下，上面这些按键将进行正常的输入

## 为什么要开发这样一个插件?
* 这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
* 突然察觉我为什么要多此一举?
* 直接在网页中写笔记不好吗
* 所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这些改动永久保存在本地
* 建议允许插件在文件地址上运行
* 正在想方法让笔记存在云端

## v0.19 的更新介绍
* 最近得空了，开始更新
* 因为（ctrl + 其他键）的模式 在一些浏览器上还是会出现冲突，故改为F2键来作为开关
* 下一版本将实现便签功能，以及撤销功能
* 正在进行云端存储的后台工作。在不远的将来将实现笔记备份至云端
* 希望各位能将你们想要的功能进行一个反馈
*/
},{"./util":"util.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50678" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","网页笔记.ts"], null)
//# sourceMappingURL=../dist/网页笔记.js.map