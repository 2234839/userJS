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
})({"../网页笔记/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AllStoreName = exports.isDev = void 0;

/** 是不是开发环境 */
const isDev = false;
exports.isDev = isDev;
const config = {
  state: 0,

  /** 是否开启编辑 */
  //是开发环境自动开启
  elementEdit: isDev,

  /** 服务器地址 */
  serverIp: 'https://shenzilong.cn/note/',

  /** 页面的url */
  locationUrl: decodeURIComponent(location.origin + location.pathname),

  /** 存储登录凭证的 */
  loginCredentials: 'loginCredentials'
};
/** 存储命令栈的地方 */

const AllStoreName = '_storeName_llej_' + config.locationUrl;
exports.AllStoreName = AllStoreName;
var _default = config;
exports.default = _default;
},{}],"../网页笔记/util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyTitle = copyTitle;
exports.getSelectors = getSelectors;
exports.getIndex = getIndex;
exports.nodePath = nodePath;
exports.getJSon = getJSon;
exports.ajax_get = ajax_get;
exports.log = log;
exports.default = void 0;

var _config = require("./config");

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

/** 用于复制文本的input */
const input_copy = document.createElement("textarea");
input_copy.id = "__";
input_copy.style.display = "none"; //不能设置为none因为会导致没有可访问性

input_copy.setAttribute("style", `
        position: absolute;
        top: -9999px;
        left: -9999px;`);
document.body.appendChild(input_copy);
/** 复制一个元素的titil 或者一段字符串到剪贴板 */

function copyTitle(el) {
  let title;
  if (typeof el === "string") title = el;else title = el.getAttribute("title");
  input_copy.setAttribute("readonly", "readonly");
  input_copy.setAttribute("value", title);
  input_copy.value = title;
  input_copy.select();
  input_copy.setSelectionRange(0, 9999);
  document.execCommand("copy");
}
/** 工具类 */


var _default = {
  copyTitle
};
/** 获取一个元素的选择器 */

exports.default = _default;

function getSelectors(el) {
  /** 通过path路径来确定元素 */
  let pathSelectors = nodePath(el).reverse().map(el => {
    return el.nodeName + `:nth-child(${getIndex(el)})`;
  }).join(">");
  /** 通过id以及class来确定元素 */

  let id_className = "";
  const id = el.id;
  if (id) id_className += `#${id}`;
  el.classList.forEach(className => {
    id_className += `.${className}`;
  });
  /** nth-child 选择 看它是第几个元素 */

  const index = getIndex(el);
  /** 最终构造出来的选择器 */

  return `${pathSelectors}${id_className}:nth-child(${index})`;
}
/** 获取元素它在第几位 */


function getIndex(el) {
  if (el.nodeName === "HTML") return 1;
  return 1 + Array.from(el.parentElement.children).findIndex(child => child === el);
}
/** 获取一个元素的所有父节点到html为止  */


function nodePath(...path) {
  while (path[path.length - 1].parentElement != null) {
    path.push(path[path.length - 1].parentElement);
  }
  /** 只需要是HTMLElement的 */


  const HTMLElementPath = path.filter(el => el instanceof HTMLElement);
  return HTMLElementPath;
}

function getJSon(url, data) {
  return __awaiter(this, void 0, void 0, function* () {
    const str = yield ajax_get(url, data);
    const res = JSON.parse(str);
    console.log(url, data, res);
    return res;
  });
}
/** 油猴的ajaxget */


function ajax_get(url, data) {
  if (data) url += "?" + jsonToURLpar(data);
  if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: "GET",
      url,
      onload: function (response) {
        resolve(response.responseText);
      },
      onerror: reject
    });
  });else return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      resolve(xhr.responseText);
    });
    xhr.addEventListener("error", reject);
    xhr.open("get", url);
    xhr.send();
  });
}
/** json 转 urlpar 只能转一层 */


function jsonToURLpar(json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
  }).join("&");
}
/** 开发时的调试log */


function log(...arg) {
  if (_config.isDev) console.log(`[dev] `, ...arg);
}
},{"./config":"../网页笔记/config.ts"}],"util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlToName = urlToName;
exports.qALL = qALL;
exports.getTextConten = getTextConten;
exports.getTable = getTable;
exports.getElText = getElText;
exports.copyStr = copyStr;

/** 将url转为友好的名字 */
function urlToName(url) {
  // return url.match(/\d+\.\d+\.\d+\.\d+(.*)/)[1].split('/').map(str => str.replace(/\//g, '')).join('_')
  return url.split("/").map(str => str.replace(/[^a-zA-Z0-9]/g, "_")).join("_");
}

function qALL(selector, t) {
  const res = document.querySelectorAll(selector);

  res.includes = function (text) {
    return Array.from(res).filter(el => {
      return el.textContent.includes(text);
    });
  };

  return res;
}

function getTextConten(el) {
  if (el !== undefined && "textContent" in el) {
    return el.textContent;
  } else {
    console.warn("textContent 属性不存在", el);
    return "";
  }
}
/** 将table元素解析为字符串二维数组 */


function getTable(el, tr_selector = "tr", td_selector = "td",
/** 特定元素的识别器 */
recognizer = {}) {
  console.log("getTable", el);
  const table = [];

  for (let i = 0; i < el.querySelectorAll(tr_selector).length; i++) {
    /** tr */
    const tr_el = el.querySelectorAll(tr_selector)[i];
    const tr = [];

    for (let j = 0; j < tr_el.querySelectorAll(td_selector).length; j++) {
      /** tr */
      const td_el = tr_el.querySelectorAll(td_selector)[j];

      if (recognizer[j] !== undefined) {
        tr.push(recognizer[j](td_el));
      } else {
        tr.push(td_el.textContent.trim());
      }
    }

    table.push(tr);
  }

  return table;
}
/** 获取指定元素的TextContent */


function getElText(selector) {
  const el = document.querySelector(selector);

  if (el === null) {
    return "";
  }

  return el.textContent;
}
/** 复制某个字符串多少次 */


function copyStr(el, length) {
  let str = "";

  for (let index = 0; index < length; index++) {
    str += el;
  }

  return str;
}
},{}],"parse/apiToTypeScriptCode.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiToTypeScriptCode = apiToTypeScriptCode;

var _util = require("../util");

/** 将api转为ts的代码 */
function apiToTypeScriptCode(api) {
  console.log(api);
  const name = (0, _util.urlToName)(api.url);
  return `
        /** ${api.name} */
        static ${name}(params?:
            ${parse_par_List(api.parList)}
        ):Promise< ${parse_par_List(api.resList)} >{ return ${api.method.toLocaleLowerCase()}('${api.url}', params) }`;
}
/** 解析api的par为字符串 */


function parse_par_item(par, level = 0) {
  return `${(0, _util.copyStr)("\t", level)}/** ${par.type} ${par.describe} */${par.name}${par.must ? "" : "?"}: ${(() => {
    if (par.children === undefined) return par.type.replace("string(", "_string(")
    /** string 这种基本类型不能够使用引用的方式解决，所以加上一个_来区分 */
    .replace("number(", "_number(").replace("String", "string")
    /** 基元类型不要用 */
    .replace("Number", "number").replace("Boolean", "boolean").replace("(", "<").replace(")", ">").replace("-", "_");
    return `${parse_par_List(par.children, level + 1)}${
    /** 处理数组类型 */
    par.type.includes("[]") ? "[]" : ""}`;
  })()}`;
}
/** 解析api的par数组为字符串 */


function parse_par_List(par, level = 1) {
  return `{\r${par.map(el => parse_par_item(el, level)).join(",\n")}}`;
}
},{"../util":"util.ts"}],"parse/showDocApi.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShowDocApi = getShowDocApi;

var _util = require("../util");

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

/** 获取showDoc平台的api */
function getShowDocApi() {
  return __awaiter(this, void 0, void 0, function* () {
    const api = {
      url: (0, _util.getTextConten)((0, _util.qALL)("main .main-editor li")[1]),
      name: (0, _util.getTextConten)((0, _util.qALL)("main div")[0]),
      describe: (0, _util.getTextConten)((0, _util.qALL)("main .main-editor li")[1]),
      method: (0, _util.getTextConten)((0, _util.qALL)("main .main-editor li")[2]),
      parList: Array.from((0, _util.qALL)("table")[0].querySelectorAll("tr")).filter((el, i) => {
        return i !== 0;
      }).filter(el => {
        /** 他有时参数列表不全，通过这个去除空 */
        if ((0, _util.getTextConten)(el.querySelectorAll("td")[0]) === "" && (0, _util.getTextConten)(el.querySelectorAll("td")[2]) === "") return false;
        return true;
      }).map(el => {
        return {
          name: (0, _util.getTextConten)(el.querySelectorAll("td")[0]),

          /** 是否必需 */
          must: (0, _util.getTextConten)(el.querySelectorAll("td")[1]) === "是",
          type: (0, _util.getTextConten)(el.querySelectorAll("td")[2]),
          describe: (0, _util.getTextConten)(el.querySelectorAll("td")[3])
        };
      }),

      /** 返回结果的列表 */
      resList: Array.from((0, _util.qALL)("table")[1].querySelectorAll("tr")).filter((el, i) => {
        return i !== 0;
      }).map(el => {
        return {
          name: (0, _util.getTextConten)(el.querySelectorAll("td")[0]),

          /** 是否必需 */
          must: true,
          type: (0, _util.getTextConten)(el.querySelectorAll("td")[1]),
          describe: (0, _util.getTextConten)(el.querySelectorAll("td")[2])
        };
      })
    };
    return api;
  });
}
},{"../util":"util.ts"}],"parse/swagger-bootstrap-ui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swagger_bootstrap_ui = swagger_bootstrap_ui;

var _util = require("../util");

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

/** 获取 swagger_bootstrap_ui 页面的ui */
function swagger_bootstrap_ui() {
  return __awaiter(this, void 0, void 0, function* () {
    const this_tab = document.querySelector('.layui-tab-item.layui-show .swbu-main');
    const par_el = this_tab.querySelectorAll("table")[2];
    const res_el = this_tab.querySelectorAll("table")[6];
    /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */

    const par_table = (0, _util.getTable)(par_el);
    /** 参数名称 参数说明 类型 schema */

    const res_table = (0, _util.getTable)(res_el);
    console.log(par_table, res_table);
    const api = {
      url: this_tab.querySelector('div p:nth-child(1) code').textContent,
      name: (0, _util.getElText)('.layui-tab-item.layui-show .tab-pane div:nth-child(2) div'),
      describe: this_tab.querySelector('div p:nth-child(5) code').textContent,
      method: this_tab.querySelector('div p:nth-child(2) code').textContent,
      parList: reduction_tree(par_el, par_table.map(str_list => {
        return {
          name: str_list[0],
          must: str_list[3] === "true",
          type: str_list[4],
          describe: str_list[1]
        };
      })),
      resList: reduction_tree(res_el, res_table.map(str_list => {
        return {
          name: str_list[0],
          must: undefined,
          type: str_list[2],
          describe: str_list[1]
        };
      }))
    };
    console.log("最终结果", par_table, res_table, api);
    return api;
  });
}
/** 根据table 获取到树的结构 */


function reduction_tree(table, parlist) {
  /** 等级数组 [0,1,1,1,2,2,1,1] 这样的 */
  const level_list = Array.from(table.querySelectorAll('tr td:nth-child(1)')).map(el => {
    /** swagger-bootstrap-ui 层级越高 这种元素越多 */
    return el.querySelectorAll('.treeTable-empty').length;
  });
  /** 最高级 */

  const hierarchy = [];
  let current_hierarchy = hierarchy;

  for (let i = 0; i < level_list.length; i++) {
    const level = level_list[i];

    if (i === 0) {
      current_hierarchy.push(parlist[i]);
      continue;
    }
    /** 同级元素 */


    if (level > level_list[i - 1]) {
      /** 按一般规律来说它就是 当前层级数组最后一个元素的 子级 */
      const parent = current_hierarchy[current_hierarchy.length - 1];

      if (parent.children === undefined) {
        parent.children = [];
      }
      /** 指向下一级 */


      current_hierarchy = parent.children;
    } else if (level === level_list[i - 1]) {
      /** 同级的 */
    } else {
      /** 小于的要提升当前层级 */

      /** 从最高的0级开始降级,直到它所在的等级 */
      let demotion_temp = hierarchy;
      /** 开始降级 */

      for (let i = 0; i < level; i++) {
        /** 按一般规律来说 它一定生成在最后一个元素的子级 */
        demotion_temp = demotion_temp[demotion_temp.length - 1].children;
      }
      /** 指向将到的级别 */


      current_hierarchy = demotion_temp;
    }
    /** 将元素添加到当前层级 */


    current_hierarchy.push(parlist[i]);
  }

  return hierarchy;
}
},{"../util":"util.ts"}],"parse/rap2-taobo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRap2Api = getRap2Api;
exports.reduction_tree = reduction_tree;

var _util = require("../util");

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

/** 获取rap2平台的api */
function getRap2Api() {
  return __awaiter(this, void 0, void 0, function* () {
    console.log("参数列表=========================");
    const par_el = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(2) > div.body > div > div.RSortableWrapper.depth-1");
    /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */

    const par_table = (0, _util.getTable)(par_el, ".SortableTreeTableRow", ".td.payload", [undefined, el => {
      return el.querySelector("input").checked ? "true" : "false";
    }]);
    const res_el = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(3) > div.body > div > div.RSortableWrapper.depth-1");
    /** 参数名称 参数说明 类型 schema */

    const res_table = (0, _util.getTable)(res_el, ".SortableTreeTableRow", ".td.payload", [undefined, el => {
      return el.querySelector("input").checked ? "true" : "false";
    }]);
    console.log("参数和响应", par_el, res_el, par_table, res_table);

    const get_level_list = table => {
      const tr_list = table.querySelectorAll(".SortableTreeTableRow");
      return Array.from(tr_list).map(tr => {
        const match = tr.parentElement.className.match(/depth(\d)/);
        if (match === null) return 0;else {
          return Number(match[1]) + 1;
        }
      });
    };

    const api = {
      url: (0, _util.getElText)(".summary li:nth-child(1) a"),
      name: (0, _util.getElText)("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > div > span"),
      describe: "",
      method: (0, _util.getElText)("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > ul > li:nth-child(2) > span > span:nth-child(2)"),
      parList: reduction_tree(par_el, par_table.map(str_list => {
        return {
          name: str_list[0].replace(/BODY$/, "").replace(/QUERY$/, ""),
          must: str_list[1] === "true",
          type: str_list[2],
          describe: str_list[5]
        };
      }), get_level_list),
      resList: reduction_tree(res_el, res_table.map(str_list => {
        return {
          name: str_list[0],
          must: str_list[1] === "true",
          type: str_list[2],
          describe: str_list[5]
        };
      }), get_level_list)
    };
    console.log("最终结果", par_table, res_table, api);
    return api;
  });
}
/** 根据table 获取到树的结构 */


function reduction_tree(table, parList, get_level_list) {
  /** 等级数组 [0,1,1,1,2,2,1,1] 这样的 */
  const level_list = get_level_list(table);
  /** 最高级 */

  const hierarchy = [];
  let current_hierarchy = hierarchy;

  for (let i = 0; i < level_list.length; i++) {
    const level = level_list[i];

    if (i === 0) {
      current_hierarchy.push(parList[i]);
      continue;
    }
    /** 同级元素 */


    if (level > level_list[i - 1]) {
      /** 按一般规律来说它就是 当前层级数组最后一个元素的 子级 */
      const parent = current_hierarchy[current_hierarchy.length - 1];

      if (parent.children === undefined) {
        parent.children = [];
      }
      /** 指向下一级 */


      current_hierarchy = parent.children;
    } else if (level === level_list[i - 1]) {
      /** 同级的 */
    } else {
      /** 小于的要提升当前层级 */

      /** 从最高的0级开始降级,直到它所在的等级 */
      let demotion_temp = hierarchy;
      /** 开始降级 */

      for (let i = 0; i < level; i++) {
        /** 按一般规律来说 它一定生成在最后一个元素的子级 */
        demotion_temp = demotion_temp[demotion_temp.length - 1].children;
      }
      /** 指向将到的级别 */


      current_hierarchy = demotion_temp;
    }
    /** 将元素添加到当前层级 */


    current_hierarchy.push(parList[i]);
  }

  return hierarchy;
}
},{"../util":"util.ts"}],"../util/dom/elment.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.检测元素状态 = 检测元素状态;
Object.defineProperty(exports, "getSelectors", {
  enumerable: true,
  get: function () {
    return _util.getSelectors;
  }
});

var _util = require("../../\u7F51\u9875\u7B14\u8BB0/util");

function 检测元素状态(selector, 出现, 变化, 消失) {
  let status = false;
  let html = "";
  setInterval(() => {
    const el = document.querySelector(selector);

    if (status && el && el.innerHTML !== html) {
      html = el.innerHTML;
      变化(el);
    }

    if (el && !status) {
      status = true;
      出现(el);
    } else if (!el && status) {
      status = false;
      消失();
    }
  }, 100);
}
},{"../../网页笔记/util":"../网页笔记/util.ts"}],"parse/yapi.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYapiApi = getYapiApi;
exports.修改人列表_扩展 = 修改人列表_扩展;
exports.参数全展开 = 参数全展开;

var _util = require("../util");

var _rap2Taobo = require("./rap2-taobo");

var _elment = require("../../util/dom/elment");

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

const $$ = _util.qALL;
/** 获取Yapi平台的api */

function getYapiApi() {
  return __awaiter(this, void 0, void 0, function* () {
    yield new Promise(s => {
      参数全展开(s);
    });
    const desNodeList = $$(".interface-title").includes("备注");
    const describe = desNodeList.length === 0 ? "" : desNodeList[0].nextElementSibling.textContent;
    const res_el = document.querySelector("div.ant-table-wrapper:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3)");
    /** 参数名称 类型 是否必须 默认值 备注 其他信息*/

    const res_table = (0, _util.getTable)(res_el, "tr", "td", [undefined, undefined, el => {
      return el.textContent !== "非必须" ? "true" : "false";
    }]);
    /** body 参数 */

    const par_table = Array.from($$(".col-title")).filter(el => el.textContent.startsWith("Body"))[0].parentElement.querySelector("table");
    const api = {
      url: $$(".tag-method + span")[0].textContent,
      name: $$(".interface-title + div div div:nth-child(2)")[0].textContent,
      describe,
      method: $$(".tag-method")[0].textContent,
      parList: Array.from(par_table.querySelectorAll("tr")).filter((el, i) => {
        return i !== 0;
      }).map(el => {
        return {
          name: el.querySelectorAll("td")[0].textContent,

          /** 是否必需 */
          must: el.querySelectorAll("td")[2].textContent !== "非必须",
          type: el.querySelectorAll("td")[1].textContent,
          describe: el.querySelectorAll("td")[4].textContent
        };
      }),
      resList: (0, _rap2Taobo.reduction_tree)(res_el, res_table.map(str_list => {
        return {
          name: str_list[0],
          must: str_list[2] === "true",
          type: str_list[1],
          describe: `${str_list[4]} ${str_list[5]}`
        };
      }), el => {
        const tr = el.querySelectorAll("tr");
        return Array.from(tr).map(tr => {
          return Number(tr.className.replace(/.*(\d+)/, "$1"));
        });
      })
    };
    return api;
  });
}

function 修改人列表_扩展() {
  const f = ant_row_2 => {
    const api = location.href.replace(/.*api\/(\d+)/, "$1");
    const project = location.href.replace(/.*project\/(\d+).*/, "$1");
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText).data.list;
        const _edit_list = "_edit_list";
        const edit_list = document.querySelector("." + _edit_list);

        if (edit_list) {
          edit_list.remove();
        }

        const div = document.createElement("div");
        div.classList.add(_edit_list);
        div.innerHTML = data.map(el => {
          return `${new Date(el.add_time * 1000).toLocaleString()} <img src="/api/user/avatar?uid=${el.uid}" style="width: 20px;height: 100%;"/> ${el.content}`;
        }).join("");
        ant_row_2.parentElement.appendChild(div);
      }
    });
    xhr.open("GET", `/api/log/list?typeid=${project}&type=project&page=1&limit=10&selectValue=${api}`);
    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0");
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2");
    xhr.send();
  };

  (0, _elment.检测元素状态)("div.ant-row:nth-child(1)", f, f, () => {});
}

function 参数全展开(cb) {
  const id = setInterval(() => {
    const btn = document.querySelectorAll(".ant-table-row-collapsed");

    if (btn.length) {
      btn.forEach(b => {
        b.click();
      });
    } else {
      clearInterval(id);
      cb();
    }
  }, 350);
}
},{"../util":"util.ts","./rap2-taobo":"parse/rap2-taobo.ts","../../util/dom/elment":"../util/dom/elment.ts"}],"../util/dom/拖拽多选.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.拖拽多选 = 拖拽多选;

function 拖拽多选() {
  let flag = false;
  let 选区 = [0, 0, 0, 0];
  const div = document.createElement("div");
  div.style.cssText = `position: fixed;background: gray;opacity: .3;`;
  document.body.appendChild(div);
  let 选区矩形 = 选区_to_矩形(选区);
  document.addEventListener("mousedown", event => {
    console.log("mousedown", event);
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

    const td_list = Array.from(document.querySelectorAll("td"));
    const 选中 = td_list.filter(el => 矩形相交(选区矩形, HtmlElement_to_矩形(el)));
    console.log(选区矩形, 选中.map(HtmlElement_to_矩形), 选中);
    选中.map(HtmlElement_to_矩形).forEach(遮罩.add);
    flag = false;
  });
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
},{}],"api自动提取.user.ts":[function(require,module,exports) {
"use strict";

var _util = _interopRequireDefault(require("../\u7F51\u9875\u7B14\u8BB0/util"));

var _apiToTypeScriptCode = require("./parse/apiToTypeScriptCode");

var _showDocApi = require("./parse/showDocApi");

var _swaggerBootstrapUi = require("./parse/swagger-bootstrap-ui");

var _yapi = require("./parse/yapi");

var _rap2Taobo = require("./parse/rap2-taobo");

var _ = require("../util/dom/\u62D6\u62FD\u591A\u9009");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  使用方式是打开控制台，输入_api你可以看到一些方法，在支持的网站执行对应的方法就ok了，
// @author       崮生 2234839456@qq.com
// @include      *://www.showdoc.cc/*
// @include      *://192.*
// @include      *://rap2.taobao.org/*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
(function () {
  return __awaiter(this, void 0, void 0, function* () {
    const uw = window.unsafeWindow ? window.unsafeWindow : window;

    function getCode(fun) {
      return __awaiter(this, void 0, void 0, function* () {
        return () => __awaiter(this, void 0, void 0, function* () {
          const api = (0, _apiToTypeScriptCode.apiToTypeScriptCode)(yield fun());

          _util.default.copyTitle(api);

          return api;
        });
      });
    }

    const api = {
      getShowDocApiCode: yield getCode(_showDocApi.getShowDocApi),
      getYapiApiCode: yield getCode(_yapi.getYapiApi),
      get_swagger_bootstrap_ui_code: yield getCode(_swaggerBootstrapUi.swagger_bootstrap_ui),
      get_rap2_taobao_code: yield getCode(_rap2Taobo.getRap2Api)
    };
    uw._api = api;
    let get_api = undefined;

    if (document.getElementById("yapi")) {
      (0, _yapi.修改人列表_扩展)();
      set_default(api.getYapiApiCode);
    }
    /** 设置当前默认使用的api */


    function set_default(f) {
      get_api = f;
      复制按钮_扩展();
    }

    function 复制按钮_扩展() {
      const btn = document.createElement("button");
      btn.textContent = "生成代码";
      btn.style.cssText = `
      z-index:60;
      position: fixed;
      top: 100px;right:20px;
    `;
      btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        _util.default.copyTitle(yield get_api());

        alert("复制成功");
      }));
      document.body.appendChild(btn);
    }

    (0, _.拖拽多选)(); // setTimeout(() => {
    //   const code = uw._api.getYapiApiCode();
    //   console.log(code);
    //   util.copyTitle(code);
    // }, 3000);
  });
})();
},{"../网页笔记/util":"../网页笔记/util.ts","./parse/apiToTypeScriptCode":"parse/apiToTypeScriptCode.ts","./parse/showDocApi":"parse/showDocApi.ts","./parse/swagger-bootstrap-ui":"parse/swagger-bootstrap-ui.ts","./parse/yapi":"parse/yapi.ts","./parse/rap2-taobo":"parse/rap2-taobo.ts","../util/dom/拖拽多选":"../util/dom/拖拽多选.ts"}],"C:/Users/llej/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63807" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["C:/Users/llej/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","api自动提取.user.ts"], null)
//# sourceMappingURL=/api自动提取.user.js.map