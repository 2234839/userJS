import util from "../网页笔记/util";
import { apiToTypeScriptCode } from "./parse/apiToTypeScriptCode";
import { getShowDocApi } from "./parse/showDocApi";
import { swagger_bootstrap_ui } from "./parse/swagger-bootstrap-ui";
import { getYapiApi } from "./parse/yapi";
import { api } from "./i_api";
import { getRap2Api } from "./parse/rap2-taobo";

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.1.0
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

  function getCode(fun: () => api) {
    return () => {
      const api = apiToTypeScriptCode(fun());
      util.copyTitle(api);
      return api;
    };
  }
  uw._api = {
    getShowDocApiCode: getCode(getShowDocApi),
    getYapiApiCode: getCode(getYapiApi),
    get_swagger_bootstrap_ui_code: getCode(swagger_bootstrap_ui),
    get_rap2_taobao_code: getCode(getRap2Api),
  };

  // setTimeout(() => {
  //   const code = uw._api.getYapiApiCode();
  //   console.log(code);

  //   util.copyTitle(code);
  // }, 3000);
})();
