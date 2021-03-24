import { proxy } from "ajax-hook";
export namespace AjaxHook {
  let Xhr = window.XMLHttpRequest;
  // 有一些网页的实现难以从 dom 上判断信息是否需要屏蔽，这里从请求下手
  //@ts-ignore
  typeof unsafeWindow === "undefined"
    ? //@ts-ignore
      (window.unsafeWindow = window)
    : //@ts-ignore
      (window = unsafeWindow);
  export type reqConfig = Parameters<typeof fetch> | XhrRequestConfig;
  export let ResHandler = (config: reqConfig, response: any) => {
    console.log("[ajax]", config, response);
  };
  proxy({
    //请求发起前进入
    onRequest: (config: any, handler: any) => {
      //   console.log("[💚开始请求]", config.url, urlHandler(config.url));
      //   config.url = urlHandler(config.url);
      /** 关闭 withCredentials 避免触发跨域 */
      config.withCredentials = false;
      handler.next(config);
    },
    //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
    onError: (err: any, handler: any) => {
      handler.next(err);
    },
    //请求成功后进入
    onResponse: (response: any, handler: any) => {
      ResHandler(response.config, response.response);
      handler.next(response);
    },
  });
  /** 替换 XMLHttpRequest */
  window.XMLHttpRequest = XMLHttpRequest;
  let rawFetch = window.fetch;
  window.fetch = async (...arg) => {
    const res = await rawFetch(...arg);
    let rawJson = res.json;
    res.json = async () => {
      const response = await rawJson.apply(res);
      ResHandler(arg, response);
      return response;
    };
    return res;
  };
}

// 来自于 ajax-hook 包的定义 https://github.com/wendux/Ajax-hook/blob/master/index.d.ts
interface XMLHttpRequestProxy extends XMLHttpRequest {
  responseText: string;
  readyState: number;
  response: any;
  responseURL: string;
  responseXML: Document | null;
  status: number;
  statusText: string;
  xhr: OriginXMLHttpRequest;
}

interface OriginXMLHttpRequest extends XMLHttpRequest {
  getProxy(): XMLHttpRequestProxy;
}
interface XhrRequestConfig {
  method: string;
  url: string;
  headers: any;
  body: any;
  async: boolean;
  user: string;
  password: string;
  withCredentials: boolean;
  xhr: OriginXMLHttpRequest;
}
