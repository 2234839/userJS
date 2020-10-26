// ==UserScript==
// @name         更好的我来导出
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  更好的我来导出
// @author       崮生 2234839456@qq.com
// @include      www.wolai.com/*
// @grant        unsafeWindow
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// @connect      shenzilong.cn
// ==/UserScript==
import { proxy } from "ajax-hook";
import { 检测元素状态 } from "../util/dom/elment";
import { copy } from "../util/dom/剪贴板";
import type {
  codeNode,
  columnNode,
  imageNode,
  midHeaderNode,
  Node,
  NodeTitle,
  pageChunkRes,
  pageNode,
  quoteNode,
  rowNode,
  textNode,
  todoListNode,
} from "./wolai.interface";

const _n = "\n\n";
// const _n = "\n";

export namespace 我来md导出 {
  export async function toMarkdown(p: pageChunkRes) {
    let mdText = "";
    const blocks = Object.keys(p.data.block)
      .map((k) => p.data.block[k])
      .map((el) => el.value);
    console.log("[blocks]", blocks);
    const page = findPage(blocks);
    if (!page) {
      throw "没有寻找到page块";
    }

    mdText += `# ${NodeTitleToMarkdown(page.attributes.title)}${_n}`;

    for (const sub_node of page.sub_nodes.map((id) => p.data.block[id])) {
      mdText += (await nodeToMarkdown(sub_node.value, p)) + _n;
    }
    return mdText;
  }

  function findPage(p: Node[]): pageNode | undefined {
    return p.find((el) => el.type === "page") as pageNode;
  }
  interface parer {
    parer: (Node: any, pageChunkRes: pageChunkRes) => Promise<string>;
    check: (Node: Node, pageChunkRes: pageChunkRes) => boolean;
  }
  /** 存储所有节点解析器 */
  const nodeParers = [] as parer[];
  export function registerNodeParer(...parers: parer[]) {
    nodeParers.push(...parers);
  }
  export async function nodeToMarkdown(p: Node, pageChunkRes: pageChunkRes): Promise<string> {
    const parer = nodeParers.find((el) => el.check(p, pageChunkRes));
    if (parer) {
      return await parer.parer(p, pageChunkRes);
    } else {
      console.log("[没有对应的解析器]", p);
      return `--- 没有对应的解析器 -> ${p.type} ---`;
    }
  }

  /** 对块的title属性进行解析 */
  export function NodeTitleToMarkdown(p: NodeTitle) {
    if (!p) {
      return "";
    }
    return p
      .map((el) => {
        const text = el[0];
        if (el.length === 1) {
          return text;
        } else {
          const 修饰 = el[1];

          if (修饰.length === 0) {
            /** 无修饰啥也不做 */
          }

          let _text = text;
          for (const mode of 修饰) {
            if (mode[0] === "Link") {
              _text = `[${_text}](${mode[1]})`;
            } else if (mode[0] === "BiLink") {
              _text = `[${_text}](BiLink:${mode[1]}_${mode[2]})`;
            } else if (mode[0] === "<>") {
              _text = `\`${_text}\``;
            } else if (mode[0] === "B") {
              _text = `**${_text}**`;
            } else {
              /** 这里mode的类型应当始终为 never */
              mode;
              _text = "<未知类型>";
            }
          }
          return _text;
        }
      })
      .join("");
  }
}
const NodeTitleToMarkdown = 我来md导出.NodeTitleToMarkdown;
我来md导出.registerNodeParer(
  {
    check: (p) => p.type === "quote",
    async parer(p: quoteNode) {
      return `> ${NodeTitleToMarkdown(p.attributes.title)}`;
    },
  },
  {
    check: (p) => p.type === "midHeader" || p.type === "subHeader",
    async parer(p: midHeaderNode) {
      const t = { midHeader: "##", subHeader: "###" }[p.type];
      return `${t} ${NodeTitleToMarkdown(p.attributes.title)}`;
    },
  },
  {
    check: (p) => p.type === "text",
    async parer(p: textNode) {
      return `${NodeTitleToMarkdown(p.attributes.title)}`;
    },
  },
  {
    check: (p) => p.type === "row" || p.type === "column",
    async parer(p: rowNode, pageChunkRes: pageChunkRes) {
      const sub_nodes = p.sub_nodes.map((id) => pageChunkRes.data.block[id]);
      let mdText = ``;
      for (const el of sub_nodes) {
        mdText += (await 我来md导出.nodeToMarkdown(el.value, pageChunkRes)) + _n;
      }
      return mdText;
    },
  },
  {
    check: (p) => p.type === "code",
    async parer(p: codeNode, pageChunkRes: pageChunkRes) {
      return `\`\`\`${p.attributes.language}\n${NodeTitleToMarkdown(p.attributes.title)}\n\`\`\``;
    },
  },
  {
    check: (p) => p.type === "image",
    async parer(p: imageNode, pageChunkRes: pageChunkRes) {
      /** 此处需要在浏览器内才能正常运行 */
      const src = (document.querySelector(`#id-${p.id} img`) as HTMLImageElement).getAttribute("src");
      return `![${NodeTitleToMarkdown(p.attributes.title)}](${src})`; // TODO 描述应该要去获取到
    },
  },
  {
    check: (p) => p.type === "page",
    async parer(p: pageNode, pageChunkRes: pageChunkRes) {
      return `[${NodeTitleToMarkdown(p.attributes.title)}](page:${p.id})`;
    },
  },
  {
    check: (p) => p.type === "todoList",
    async parer(p: todoListNode, pageChunkRes: pageChunkRes) {
      return `[${p.attributes.checked === "no" ? " " : "x"}] ${NodeTitleToMarkdown(p.attributes.title)}`;
    },
  },
);

let curData = null as null | string;
proxy({
  //请求发起前进入
  onRequest: (config, handler) => {
    // console.log("[💚开始请求]", config.url);
    // config.url = urlHandler(config.url);
    /** 关闭 withCredentials 避免触发跨域 */
    // config.withCredentials = false;
    handler.next(config);
  },
  //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
  onError: (err, handler) => {
    handler.next(err);
  },
  //请求成功后进入
  onResponse: (response, handler) => {
    handler.next(response);
    if (response.config.url.endsWith("transaction/getPageChunks")) {
      curData = response.response;
    }
  },
});

检测元素状态('[data-growing-title="复制页面引用链接-头部栏"]', (el) => {
  console.log("[  el]", el);
  const btn = el.nextElementSibling;
  const newBtn = btn.cloneNode(true) as HTMLElement;
  btn.parentElement.appendChild(newBtn);

  newBtn.querySelectorAll("span")[1].textContent = `[✨] 导出页面`;
  newBtn.addEventListener("click", async () => {
    if (curData === null) {
      return alert("没有获取到当前页面数据，您可以尝试刷新重试。");
    }
    const res = JSON.parse(curData);
    const md = await 我来md导出.toMarkdown(res);
    const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    console.log(`[markdown:${downloadUrl}]\n----\n`, md);
    console.log('[copy(md)]',copy(md));
    alert("复制成功")
  });
});

namespace 附加按钮 {
  export let 已附加 = false;
}
/** 替换 windows 上的 xml 对象 */
//@ts-ignore
unsafeWindow.XMLHttpRequest = XMLHttpRequest;
