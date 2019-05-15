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
var input_copy = document.createElement('input');
input_copy.id = '__'; // input_copy.style.display='none'//不能设置为none因为会导致没有可访问性

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
},{}],"config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  state: 0,
  elemtEdit: location.href.includes('127.0.0.1')
};
exports.default = _default;
},{}],"Command.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandControl = exports.editSelect = exports.deleteSelect = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** 删除一个元素 */
var deleteSelect =
/*#__PURE__*/
function () {
  function deleteSelect(
  /** 要被删除的元素 */
  select) {
    _classCallCheck(this, deleteSelect);

    this.selectEL = select;
  }

  _createClass(deleteSelect, [{
    key: "do",
    value: function _do() {
      this.selectEL_display = this.selectEL.style.display;
      this.selectEL.style.display = "none";
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.selectEL.style.display = this.selectEL_display;
      return this;
    }
  }, {
    key: "redo",
    value: function redo() {
      this.do();
      return this;
    }
  }]);

  return deleteSelect;
}();
/** 使元素可编辑 */


exports.deleteSelect = deleteSelect;

var editSelect =
/*#__PURE__*/
function () {
  function editSelect(
  /** 要操作的元素 */
  select) {
    _classCallCheck(this, editSelect);

    this.selectEL = select;
  }

  _createClass(editSelect, [{
    key: "do",
    value: function _do() {
      this.selectEL_contentEditable = this.selectEL.contentEditable;
      this.selectEL.contentEditable = 'true';
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.selectEL.contentEditable = this.selectEL_contentEditable;
      return this;
    }
  }, {
    key: "redo",
    value: function redo() {
      this.do();
      return this;
    }
  }]);

  return editSelect;
}();
/** 命令控制器 */


exports.editSelect = editSelect;
var CommandControl = {
  commandStack: [],
  backoutStack: [],
  pushCommand: function pushCommand(command) {
    return this.commandStack.push(command);
  },
  run: function run(command) {
    this.backoutStack.splice(0, this.backoutStack.length);
    return this.pushCommand(command.do());
  },
  backout: function backout() {
    if (this.commandStack.length === 0) {
      console.warn('命令栈已空，无法进行撤销');
      return;
    }

    var command = this.commandStack.pop();
    return this.backoutStack.push(command.undo());
  },
  reform: function reform() {
    if (this.backoutStack.length === 0) {
      console.warn('撤销栈已空，无法进行重做');
      return;
    }

    var command = this.backoutStack.pop();
    return this.commandStack.push(command.redo());
  }
};
exports.CommandControl = CommandControl;
},{}],"ui/style.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function Style() {
  _classCallCheck(this, Style);
};

exports.Style = Style;
Style.message = "\n    border: 1px solid black;\n    background-color: white;\n    position: fixed;\n    top: 20px;\n    left: 30px;\n    ";
Style.warning = "\n    border: 1px solid black;\n    background-color: red;\n    position: fixed;\n    top: 20px;\n    left: 30px;\n    ";
},{}],"ui/message.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var _style = require("./style");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var old_message = [];
var new_message = [];

var Message =
/*#__PURE__*/
function () {
  function Message(par) {
    _classCallCheck(this, Message);

    this.el = document.createElement('msg-llej');
    this.autoHideTime = 1000 * 3;
    this.setThis(par);
    new_message.push(this);
  }
  /** 进行一些赋值工作 */


  _createClass(Message, [{
    key: "setThis",
    value: function setThis(_ref) {
      var _ref$style = _ref.style,
          style = _ref$style === void 0 ? _style.Style.message : _ref$style,
          msg = _ref.msg;
      this.el.innerHTML = "\n        <div style=\"".concat(style, "\">").concat(msg, "</div>\n        ");
    }
    /** 展示el */

  }, {
    key: "show",
    value: function show() {
      document.body.appendChild(this.el);
      return this;
    }
    /** 隐藏el */

  }, {
    key: "hide",
    value: function hide() {
      this.el.remove();
      old_message.push(this);
      return this;
    }
    /** 展示el  autoHideTime 毫秒后隐藏*/

  }, {
    key: "autoHide",
    value: function autoHide() {
      var _this = this;

      this.show();
      setTimeout(function () {
        _this.hide();
      }, this.autoHideTime);
      return this;
    }
    /** 获取一个Messag对象，它不一定是新的。这是为了优化内存占用 */

  }], [{
    key: "getMessage",
    value: function getMessage(par) {
      if (old_message.length === 0) {
        /** 没有旧的对象 */
        return new Message(par);
      }

      var msg = old_message.pop();
      msg.setThis(par);
      new_message.push(msg);
      return msg;
    }
  }]);

  return Message;
}();

exports.Message = Message;
},{"./style":"ui/style.ts"}],"网页笔记.ts":[function(require,module,exports) {
"use strict";

var _util = _interopRequireDefault(require("./util"));

var _config = _interopRequireDefault(require("./config"));

var _Command = require("./Command");

var _message = require("./ui/message");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 调试用 */
window.CommandControl = _Command.CommandControl;

(function () {
  //为了在非油猴环境下存储依旧能起一部分的作用
  if (window.hasOwnProperty("GM_getValue") && window.hasOwnProperty("GM_setValue")) {
    localStorage.getItem = window.GM_getValue;
    localStorage.setItem = window.GM_setValue;
  }
  /** 存储鼠标所在位置的所有元素 */


  var path;
  /** 监听鼠标移动 */

  function mouse(event) {
    if (event.target instanceof HTMLElement) {
      path = nodePath(event.target);
      outline(event.target);
    }
  }

  if (_config.default.elemtEdit) {
    document.addEventListener('mouseover', mouse);
  } //监测按键事件


  document.addEventListener('keydown', function (event) {
    var code = event.code;

    if (code === 'F2') {
      return switchState(mouse, event);
    } //有元素获得焦点，视为正在输入文本，不执行下面的功能


    if (document.querySelectorAll(":focus").length > 0) {
      return;
    }

    switch (code) {
      case 'KeyQ':
        _Command.CommandControl.run(new _Command.editSelect(path[0]));

        break;

      case 'KeyD':
        _Command.CommandControl.run(new _Command.deleteSelect(path[0]));

        break;

      case 'KeyC':
        _util.default.copyTitle(path[0]);

        if (event.ctrlKey === false) //因为ctrl+c不应该被阻止
          break;

      case "KeyW":
        path[0].contentEditable = 'false';
        break;

      case 'KeyZ':
        _Command.CommandControl.backout();

        break;

      case "KeyY":
        _Command.CommandControl.reform();

        break;

      default:
        return true;
    }
  });
  /** 元素失去焦点 */

  document.addEventListener('focusout', function () {
    console.log(event.target);
  });
  /** 轮廓线,用以显示当前元素 */

  function outline(elemt) {
    if (elemt.style.outline == "2px solid red") return;
    elemt.style.outline = "2px solid red";
    setTimeout(function () {
      if (elemt == path[0]) {
        outline(elemt);
        return;
      }

      elemt.style.outline = "";
    }, 400);
  }
  /** 获取一个元素的所有父节点到html为止  */


  function nodePath() {
    for (var _len = arguments.length, path = new Array(_len), _key = 0; _key < _len; _key++) {
      path[_key] = arguments[_key];
    }

    while (path[path.length - 1].parentElement != null) {
      path.push(path[path.length - 1].parentElement);
    }

    return path;
  }
  /** 切换状态 */


  function switchState(mouse, event) {
    _config.default.elemtEdit = !_config.default.elemtEdit;
    console.log('切换编辑状态', _config.default.elemtEdit);
    if (_config.default.elemtEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
      document.addEventListener('mouseover', mouse);else document.removeEventListener("mouseover", mouse);
    event.preventDefault();
    event.returnValue = false;
    return false;
  }
})();

var b = new _message.Message({
  msg: '你好'
}).autoHide();
setTimeout(function () {
  var a = _message.Message.getMessage({
    msg: 'hello'
  });

  console.log(a, b, a === b);
  a.show();
}, 4000);
/*
# 使网页可编辑
* 按下F2启用元素编辑，再次按下可以关闭
* 将鼠标移动到你要修改的文本上方
*      按下 q 就会将该元素设为可编辑，对于链接可以按住alt键点击，这样就不会跳转
*      按下 w 设置元素为不可编辑
*      按下 d 就会删除该元素
*      按下 c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）,此命令不可被撤销和重做
*      按下 z 将会撤销一次命令
*      按下 y 将重做一次命令
* 注意！在元素获得焦点（一般是你在输入文本的时候）的情况下，上面这些按键将进行正常的输入
* 对本地打开的网页的修改 需要在浏览器中设置允许插件在文件地址上运行

## 为什么要开发这样一个插件?
* 这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
* 突然察觉我为什么要多此一举?
* 直接在网页中写笔记不好吗
* 所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这些改动永久保存在本地
* 建议允许插件在文件地址上运行
* 正在想方法让笔记存在云端

## v0.19 的更新介绍
* 最近得空了，开始更新
* 新增了撤销和重做功能，优化了代码
* 因为（ctrl + 其他键）的模式 在一些浏览器上还是会出现冲突，故改为F2键来作为开关
* 下一版本将实现便签功能，以及撤销功能
* 正在进行云端存储的后台工作。在不远的将来将实现笔记备份至云端
* 希望各位能将你们想要的功能进行一个反馈
*/
},{"./util":"util.ts","./config":"config.ts","./Command":"Command.ts","./ui/message":"ui/message.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49815" + '/');

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