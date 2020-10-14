import { proxy } from "ajax-hook";
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
export namespace 我来md导出 {
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? Mutable<U>[] : Mutable<T[P]>;
  };
  // type T = Mutable<typeof pageChunkRes>;
  interface Block {
    role: string;
    value: midHeaderNode | pageNode | quoteNode | textNode | rowNode | columnNode | imageNode | codeNode;
  }
  type NodeTitle = (
    | [string]
    | [
        string,
        (
          | (
              | [/** 我来内部链接 */ "BiLink", string, string]
              | [/** 一般超链接 */ "Link", string]
              | [/** 行内代码 */ "<>"]
              | [/** 加粗 */ "B"]
            )[]
          | [/** 啥也不做 */]
        ),
      ]
  )[];
  interface Node {
    id: string;
    active: boolean;
    attributes:
      | {
          title?: NodeTitle;
        }
      | unknown;
    created_by: string;
    created_time: number;
    edited_by: string;
    edited_time: number;
    page_id: string;
    parent_id: string;
    parent_type: string;
    permissions: any[];
    setting: {};
    sub_nodes: string[];
    text_content: string;
    type: string;
    ver: number;
    workspace_id: string;
  }
  interface midHeaderNode extends Node {
    type: "midHeader";
    attributes: { title: NodeTitle };
  }
  interface pageNode extends Node {
    type: "page";
    attributes: { title: NodeTitle };
  }
  interface quoteNode extends Node {
    type: "quote";
    attributes: { title: NodeTitle };
  }

  interface textNode extends Node {
    type: "text";
    attributes: { title: NodeTitle };
  }
  interface rowNode extends Node {
    type: "row";
    attributes: {};
  }
  interface columnNode extends Node {
    type: "column";
  }

  interface imageNode extends Node {
    type: "image";
    attributes: {
      dimensions: {
        width: number;
        height: number;
      }[];
      original: {
        width: number;
        height: number;
      }[][];
      img: string[][];
      source: string;
      bucket: string[][];
    };
  }
  interface codeNode extends Node {
    type: "code";
    attributes: { title: NodeTitle; lineBreak: false; ligatures: false; language: "HTML"; line_number: false };
  }

  interface pageChunkRes {
    code: number;
    data: {
      block: {
        [id: string]: Block;
      };
      position: unknown;
    };
    message: string;
  }
  const _n = "\n\n";
  // const _n = "\n";

  export function toMarkdown(p: pageChunkRes) {
    let mdText = "";
    const blocks = Object.keys(p.data.block)
      .map((k) => p.data.block[k])
      .map((el) => el.value);

    const page = findPage(blocks);
    if (!page) {
      throw "没有寻找到page块";
    }

    mdText += `# ${page.text_content}${_n}`;

    for (const sub_node of page.sub_nodes.map((id) => p.data.block[id])) {
      mdText += nodeToMarkdown(sub_node.value, p) + _n;
    }
    return mdText;
  }

  function findPage(p: Node[]): pageNode | undefined {
    return p.find((el) => el.type === "page") as pageNode;
  }
  function nodeToMarkdown(p: Node, pageChunkRes: pageChunkRes): string {
    if (isQuoted(p)) {
      return `> ${NodeTitleToMarkdown(p.attributes.title)}`;
    } else if (isMidHeaderNode(p)) {
      /** 中标题 */
      return `## ${NodeTitleToMarkdown(p.attributes.title)}`;
    } else if (isTextNode(p)) {
      return `${NodeTitleToMarkdown(p.attributes.title)}`;
    } else if (isRowNode(p) || isColumnNode(p)) {
      const sub_nodes = p.sub_nodes.map((id) => pageChunkRes.data.block[id]);
      let mdText = ``;
      for (const el of sub_nodes) {
        mdText += nodeToMarkdown(el.value, pageChunkRes) + _n;
      }
      return mdText;
    } else if (isCodeNode(p)) {
      return `\`\`\`${p.attributes.language}\n${NodeTitleToMarkdown(p.attributes.title)}\n\`\`\``;
    } else if (isImgNode(p)) {
      /** 此处需要在浏览器内才能正常运行 */
      const src = (document.querySelector(`#id-${p.id} img`) as HTMLImageElement).getAttribute("src");
      return `![](${src})`;
      // return `![](${p.attributes.img[0][0]})`;
    } else if (isPageNode(p)) {
      /** 此处需要在浏览器内才能正常运行 */
      return `[${NodeTitleToMarkdown(p.attributes.title)}](page:${p.id})`;
      // return `![](${p.attributes.img[0][0]})`;
    }
    return `--- ${p.type} ---`;
  }

  /** 对块的title属性进行解析 */
  function NodeTitleToMarkdown(p: NodeTitle) {
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
  /** ═════════🏳‍🌈 节点类型判断 🏳‍🌈═════════  */
  function isQuoted(p: Node): p is quoteNode {
    return p.type === "quote";
  }
  function isMidHeaderNode(p: Node): p is midHeaderNode {
    return p.type === "midHeader";
  }
  function isTextNode(p: Node): p is textNode {
    return p.type === "text";
  }
  function isRowNode(p: Node): p is rowNode {
    return p.type === "row";
  }
  function isColumnNode(p: Node): p is columnNode {
    return p.type === "column";
  }
  function isCodeNode(p: Node): p is codeNode {
    return p.type === "code";
  }
  function isImgNode(p: Node): p is imageNode {
    return p.type === "image";
  }
  function isPageNode(p: Node): p is pageNode {
    return p.type === "page";
  }
}

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
      setTimeout(() => {
        console.log("[response]", response.config.url);
        const res = JSON.parse(response.response);
        const md = 我来md导出.toMarkdown(res);
        const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
        const downloadUrl = URL.createObjectURL(blob);
        console.log(`[markdown:${downloadUrl}]`, md);
      }, 5 * 1000);
    }
  },
});
/** 替换 windows 上的 xml 对象 */
//@ts-ignore
unsafeWindow.XMLHttpRequest = XMLHttpRequest;
console.log(222);
