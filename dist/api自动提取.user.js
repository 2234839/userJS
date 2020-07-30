(function () {
  // ASSET: /home/llej/code/userJS/node_modules/@babel/runtime/helpers/interopRequireWildcard.js
  var $dd031bb0320287bc488fdc11ce08efff$exports = {};
  // ASSET: /home/llej/code/userJS/node_modules/@babel/runtime/helpers/typeof.js
  var $a56642831ea6dfc7295369443c233c7$exports = {};

  function $a56642831ea6dfc7295369443c233c7$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $a56642831ea6dfc7295369443c233c7$exports = $a56642831ea6dfc7295369443c233c7$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $a56642831ea6dfc7295369443c233c7$exports = $a56642831ea6dfc7295369443c233c7$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $a56642831ea6dfc7295369443c233c7$var$_typeof(obj);
  }

  $a56642831ea6dfc7295369443c233c7$exports = $a56642831ea6dfc7295369443c233c7$var$_typeof;

  function $dd031bb0320287bc488fdc11ce08efff$var$_getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    $dd031bb0320287bc488fdc11ce08efff$var$_getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };

    return cache;
  }

  function $dd031bb0320287bc488fdc11ce08efff$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || $a56642831ea6dfc7295369443c233c7$exports(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }

    var cache = $dd031bb0320287bc488fdc11ce08efff$var$_getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj["default"] = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  $dd031bb0320287bc488fdc11ce08efff$exports = $dd031bb0320287bc488fdc11ce08efff$var$_interopRequireWildcard;
  // ASSET: /home/llej/code/userJS/网页笔记/util.ts
  var $ccf365ea3c49e3fe434086516e090c39$exports = {};
  Object.defineProperty($ccf365ea3c49e3fe434086516e090c39$exports, "__esModule", {
    value: true
  });
  var $ccf365ea3c49e3fe434086516e090c39$export$copyTitle = $ccf365ea3c49e3fe434086516e090c39$var$copyTitle;
  $ccf365ea3c49e3fe434086516e090c39$exports.copyTitle = $ccf365ea3c49e3fe434086516e090c39$export$copyTitle;
  var $ccf365ea3c49e3fe434086516e090c39$export$getSelectors = $ccf365ea3c49e3fe434086516e090c39$var$getSelectors;
  $ccf365ea3c49e3fe434086516e090c39$exports.getSelectors = $ccf365ea3c49e3fe434086516e090c39$export$getSelectors;
  var $ccf365ea3c49e3fe434086516e090c39$export$getIndex = $ccf365ea3c49e3fe434086516e090c39$var$getIndex;
  $ccf365ea3c49e3fe434086516e090c39$exports.getIndex = $ccf365ea3c49e3fe434086516e090c39$export$getIndex;
  var $ccf365ea3c49e3fe434086516e090c39$export$nodePath = $ccf365ea3c49e3fe434086516e090c39$var$nodePath;
  $ccf365ea3c49e3fe434086516e090c39$exports.nodePath = $ccf365ea3c49e3fe434086516e090c39$export$nodePath;
  var $ccf365ea3c49e3fe434086516e090c39$export$getJSon = $ccf365ea3c49e3fe434086516e090c39$var$getJSon;
  $ccf365ea3c49e3fe434086516e090c39$exports.getJSon = $ccf365ea3c49e3fe434086516e090c39$export$getJSon;
  var $ccf365ea3c49e3fe434086516e090c39$export$ajax_get = $ccf365ea3c49e3fe434086516e090c39$var$ajax_get;
  $ccf365ea3c49e3fe434086516e090c39$exports.ajax_get = $ccf365ea3c49e3fe434086516e090c39$export$ajax_get;
  var $ccf365ea3c49e3fe434086516e090c39$export$log = $ccf365ea3c49e3fe434086516e090c39$var$log;
  $ccf365ea3c49e3fe434086516e090c39$exports.log = $ccf365ea3c49e3fe434086516e090c39$export$log;
  var $ccf365ea3c49e3fe434086516e090c39$export$default = void 0;
  $ccf365ea3c49e3fe434086516e090c39$exports.default = $ccf365ea3c49e3fe434086516e090c39$export$default;
  // ASSET: /home/llej/code/userJS/网页笔记/config.ts
  var $c64c8b68d983537dbd9feab4499457$exports = {};
  Object.defineProperty($c64c8b68d983537dbd9feab4499457$exports, "__esModule", {
    value: true
  });
  var $c64c8b68d983537dbd9feab4499457$export$default = ($c64c8b68d983537dbd9feab4499457$export$AllStoreName = ($c64c8b68d983537dbd9feab4499457$export$isDev = void 0, $c64c8b68d983537dbd9feab4499457$exports.isDev = $c64c8b68d983537dbd9feab4499457$export$isDev), $c64c8b68d983537dbd9feab4499457$exports.AllStoreName = $c64c8b68d983537dbd9feab4499457$export$AllStoreName);
  $c64c8b68d983537dbd9feab4499457$exports.default = $c64c8b68d983537dbd9feab4499457$export$default;

  /** 是不是开发环境 */
  const $c64c8b68d983537dbd9feab4499457$var$isDev = false;
  var $c64c8b68d983537dbd9feab4499457$export$isDev = $c64c8b68d983537dbd9feab4499457$var$isDev;
  $c64c8b68d983537dbd9feab4499457$exports.isDev = $c64c8b68d983537dbd9feab4499457$export$isDev;
  const $c64c8b68d983537dbd9feab4499457$var$config = {
    state: 0,

    /** 是否开启编辑 */
    //是开发环境自动开启
    elementEdit: $c64c8b68d983537dbd9feab4499457$var$isDev,

    /** 服务器地址 */
    serverIp: 'https://shenzilong.cn/note/',
    // isDev ? 'https://127.0.0.1/note/' : 'https://shenzilong.cn/note/',

    /** 页面的url */
    locationUrl: decodeURIComponent(location.origin + location.pathname),

    /** 存储登录凭证的 */
    loginCredentials: 'loginCredentials'
  };
  /** 存储命令栈的地方 */

  const $c64c8b68d983537dbd9feab4499457$var$AllStoreName = '_storeName_llej_' + $c64c8b68d983537dbd9feab4499457$var$config.locationUrl;
  var $c64c8b68d983537dbd9feab4499457$export$AllStoreName = $c64c8b68d983537dbd9feab4499457$var$AllStoreName;
  $c64c8b68d983537dbd9feab4499457$exports.AllStoreName = $c64c8b68d983537dbd9feab4499457$export$AllStoreName;
  var $c64c8b68d983537dbd9feab4499457$var$_default = $c64c8b68d983537dbd9feab4499457$var$config;
  $c64c8b68d983537dbd9feab4499457$export$default = $c64c8b68d983537dbd9feab4499457$var$_default;
  $c64c8b68d983537dbd9feab4499457$exports.default = $c64c8b68d983537dbd9feab4499457$export$default;

  /** 用于复制文本的input   */
  const $ccf365ea3c49e3fe434086516e090c39$var$input_copy = document.createElement("textarea");
  $ccf365ea3c49e3fe434086516e090c39$var$input_copy.id = "__";
  $ccf365ea3c49e3fe434086516e090c39$var$input_copy.style.display = "none"; //不能设置为none因为会导致没有可访问性

  $ccf365ea3c49e3fe434086516e090c39$var$input_copy.setAttribute("style", `
        position: absolute;
        top: -9999px;
        left: -9999px;`);
  document.body.appendChild($ccf365ea3c49e3fe434086516e090c39$var$input_copy);
  /** 复制一个元素的titil 或者一段字符串到剪贴板 */

  function $ccf365ea3c49e3fe434086516e090c39$var$copyTitle(el) {
    let title;
    if (typeof el === "string") title = el;else title = el.getAttribute("title");
    $ccf365ea3c49e3fe434086516e090c39$var$input_copy.setAttribute("readonly", "readonly");
    $ccf365ea3c49e3fe434086516e090c39$var$input_copy.setAttribute("value", title);
    $ccf365ea3c49e3fe434086516e090c39$var$input_copy.value = title;
    $ccf365ea3c49e3fe434086516e090c39$var$input_copy.select();
    $ccf365ea3c49e3fe434086516e090c39$var$input_copy.setSelectionRange(0, 9999);
    document.execCommand("copy");
  }
  /** 工具类 */


  var $ccf365ea3c49e3fe434086516e090c39$var$_default = {
    copyTitle: $ccf365ea3c49e3fe434086516e090c39$var$copyTitle
  };
  /** 获取一个元素的选择器 */

  $ccf365ea3c49e3fe434086516e090c39$export$default = $ccf365ea3c49e3fe434086516e090c39$var$_default;
  $ccf365ea3c49e3fe434086516e090c39$exports.default = $ccf365ea3c49e3fe434086516e090c39$export$default;

  function $ccf365ea3c49e3fe434086516e090c39$var$getSelectors(el) {
    /** 通过path路径来确定元素 */
    let pathSelectors = $ccf365ea3c49e3fe434086516e090c39$var$nodePath(el).reverse().map(el => {
      return el.nodeName + `:nth-child(${$ccf365ea3c49e3fe434086516e090c39$var$getIndex(el)})`;
    }).join(">");
    /** 通过id以及class来确定元素 */

    let id_className = "";
    const id = el.id;
    if (id) id_className += `#${id}`;
    el.classList.forEach(className => {
      id_className += `.${className}`;
    });
    /** nth-child 选择 看它是第几个元素 */

    const index = $ccf365ea3c49e3fe434086516e090c39$var$getIndex(el);
    /** 最终构造出来的选择器 */

    return `${pathSelectors}${id_className}:nth-child(${index})`;
  }
  /** 获取元素它在第几位 */


  function $ccf365ea3c49e3fe434086516e090c39$var$getIndex(el) {
    if (el.nodeName === "HTML") return 1;
    return 1 + Array.from(el.parentElement.children).findIndex(child => child === el);
  }
  /** 获取一个元素的所有父节点到html为止  */


  function $ccf365ea3c49e3fe434086516e090c39$var$nodePath(...path) {
    while (path[path.length - 1].parentElement != null) {
      path.push(path[path.length - 1].parentElement);
    }
    /** 只需要是HTMLElement的 */


    const HTMLElementPath = path.filter(el => el instanceof HTMLElement);
    return HTMLElementPath;
  }

  async function $ccf365ea3c49e3fe434086516e090c39$var$getJSon(url, data) {
    const str = await $ccf365ea3c49e3fe434086516e090c39$var$ajax_get(url, data);
    const res = JSON.parse(str);
    console.log(url, data, res);
    return res;
  }
  /** 油猴的ajaxget */


  function $ccf365ea3c49e3fe434086516e090c39$var$ajax_get(url, data) {
    if (data) url += "?" + $ccf365ea3c49e3fe434086516e090c39$var$jsonToURLpar(data);
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


  function $ccf365ea3c49e3fe434086516e090c39$var$jsonToURLpar(json) {
    return Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }).join("&");
  }
  /** 开发时的调试log */


  function $ccf365ea3c49e3fe434086516e090c39$var$log(...arg) {
    if ($c64c8b68d983537dbd9feab4499457$exports.isDev) console.log(`[dev] `, ...arg);
  }

  var $b99d32be5a4ac592a0d02fb45ec4c$var$util = $dd031bb0320287bc488fdc11ce08efff$exports($ccf365ea3c49e3fe434086516e090c39$exports);
  // ASSET: /home/llej/code/userJS/api自动提取/parse/apiToTypeScriptCode.ts
  var $ff547f92e9bfa0a4dfc0073b70014433$exports = {};
  Object.defineProperty($ff547f92e9bfa0a4dfc0073b70014433$exports, "__esModule", {
    value: true
  });
  var $ff547f92e9bfa0a4dfc0073b70014433$export$apiToTypeScriptCode = $ff547f92e9bfa0a4dfc0073b70014433$var$apiToTypeScriptCode;
  $ff547f92e9bfa0a4dfc0073b70014433$exports.apiToTypeScriptCode = $ff547f92e9bfa0a4dfc0073b70014433$export$apiToTypeScriptCode;
  // ASSET: /home/llej/code/userJS/api自动提取/util.ts
  var $a318a9d1b74fc53d71d1d6e563791fac$exports = {};
  Object.defineProperty($a318a9d1b74fc53d71d1d6e563791fac$exports, "__esModule", {
    value: true
  });
  var $a318a9d1b74fc53d71d1d6e563791fac$export$urlToName = $a318a9d1b74fc53d71d1d6e563791fac$var$urlToName;
  $a318a9d1b74fc53d71d1d6e563791fac$exports.urlToName = $a318a9d1b74fc53d71d1d6e563791fac$export$urlToName;
  var $a318a9d1b74fc53d71d1d6e563791fac$export$qALL = $a318a9d1b74fc53d71d1d6e563791fac$var$qALL;
  $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL = $a318a9d1b74fc53d71d1d6e563791fac$export$qALL;
  var $a318a9d1b74fc53d71d1d6e563791fac$export$getTextConten = $a318a9d1b74fc53d71d1d6e563791fac$var$getTextConten;
  $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten = $a318a9d1b74fc53d71d1d6e563791fac$export$getTextConten;
  var $a318a9d1b74fc53d71d1d6e563791fac$export$getTable = $a318a9d1b74fc53d71d1d6e563791fac$var$getTable;
  $a318a9d1b74fc53d71d1d6e563791fac$exports.getTable = $a318a9d1b74fc53d71d1d6e563791fac$export$getTable;
  var $a318a9d1b74fc53d71d1d6e563791fac$export$getElText = $a318a9d1b74fc53d71d1d6e563791fac$var$getElText;
  $a318a9d1b74fc53d71d1d6e563791fac$exports.getElText = $a318a9d1b74fc53d71d1d6e563791fac$export$getElText;
  var $a318a9d1b74fc53d71d1d6e563791fac$export$copyStr = $a318a9d1b74fc53d71d1d6e563791fac$var$copyStr;
  $a318a9d1b74fc53d71d1d6e563791fac$exports.copyStr = $a318a9d1b74fc53d71d1d6e563791fac$export$copyStr;

  /** 将url转为友好的名字 */
  function $a318a9d1b74fc53d71d1d6e563791fac$var$urlToName(url) {
    // return url.match(/\d+\.\d+\.\d+\.\d+(.*)/)[1].split('/').map(str => str.replace(/\//g, '')).join('_')
    return url.split("/").map(str => str.replace(/[^a-zA-Z0-9]/g, "_")).join("_");
  }

  function $a318a9d1b74fc53d71d1d6e563791fac$var$qALL(selector, t) {
    const res = document.querySelectorAll(selector);

    res.includes = function (text) {
      return Array.from(res).filter(el => {
        return el.textContent.includes(text);
      });
    };

    return res;
  }

  function $a318a9d1b74fc53d71d1d6e563791fac$var$getTextConten(el) {
    if (el !== undefined && "textContent" in el) {
      return el.textContent;
    } else {
      console.warn("textContent 属性不存在", el);
      return "";
    }
  }
  /** 将table元素解析为字符串二维数组 */


  function $a318a9d1b74fc53d71d1d6e563791fac$var$getTable(el, tr_selector = "tr", td_selector = "td",
  /** 特定元素的识别器 */
  recognizer = {}) {
    const table = [];

    if (el === null) {
      return table;
    }

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


  function $a318a9d1b74fc53d71d1d6e563791fac$var$getElText(selector) {
    const el = document.querySelector(selector);

    if (el === null) {
      return "";
    }

    return el.textContent;
  }
  /** 复制某个字符串多少次 */


  function $a318a9d1b74fc53d71d1d6e563791fac$var$copyStr(el, length) {
    let str = "";

    for (let index = 0; index < length; index++) {
      str += el;
    }

    return str;
  }

  /** 将api转为ts的代码 */
  function $ff547f92e9bfa0a4dfc0073b70014433$var$apiToTypeScriptCode(api) {
    console.log(api);
    const name = (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.urlToName)(api.url);
    return `
        /** ${api.name} */
        static ${name}(params?:
            ${$ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_List(api.parList)}
        ):Promise< ${$ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_List(api.resList)} >{ return ${api.method.toLocaleLowerCase()}('${api.url}', params) }`;
  }
  /** 解析api的par为字符串 */


  function $ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_item(par, level = 0) {
    if (!par.children && !par.name) {
      return par.type;
    }

    if (par.type === "Array") {
      return `${$ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_List(par.children, level + 1)}${
      /** 处理数组类型 */
      par.type.includes("[]") || par.type === "Array" ? "[]" : ""}`;
    }

    return `${(0, $a318a9d1b74fc53d71d1d6e563791fac$exports.copyStr)("\t", level)}/** ${par.type} ${par.describe} */${par.name}${par.must ? "" : "?"}: ${(() => {
      if (par.children === undefined) {
        return par.type.replace("string(", "_string(")
        /** string 这种基本类型不能够使用引用的方式解决，所以加上一个_来区分 */
        .replace("number(", "_number(").replace("String", "string")
        /** 基元类型不要用 */
        .replace("Number", "number").replace("Boolean", "boolean").replace("(", "<").replace(")", ">").replace("-", "_");
      } else {
        return `${$ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_List(par.children, level + 1)}${
        /** 处理数组类型 */
        par.type.includes("[]") || par.type === "Array" ? "[]" : ""}`;
      }
    })()}`;
  }
  /** 解析api的par数组为字符串 */


  function $ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_List(par, level = 1) {
    if (par.find(el => el.name !== "") === undefined) {
      /** 属性全都是没有名字的，断定外层为数组 */
      return `(\r${par.map(el => $ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_item(el, level)).join(",\n")})`;
    } else {
      return `{\r${par.map(el => $ff547f92e9bfa0a4dfc0073b70014433$var$parse_par_item(el, level)).join(",\n")}}`;
    }
  }

  // ASSET: /home/llej/code/userJS/api自动提取/parse/rap2-taobo.ts
  var $cf67481fdd03d7716a846de1a5031d9$exports = {};
  Object.defineProperty($cf67481fdd03d7716a846de1a5031d9$exports, "__esModule", {
    value: true
  });
  var $cf67481fdd03d7716a846de1a5031d9$export$getRap2Api = $cf67481fdd03d7716a846de1a5031d9$var$getRap2Api;
  $cf67481fdd03d7716a846de1a5031d9$exports.getRap2Api = $cf67481fdd03d7716a846de1a5031d9$export$getRap2Api;
  var $cf67481fdd03d7716a846de1a5031d9$export$reduction_tree = $cf67481fdd03d7716a846de1a5031d9$var$reduction_tree;
  $cf67481fdd03d7716a846de1a5031d9$exports.reduction_tree = $cf67481fdd03d7716a846de1a5031d9$export$reduction_tree;

  /** 获取rap2平台的api */
  async function $cf67481fdd03d7716a846de1a5031d9$var$getRap2Api() {
    console.log("参数列表=========================");
    const par_el = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(2) > div.body > div > div.RSortableWrapper.depth-1");
    /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */

    const par_table = (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTable)(par_el, ".SortableTreeTableRow", ".td.payload", [undefined, el => {
      return el.querySelector("input").checked ? "true" : "false";
    }]);
    const res_el = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(3) > div.body > div > div.RSortableWrapper.depth-1");
    /** 参数名称 参数说明 类型 schema */

    const res_table = (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTable)(res_el, ".SortableTreeTableRow", ".td.payload", [undefined, el => {
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
      url: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getElText)(".summary li:nth-child(1) a"),
      name: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getElText)("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > div > span"),
      describe: "",
      method: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getElText)("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > ul > li:nth-child(2) > span > span:nth-child(2)"),
      parList: $cf67481fdd03d7716a846de1a5031d9$var$reduction_tree(par_el, par_table.map(str_list => {
        return {
          name: str_list[0].replace(/BODY$/, "").replace(/QUERY$/, ""),
          must: str_list[1] === "true",
          type: str_list[2],
          describe: str_list[5]
        };
      }), get_level_list),
      resList: $cf67481fdd03d7716a846de1a5031d9$var$reduction_tree(res_el, res_table.map(str_list => {
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
  }
  /** 根据table 获取到树的结构 */


  function $cf67481fdd03d7716a846de1a5031d9$var$reduction_tree(
  /** table 元素 */
  table,
  /** 参数列表 */
  parList,
  /** 提取等级的函数，用于生成等级数组 */
  get_level_list) {
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

  // ASSET: /home/llej/code/userJS/api自动提取/parse/showDocApi.ts
  var $a7fc94a11b0e7a21d754b086bc4e7259$exports = {};
  Object.defineProperty($a7fc94a11b0e7a21d754b086bc4e7259$exports, "__esModule", {
    value: true
  });
  var $a7fc94a11b0e7a21d754b086bc4e7259$export$getShowDocApi = $a7fc94a11b0e7a21d754b086bc4e7259$var$getShowDocApi;
  $a7fc94a11b0e7a21d754b086bc4e7259$exports.getShowDocApi = $a7fc94a11b0e7a21d754b086bc4e7259$export$getShowDocApi;

  /** 获取showDoc平台的api */
  async function $a7fc94a11b0e7a21d754b086bc4e7259$var$getShowDocApi() {
    const api = {
      url: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL)("main .main-editor li")[1]),
      name: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL)("main div")[0]),
      describe: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL)("main .main-editor li")[1]),
      method: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL)("main .main-editor li")[2]),
      parList: Array.from((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL)("table")[0].querySelectorAll("tr")).filter((el, i) => {
        return i !== 0;
      }).filter(el => {
        /** 他有时参数列表不全，通过这个去除空 */
        if ((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[0]) === "" && (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[2]) === "") return false;
        return true;
      }).map(el => {
        return {
          name: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[0]),

          /** 是否必需 */
          must: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[1]) === "是",
          type: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[2]),
          describe: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[3])
        };
      }),

      /** 返回结果的列表 */
      resList: Array.from((0, $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL)("table")[1].querySelectorAll("tr")).filter((el, i) => {
        return i !== 0;
      }).map(el => {
        return {
          name: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[0]),

          /** 是否必需 */
          must: true,
          type: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[1]),
          describe: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTextConten)(el.querySelectorAll("td")[2])
        };
      })
    };
    return api;
  }

  // ASSET: /home/llej/code/userJS/api自动提取/parse/swagger-bootstrap-ui.ts
  var $aef57d23ae0191400b46efdc87db50$exports = {};
  Object.defineProperty($aef57d23ae0191400b46efdc87db50$exports, "__esModule", {
    value: true
  });
  var $aef57d23ae0191400b46efdc87db50$export$swagger_bootstrap_ui = $aef57d23ae0191400b46efdc87db50$var$swagger_bootstrap_ui;
  $aef57d23ae0191400b46efdc87db50$exports.swagger_bootstrap_ui = $aef57d23ae0191400b46efdc87db50$export$swagger_bootstrap_ui;

  async function $aef57d23ae0191400b46efdc87db50$var$swagger_bootstrap_ui() {
    const this_tab = document.querySelector('.layui-tab-item.layui-show .swbu-main');
    const par_el = this_tab.querySelectorAll("table")[2];
    const res_el = this_tab.querySelectorAll("table")[6];
    /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */

    const par_table = (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTable)(par_el);
    /** 参数名称 参数说明 类型 schema */

    const res_table = (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTable)(res_el);
    console.log(par_table, res_table);
    const api = {
      url: this_tab.querySelector('div p:nth-child(1) code').textContent,
      name: (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getElText)('.layui-tab-item.layui-show .tab-pane div:nth-child(2) div'),
      describe: this_tab.querySelector('div p:nth-child(5) code').textContent,
      method: this_tab.querySelector('div p:nth-child(2) code').textContent,
      parList: $aef57d23ae0191400b46efdc87db50$var$reduction_tree(par_el, par_table.map(str_list => {
        return {
          name: str_list[0],
          must: str_list[3] === "true",
          type: str_list[4],
          describe: str_list[1]
        };
      })),
      resList: $aef57d23ae0191400b46efdc87db50$var$reduction_tree(res_el, res_table.map(str_list => {
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
  }
  /** 根据table 获取到树的结构 */


  function $aef57d23ae0191400b46efdc87db50$var$reduction_tree(table, parlist) {
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

  // ASSET: /home/llej/code/userJS/api自动提取/parse/yapi.ts
  var $a5d544e103f9f56313ece09a3f779d10$exports = {};
  Object.defineProperty($a5d544e103f9f56313ece09a3f779d10$exports, "__esModule", {
    value: true
  });
  var $a5d544e103f9f56313ece09a3f779d10$export$getYapiApi = $a5d544e103f9f56313ece09a3f779d10$var$getYapiApi;
  $a5d544e103f9f56313ece09a3f779d10$exports.getYapiApi = $a5d544e103f9f56313ece09a3f779d10$export$getYapiApi;
  var $a5d544e103f9f56313ece09a3f779d10$export$_ = $a5d544e103f9f56313ece09a3f779d10$var$_;
  $a5d544e103f9f56313ece09a3f779d10$exports.修改人列表_扩展 = $a5d544e103f9f56313ece09a3f779d10$export$_;
  $a5d544e103f9f56313ece09a3f779d10$export$_ = $a5d544e103f9f56313ece09a3f779d10$var$_;
  $a5d544e103f9f56313ece09a3f779d10$exports.参数全展开 = $a5d544e103f9f56313ece09a3f779d10$export$_;
  // ASSET: /home/llej/code/userJS/util/dom/elment.ts
  var $b3f4ac2695262ab6aee49e304425dd31$exports = {};
  Object.defineProperty($b3f4ac2695262ab6aee49e304425dd31$exports, "__esModule", {
    value: true
  });
  var $b3f4ac2695262ab6aee49e304425dd31$export$_ = $b3f4ac2695262ab6aee49e304425dd31$var$_;
  $b3f4ac2695262ab6aee49e304425dd31$exports.检测元素状态 = $b3f4ac2695262ab6aee49e304425dd31$export$_;
  Object.defineProperty($b3f4ac2695262ab6aee49e304425dd31$exports, "getSelectors", {
    enumerable: true,
    get: function () {
      return $ccf365ea3c49e3fe434086516e090c39$exports.getSelectors;
    }
  });

  function $b3f4ac2695262ab6aee49e304425dd31$var$_(selector, 出现, 变化, 消失) {
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

  const $a5d544e103f9f56313ece09a3f779d10$var$$$ = $a318a9d1b74fc53d71d1d6e563791fac$exports.qALL;
  /** 获取Yapi平台的api */

  async function $a5d544e103f9f56313ece09a3f779d10$var$getYapiApi() {
    await new Promise(s => {
      $a5d544e103f9f56313ece09a3f779d10$var$_(s);
    });
    const desNodeList = $a5d544e103f9f56313ece09a3f779d10$var$$$(".interface-title").includes("备注");
    const describe = desNodeList.length === 0 ? "" : desNodeList[0].nextElementSibling.textContent;
    const res_el = document.querySelector("div.ant-table-wrapper:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3)");
    /** 参数名称 类型 是否必须 默认值 备注 其他信息*/

    const res_table = (0, $a318a9d1b74fc53d71d1d6e563791fac$exports.getTable)(res_el, "tr", "td", [undefined, undefined, el => {
      return el.textContent !== "非必须" ? "true" : "false";
    }]);
    /** body 参数 */

    const par_table = Array.from($a5d544e103f9f56313ece09a3f779d10$var$$$(".col-title")).filter(el => el.textContent.startsWith("Body"))[0].parentElement.querySelector("table");
    const api = {
      url: $a5d544e103f9f56313ece09a3f779d10$var$$$(".tag-method + span")[0].textContent,
      name: $a5d544e103f9f56313ece09a3f779d10$var$$$(".interface-title + div div div:nth-child(2)")[0].textContent,
      describe,
      method: $a5d544e103f9f56313ece09a3f779d10$var$$$(".tag-method")[0].textContent,
      parList: (0, $cf67481fdd03d7716a846de1a5031d9$exports.reduction_tree)(par_table, Array.from(par_table.querySelectorAll("tr")).filter((el, i) => {
        // console.log("[        el]", el, el.querySelectorAll("td")[0].textContent);
        return (
          /** 第一行是标题 */
          i !== 0
        );
      }).map(el => {
        return {
          name: el.querySelectorAll("td")[0].textContent,

          /** 是否必需 */
          must: el.querySelectorAll("td")[2].textContent !== "非必须",
          type: $a5d544e103f9f56313ece09a3f779d10$var$yapTypePar(el),
          describe: el.querySelectorAll("td")[4].textContent
        };
      }), el => {
        const tr = el.querySelectorAll("tbody tr");
        const level = Array.from(tr).map(tr => {
          return Number(tr.className.replace(/.*(\d+)/, "$1"));
        });
        return level;
      }),
      resList: (0, $cf67481fdd03d7716a846de1a5031d9$exports.reduction_tree)(res_el, res_table.map((str_list, i) => {
        return {
          name: str_list[0],
          must: str_list[2] === "true",
          type: $a5d544e103f9f56313ece09a3f779d10$var$yapTypeRes(res_table, i),
          describe: `${str_list[4]} ${str_list[5]}`
        };
      }), el => {
        const tr = el.querySelectorAll("tr");
        const level = Array.from(tr).map(tr => {
          return Number(tr.className.replace(/.*(\d+)/, "$1"));
        });
        console.log(level, el, tr);
        return level;
      })
    };
    return api;
  }

  function $a5d544e103f9f56313ece09a3f779d10$var$_() {
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

    (0, $b3f4ac2695262ab6aee49e304425dd31$exports.检测元素状态)("div.ant-row:nth-child(1)", f, f, () => {});
  }

  function $a5d544e103f9f56313ece09a3f779d10$var$_(cb) {
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

  function $a5d544e103f9f56313ece09a3f779d10$var$yapTypePar(row) {
    const type_text = row.querySelectorAll("td")[1].textContent;

    if (type_text) {
      return type_text;
    } else {
      if (row.querySelectorAll("td")[5].textContent) {
        return "Array";
      } else {
        return row.previousElementSibling.querySelectorAll("td")[5].textContent.split(": ")[1];
      }
    }
  }

  function $a5d544e103f9f56313ece09a3f779d10$var$yapTypeRes(table, i) {
    const row = table[i];

    if (row[1]) {
      return row[1];
    } else {
      if (row[5]) {
        return "Array";
      } else {
        return table[i - 1][5].split(": ")[1];
      }
    }
  }

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
  (async function () {
    const uw = window.unsafeWindow ? window.unsafeWindow : window;

    async function getCode(fun) {
      return async () => {
        const api = (0, $ff547f92e9bfa0a4dfc0073b70014433$exports.apiToTypeScriptCode)(await fun());
        $b99d32be5a4ac592a0d02fb45ec4c$var$util.copyTitle(api);
        return api;
      };
    }

    const api = {
      getShowDocApiCode: await getCode($a7fc94a11b0e7a21d754b086bc4e7259$exports.getShowDocApi),
      getYapiApiCode: await getCode($a5d544e103f9f56313ece09a3f779d10$exports.getYapiApi),
      get_swagger_bootstrap_ui_code: await getCode($aef57d23ae0191400b46efdc87db50$exports.swagger_bootstrap_ui),
      get_rap2_taobao_code: await getCode($cf67481fdd03d7716a846de1a5031d9$exports.getRap2Api)
    };
    uw._api = api;
    let get_api = undefined;

    if (document.getElementById("yapi")) {
      (0, $a5d544e103f9f56313ece09a3f779d10$exports.修改人列表_扩展)();
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
      btn.addEventListener("click", async () => {
        $b99d32be5a4ac592a0d02fb45ec4c$var$util.copyTitle(await get_api());
        alert("复制成功");
      });
      document.body.appendChild(btn);
    } // 拖拽多选();
    // setTimeout(() => {
    //   const code = uw._api.getYapiApiCode();
    //   console.log(code);
    //   util.copyTitle(code);
    // }, 3000);

  })();
})();
//# sourceMappingURL=api自动提取.user.js.map
