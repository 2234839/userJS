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
exports.getSelectors = getSelectors;
exports.getIndex = getIndex;
exports.nodePath = nodePath;
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
/** 获取一个元素的选择器 */

exports.default = _default;

function getSelectors(el) {
  /** 通过path路径来确定元素 */
  var pathSelectors = nodePath(el).reverse().map(function (el) {
    return el.nodeName + ":nth-child(".concat(getIndex(el), ")");
  }).join('>');
  /** 通过id以及class来确定元素 */

  var id_className = "";
  var id = el.id;
  if (id) id_className += "#".concat(id);
  el.classList.forEach(function (className) {
    id_className += ".".concat(className);
  });
  /** nth-child 选择 看它是第几个元素 */

  var index = getIndex(el);
  /** 最终构造出来的选择器 */

  return "".concat(pathSelectors).concat(id_className, ":nth-child(").concat(index, ")");
}
/** 获取元素它在第几位 */


function getIndex(el) {
  if (el.nodeName === 'HTML') return 1;
  return 1 + Array.from(el.parentElement.children).findIndex(function (child) {
    return child === el;
  });
}
/** 获取一个元素的所有父节点到html为止  */


function nodePath() {
  for (var _len = arguments.length, path = new Array(_len), _key = 0; _key < _len; _key++) {
    path[_key] = arguments[_key];
  }

  while (path[path.length - 1].parentElement != null) {
    path.push(path[path.length - 1].parentElement);
  }
  /** 只需要是HTMLElement的 */


  var HTMLElementPath = path.filter(function (el) {
    return el instanceof HTMLElement;
  });
  return HTMLElementPath;
}
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
Style.message = "\n    border: 1px solid black;\n    background-color: white;\n    position: fixed;\n    top: 20px;\n    left: 30px;\n    animation: llej_myfirst 5s;\n    ";
Style.warning = "\n    border: 1px solid black;\n    background-color: red;\n    position: fixed;\n    top: 20px;\n    left: 30px;\n    ";
Style.note = "\n    border: 1px solid black;\n    background-color: #c6c5ba;\n    position: sticky;\n    top: 20px;\n    left: 30px;\n    width: auto;\n    height: auto;\n    ";
/** 注入动画 */

var keyframes = document.createElement('style');
keyframes.innerHTML = "\n@keyframes llej_myfirst\n{\n    from { background: red; }\n    to { background: yellow; }\n}\n";
document.head.appendChild(keyframes);
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

/** 消息的基类 扩展类记得重写 thatMessage 以免公用出现bug */
var Message =
/*#__PURE__*/
function () {
  function Message(par) {
    _classCallCheck(this, Message);

    this.el = document.createElement('msg-llej');
    /** 用来指向不同的类，以便扩展这个类的类的old_message不被公用 */

    this.autoHideTime = 1000 * 3;
    this.setThis(par);
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
      return new Message(par);
    }
  }]);

  return Message;
}();

exports.Message = Message;
},{"./style":"ui/style.ts"}],"ui/note.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.note = void 0;

var _message = require("./message");

var _style = require("./style");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/** 笔记的 */
var note =
/*#__PURE__*/
function (_Message) {
  _inherits(note, _Message);

  function note(_ref) {
    var _this;

    var el = _ref.el;

    _classCallCheck(this, note);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(note).call(this, {
      msg: '111111111111111111111',
      style: _style.Style.note
    }));
    _this.selectEl = el;
    return _this;
  }

  _createClass(note, [{
    key: "show",
    value: function show() {
      this.selectEl.appendChild(this.el);
      return this;
    }
  }]);

  return note;
}(_message.Message);

exports.note = note;
},{"./message":"ui/message.ts","./style":"ui/style.ts"}],"Command.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandControl = exports.addNote = exports.closeEditSelect = exports.editSelect = exports.deleteSelect = void 0;

var _message = require("./ui/message");

var _note = require("./ui/note");

var _util = require("./util");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** 每一个命令都应该实现的东西 */
var Command =
/*#__PURE__*/
function () {
  function Command(
  /** 要被删除的元素 */
  select) {
    _classCallCheck(this, Command);

    this.selectEL = select;
  }
  /** 执行这个命令 */


  _createClass(Command, [{
    key: "do",
    value: function _do() {
      return this;
    }
    /** 撤销这个命令 */

  }, {
    key: "undo",
    value: function undo() {
      return this;
    }
    /** 重新执行命令 */

  }, {
    key: "redo",
    value: function redo() {
      return this.do();
    }
    /** 将命令变成可以转化为json字符串的对象 */

  }, {
    key: "toCommandJSON",
    value: function toCommandJSON() {
      return {
        selectEL: (0, _util.getSelectors)(this.selectEL),
        constructor: this.__proto__.constructor.name
      };
    }
    /** 加载commandJSON转变为命令,通过泛型来构造对象的方式 */

  }], [{
    key: "load",
    value: function load(obj, CLASS) {
      return new CLASS(document.querySelector(obj.selectEL));
    }
  }]);

  return Command;
}();
/** 删除一个元素 */


var deleteSelect =
/*#__PURE__*/
function (_Command) {
  _inherits(deleteSelect, _Command);

  function deleteSelect() {
    _classCallCheck(this, deleteSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(deleteSelect).apply(this, arguments));
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
  }]);

  return deleteSelect;
}(Command);
/** 使元素可编辑 */


exports.deleteSelect = deleteSelect;

var editSelect =
/*#__PURE__*/
function (_Command2) {
  _inherits(editSelect, _Command2);

  function editSelect() {
    _classCallCheck(this, editSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(editSelect).apply(this, arguments));
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
  }]);

  return editSelect;
}(Command);
/** 使元素不可编辑 */


exports.editSelect = editSelect;

var closeEditSelect =
/*#__PURE__*/
function (_Command3) {
  _inherits(closeEditSelect, _Command3);

  function closeEditSelect() {
    _classCallCheck(this, closeEditSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(closeEditSelect).apply(this, arguments));
  }

  _createClass(closeEditSelect, [{
    key: "do",
    value: function _do() {
      this.selectEL_contentEditable = this.selectEL.contentEditable;
      this.selectEL.contentEditable = 'false';
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.selectEL.contentEditable = this.selectEL_contentEditable;
      return this;
    }
  }]);

  return closeEditSelect;
}(Command);
/** 新增一个笔记 */


exports.closeEditSelect = closeEditSelect;

var addNote =
/*#__PURE__*/
function (_Command4) {
  _inherits(addNote, _Command4);

  function addNote() {
    _classCallCheck(this, addNote);

    return _possibleConstructorReturn(this, _getPrototypeOf(addNote).apply(this, arguments));
  }

  _createClass(addNote, [{
    key: "do",
    value: function _do() {
      this.note = new _note.note({
        el: this.selectEL
      }).show();
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.note.hide();
      return this;
    }
  }, {
    key: "redo",
    value: function redo() {
      this.note.show();
      return this;
    }
  }]);

  return addNote;
}(Command);
/** 命令控制器 */


exports.addNote = addNote;
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

      _message.Message.getMessage({
        msg: '命令栈已空，无法进行撤销'
      }).autoHide();

      return;
    }

    var command = this.commandStack.pop();
    return this.backoutStack.push(command.undo());
  },
  reform: function reform() {
    if (this.backoutStack.length === 0) {
      console.warn('撤销栈已空，无法进行重做');

      _message.Message.getMessage({
        msg: '撤销栈已空，无法进行重做'
      }).autoHide();

      return;
    }

    var command = this.backoutStack.pop();
    return this.commandStack.push(command.redo());
  },
  loadCommandJSON: function loadCommandJSON(obj) {
    if (obj.constructor === "deleteSelect") return Command.load(obj, deleteSelect);
    if (obj.constructor === "editSelect") return Command.load(obj, editSelect);
    if (obj.constructor === "closeEditSelect") return Command.load(obj, closeEditSelect);
    if (obj.constructor === "addNote") return Command.load(obj, addNote);
  },
  getCommandStackJSON: function getCommandStackJSON() {
    return JSON.stringify(this.commandStack.map(function (a) {
      return a.toCommandJSON();
    }));
  },
  loadCommandJsonAndRun: function loadCommandJsonAndRun(str) {
    var _this = this;

    var commandJSON = JSON.parse(str);
    commandJSON.map(this.loadCommandJSON).forEach(function (command) {
      return _this.run(command);
    });
    return true;
  }
};
exports.CommandControl = CommandControl;
},{"./ui/message":"ui/message.ts","./ui/note":"ui/note.ts","./util":"util.ts"}],"ui/warning.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = void 0;

var _message = require("./message");

var _style = require("./style");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Warning =
/*#__PURE__*/
function (_Message) {
  _inherits(Warning, _Message);

  function Warning(_ref) {
    var msg = _ref.msg;

    _classCallCheck(this, Warning);

    return _possibleConstructorReturn(this, _getPrototypeOf(Warning).call(this, {
      msg: msg,
      style: _style.Style.warning
    }));
  }

  return Warning;
}(_message.Message);

exports.Warning = Warning;
},{"./message":"ui/message.ts","./style":"ui/style.ts"}],"网页笔记.ts":[function(require,module,exports) {
"use strict";

var _util = _interopRequireWildcard(require("./util"));

var _config = _interopRequireDefault(require("./config"));

var _Command = require("./Command");

var _warning = require("./ui/warning");

var _message = require("./ui/message");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.32
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @grant        GM_getValue    //油猴的存储接口
// @grant        GM_setValue
// ==/UserScript==
;

(function () {
  /** 调试用 */
  window.CommandControl = _Command.CommandControl;
  console.log(); //为了在非油猴环境下存储依旧能起一部分的作用

  if (window.hasOwnProperty("GM_getValue") && window.hasOwnProperty("GM_setValue")) {
    localStorage.getItem = window.GM_getValue;
    localStorage.setItem = window.GM_setValue;
  }
  /** 存储鼠标所在位置的所有元素 */


  var path;
  /** 被修改后的元素 */

  var editElement = new Set();
  /** 监听鼠标移动 */

  function mouse(event) {
    if (event.target instanceof HTMLElement) {
      path = (0, _util.nodePath)(event.target);
      outline(event.target);
    }
  }

  if (_config.default.elemtEdit) {
    document.addEventListener('mouseover', mouse);
  }
  /** 监测按键事件 */


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
        /** 使元素可编辑 */
        _Command.CommandControl.run(new _Command.editSelect(path[0]));

        break;

      case 'KeyD':
        /** 删除元素 */
        _Command.CommandControl.run(new _Command.deleteSelect(path[0]));

        break;

      case 'KeyC':
        /** 赋值titile */
        _util.default.copyTitle(path[0]);

        if (event.ctrlKey === false) //因为ctrl+c不应该被阻止
          break;

      case "KeyW":
        /** 关闭可编辑 */
        _Command.CommandControl.run(new _Command.closeEditSelect(path[0]));

        break;

      case 'KeyZ':
        /** 撤销 */
        _Command.CommandControl.backout();

        break;

      case "KeyY":
        /** 重做 */
        _Command.CommandControl.reform();

        break;

      case "KeyN":
        /** 新增笔记 */
        _Command.CommandControl.run(new _Command.addNote(path[0]));

        break;

      case "KeyS":
        /** 保存所有的修改 */
        saveChanges(editElement);
        new _message.Message({
          msg: '保存成功'
        }).autoHide();
        break;

      default:
        return true;
    }
  });
  /** 元素失去焦点 */

  document.addEventListener('focusout', function () {
    console.log('元素失去焦点', event.target);
  });
  /** 元素被编辑了 */

  document.addEventListener('input', function (event) {
    if (event.target instanceof HTMLElement) {
      var el = event.target;
      if (el.innerHTML.length > 10 * 1000) new _warning.Warning({
        msg: '该元素文本过大，将不会保存这里的修改，请选择更确定的文本元素。'
      }).autoHide();else editElement.add(el);
    }
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
  /** 保存的路径是页面的路径 */


  var localStorageSaveList = location.origin + location.pathname + '__saveList__llej__';
  /** 保存修改 */

  function saveChanges(editElement) {
    var saveList = localStorage.getItem(localStorageSaveList) ? JSON.parse(localStorage.getItem(localStorageSaveList)) : [];
    var saveSet = new Set(saveList);
    editElement.forEach(function (el) {
      var selectors = (0, _util.getSelectors)(el);
      console.log(selectors);
      saveSet.add(selectors);
      localStorage.setItem(selectors, el.innerHTML);
    });
    localStorage.setItem(localStorageSaveList, JSON.stringify(_toConsumableArray(saveSet)));
  }
  /** 自动保存 */


  setInterval(function () {
    saveChanges(editElement);
    new _message.Message({
      msg: '自动保存成功...'
    }).autoHide();
  }, 1000 * 60);
  /** 加载修改 */

  function loadChanges() {
    var saveList = localStorage.getItem(localStorageSaveList) ? JSON.parse(localStorage.getItem(localStorageSaveList)) : [];
    saveList.forEach(function (selectors) {
      console.log(document.querySelector(selectors));
      document.querySelector(selectors).innerHTML = localStorage.getItem(selectors);
    });
  }

  ;
  window.addEventListener('load', function () {
    loadChanges();
    console.log('加载修改完毕');
  });
})();
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
*      按下 n 将添加一个便签笔记,此命令处于实验期，无法正常使用
*      按下 s 保存你的所有修改  每60秒会自动保存一次
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
},{"./util":"util.ts","./config":"config.ts","./Command":"Command.ts","./ui/warning":"ui/warning.ts","./ui/message":"ui/message.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56537" + '/');

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