import { async } from "q";
import { isDev } from "./config";

/** 用于复制文本的input */
const input_copy = document.createElement("textarea");
input_copy.id = "__";
input_copy.style.display = "none"; //不能设置为none因为会导致没有可访问性
input_copy.setAttribute(
  "style",
  `
        position: absolute;
        top: -9999px;
        left: -9999px;`,
);
document.body.appendChild(input_copy);
/** 复制一个元素的titil 或者一段字符串到剪贴板 */
export function copyTitle(el: HTMLElement | string) {
  let title;
  if (typeof el === "string") title = el;
  else title = el.getAttribute("title");

  input_copy.setAttribute("readonly", "readonly");
  input_copy.setAttribute("value", title);
  input_copy.value = title;
  input_copy.select();
  input_copy.setSelectionRange(0, 9999);
  document.execCommand("copy");
}
/** 工具类 */
export default {
  copyTitle,
};

/** 获取一个元素的选择器 */
export function getSelectors(el: Element) {
  /** 通过path路径来确定元素 */
  let pathSelectors = nodePath(el)
    .reverse()
    .map((el) => {
      return el.nodeName + `:nth-child(${getIndex(el)})`;
    })
    .join(">");

  /** 通过id以及class来确定元素 */
  let id_className = "";
  const id = el.id;
  if (id) id_className += `#${id}`;

  el.classList.forEach((className) => {
    id_className += `.${className}`;
  });

  /** nth-child 选择 看它是第几个元素 */
  const index = getIndex(el);

  /** 最终构造出来的选择器 */
  return `${pathSelectors}${id_className}:nth-child(${index})`;
}

/** 获取元素它在第几位 */
export function getIndex(el: Element) {
  if (el.nodeName === "HTML") return 1;
  return 1 + Array.from(el.parentElement.children).findIndex((child) => child === el);
}

/** 获取一个元素的所有父节点到html为止  */
export function nodePath(...path: Element[]): HTMLElement[] {
  while (path[path.length - 1].parentElement != null) {
    path.push(path[path.length - 1].parentElement);
  }
  /** 只需要是HTMLElement的 */
  const HTMLElementPath = <HTMLElement[]>path.filter((el) => el instanceof HTMLElement);
  return HTMLElementPath;
}

export async function getJSon(url: string, data?: any) {
  const str = await ajax_get(url, data);
  const res = JSON.parse(str);
  console.log(url, data, res);
  return res;
}

/** 油猴的ajaxget */
export function ajax_get(url: string, data?: any): Promise<string> {
  if (data) url += "?" + jsonToURLpar(data);
  if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM"))
    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        method: "GET",
        url,
        onload: function (response: any) {
          resolve(response.responseText);
        },
        onerror: reject,
      });
    });
  else
    return new Promise((resolve, reject) => {
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
function jsonToURLpar(json: any) {
  return Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}

/** 开发时的调试log */
export function log(...arg: any[]) {
  if (isDev) console.log(`[dev] `, ...arg);
}
