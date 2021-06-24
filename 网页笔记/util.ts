import { derived, get, writable } from "svelte/store";
import { isDev } from "./config";
import { CommandControl, Highlighted } from "./fun/command";
import { editElement } from "./state";
import { cssPath } from "./dom_path";
/** 用于复制文本的input   */
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
  return cssPath(el,true)
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

  Array.from(el.classList)
    /** 排除自定义类名 */
    .filter((el) => el.includes("_llej_"))
    .forEach((className) => {
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
  if (el.parentElement === null) {
    return 1;
  }
  return 1 + Array.from(el.parentElement.children).findIndex((child) => child === el);
}

/** 获取一个元素的所有父节点到html为止  */
export function nodePath(...path: Element[]): HTMLElement[] {
  while (path[path.length - 1].parentElement != null || path[path.length - 1].tagName!=="HTML") {
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

/** 用户选中事件 */
export namespace SelectionEvent {
  /** 表示用户选中的对象，唯一的。不用每次去获取 */
  const s = window.getSelection();
  /** 是否处于 range 的选中状态 */
  export const isRange = writable(false);
  /** 选区开始位置的元素的 rect */
  export const anchorRect = derived(isRange, ($isRange) => {
    if (!$isRange) return;
    const node = s.anchorNode;
    const el = node instanceof Element ? node : node.parentElement;
    const rect = el.getBoundingClientRect();
    return rect;
  });

  export function 高亮(options: { textDecoration?: string; style?: string } = {}) {
    const h = new Highlighted(options.style);
    CommandControl.run(h);
    const className = h.className;
    const tagName = "span";
    let 选中的所有节点 = [] as Node[];
    if (/** 跨元素了 */ s.anchorNode !== s.focusNode) {
      const startRange = s.getRangeAt(0);
      const endRange = s.getRangeAt(s.rangeCount - 1);
      let startNode = startRange.startContainer;
      let endNode = endRange.endContainer;

      let cur = startNode;
      if (cur instanceof Text) {
        const s = startRange;
        const t2 = cur.splitText(s.startOffset);
        const t3 = t2.nextSibling;
        const wrap = document.createElement(tagName);
        wrap.appendChild(t2);
        cur.parentNode.insertBefore(wrap, t3);
      }
      cur = endNode;
      if (cur instanceof Text) {
        const s = endRange;
        const t2 = cur.splitText(s.endOffset);
        const wrap = document.createElement(tagName);
        wrap.appendChild(cur);
        t2.parentNode.insertBefore(wrap, t2);

        endNode = t2;
      }
      选中的所有节点 = getIntermediateNodes(startNode, endNode);
    } else {
      /** 单元素类 */
      const cur = s.anchorNode;
      if (cur instanceof Text) {
        const t2 = cur.splitText(s.anchorOffset);
        const t3 = t2.splitText(s.focusOffset);
        选中的所有节点.push(t2);
      } else {
        选中的所有节点.push(cur);
      }
    }
    console.log("选中的所有节点", 选中的所有节点);
    选中的所有节点.forEach((node) => {
      let el;
      if (node instanceof Element) {
        el = node;
      } else {
        /** 对纯文本节点进行包装，因为纯文本节点无法附加样式等属性 */
        const wrap = document.createElement(tagName);
        const t2 = node.nextSibling;
        const parent = node.parentNode;
        wrap.appendChild(node);
        parent.insertBefore(wrap, t2);
        el = wrap;
      }
      el.classList.add(className);
    });
    /** 这些元素被添加了类名，甚至被包裹了一层。属于被污染的元素,直接标记他们的父亲 */
    const 共存层 = getIntermediateNodes.寻找共存层(...选中的所有节点);
    // console.log("[共存层]", 共存层);
    let parent = 共存层[0].parentElement;
    /** 避免标记的是不够大的元素，实际上也是因为寻找元素的方法不够好否则也用不着这个 */
    while (parent.className.includes("llej-page_notes-style")) {
      parent = parent.parentElement;
    }
    editElement.add(parent);
  }
  document.addEventListener("selectionchange", () => {
    isRange.set(s.type === "Range");
  });
}

function getIntermediateNodes(a: Node, b: Node): Node[] {
  return getIntermediateNodes.获取两元素之间的元素(a, b);
}
namespace getIntermediateNodes {
  export function 寻找共存层(...args: Node[]): Node[] {
    if (args.length === 1) {
      return args;
    }
    const parentList = args
      .map((el) => 获取父链路(el).reverse())
      .sort((a, b) => {
        return a.length - b.length;
      });
    const 最短链路 = parentList[0];
    for (let i = 0; i < 最短链路.length; i++) {
      const element = 最短链路[i];
      const 此层是否全相似 = parentList.map((el) => el[i]).every((el) => el === element);
      if (此层是否全相似 === false) {
        return Array.from(最短链路[i - 1].childNodes);
      }
    }
  }
  /** 越接近node的元素越在前面 */
  export function 获取父链路(node: Node) {
    const list = [] as Node[];
    list.push(node);
    let cur = node;
    while (cur.parentNode) {
      list.push(cur.parentNode);
      cur = cur.parentNode;
    }
    return list;
  }
  export function 后面的兄弟元素(node: Node) {
    const list = [] as Node[];
    let cur = node;
    while (cur.nextSibling) {
      list.push(cur.nextSibling);
      cur = cur.nextSibling;
    }
    return list;
  }
  export function 前面的兄弟元素(node: Node) {
    const list = [] as Node[];
    let cur = node;
    while (cur.previousSibling) {
      list.push(cur.previousSibling);
      cur = cur.previousSibling;
    }
    return list;
  }
  export function 获取两元素之间的元素(a: Node, b: Node) {
    const list = [] as Node[];
    const aParentList = 获取父链路(a).reverse();
    const bParentList = 获取父链路(b).reverse();
    /** 找出 a 与 b 在共存层的父元素 */
    const 短链路 = aParentList.length > bParentList.length ? bParentList : aParentList;
    let n1 = 短链路[0];
    let n2 = 短链路[0];
    for (let i = 0; i < 短链路.length; i++) {
      n1 = aParentList[i];
      n2 = bParentList[i];
      if (n1 !== n2) {
        break;
      }
    }
    /** 获取共存层中间的元素 */
    let cur = n1.nextSibling as Node;
    while (cur !== n2 && cur.nextSibling !== null) {
      list.push(cur);
      cur = cur.nextSibling;
    }

    /** 判断 a 是否在 b前面 */
    cur = n1;
    let n1在前 = false;
    while (cur.nextSibling) {
      if (n2 === cur) {
        n1在前 = true;
        break;
      }
      cur = cur.nextSibling;
    }
    const [pre, next] = n1在前 ? [a, b] : [b, a];
    const 共存层 = 寻找共存层(a, b);
    cur = pre;
    while (!共存层.includes(cur)) {
      list.push(...后面的兄弟元素(cur));
      cur = cur.parentNode;
    }
    cur = next;
    while (!共存层.includes(cur)) {
      list.push(...前面的兄弟元素(cur));
      cur = cur.parentNode;
    }

    return list;
  }
}

export function getWindow() {
  return typeof unsafeWindow === "undefined" ? window : unsafeWindow;
}
function getPath(element:Element)
{
  const path = []
  while(element !== null && element.nodeType === Node.ELEMENT_NODE) // If element is null it's the end of partial. It's a loose element which has, sofar, not been attached to a parent in the node tree.
  {
    let selector = element.nodeName

    if(element.id)
    {
      selector += `#${element.id}`
    }
    else
    {
      let
      sibling           = element, // Walk backwards until there is no previous sibling
      siblingSelectors  = [] // Will hold nodeName to join for adjacent selection

      while(sibling !== null && sibling.nodeType === Node.ELEMENT_NODE)
      {
        siblingSelectors.unshift(sibling.nodeName)
        sibling = sibling.previousElementSibling
      }

      // :first-child does not apply to HTML
      if(siblingSelectors[0] !== 'HTML')
        siblingSelectors[0] = siblingSelectors[0] + ':first-child'

      selector = siblingSelectors.join(' + ')
    }
    path.unshift(selector)
    element = element.parentElement
  }

  return path.join(' > ')
}

