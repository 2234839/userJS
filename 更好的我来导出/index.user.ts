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
  blockEquationNode,
  bookmarkNode,
  bullListNode,
  calloutNode,
  codeNode,
  columnNode,
  embedNode,
  enumListNode,
  fileNode,
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

    mdText += await nodeToMarkdown(page, p);
    return mdText;
  }

  function findPage(p: Node[]): pageNode | undefined {
    return p.find((el) => el.type === "page") as pageNode;
  }
  interface parer {
    parer: (Node: any, pageChunkRes: pageChunkRes) => Promise<string>;
    check: (Node: Node, pageChunkRes: pageChunkRes) => boolean;
    /** 其他自定义扩展项 */
    [k: string]: any;
  }
  interface sub_node_parer {
    parer: (
      /** 父节点自身可能解析出来的代码 */ md_str: string,
      Node: any,
      pageChunkRes: pageChunkRes,
    ) => Promise<string>;
    check: (parent: Node, pageChunkRes: pageChunkRes) => boolean;
    /** 其他自定义扩展项 */
    [k: string]: any;
  }
  /** 存储所有节点解析器 */
  const nodeParers = [] as parer[];
  /** 对 子节点和父节点的关系 进行处理，因为不同父子节点的组织方式可能不一样 */
  const sub_nodeParers = [] as sub_node_parer[];
  export function registerNodeParer(...parers: parer[]) {
    nodeParers.push(...parers);
  }
  export function registerSubNodeParer(...parers: sub_node_parer[]) {
    sub_nodeParers.push(...parers);
  }
  export async function nodeToMarkdown(p: Node, pageChunkRes: pageChunkRes): Promise<string> {
    const parer = nodeParers.find((el) => el.check(p, pageChunkRes));
    if (parer) {
      const md_str = await parer.parer(p, pageChunkRes);
      if (p.sub_nodes.length) {
        const sub_node_parer = sub_nodeParers.find((el) => el.check(p, pageChunkRes));
        if (sub_node_parer) {
          return await sub_node_parer.parer(md_str, p, pageChunkRes);
        } else {
          console.log(`[没有对应的结构解析器 ${p.type}]`, p);
        }
      }
      return md_str;
    } else {
      console.log(`[没有对应的解析器 ${p.type}]`, p);
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
            } else if (mode[0] === "<>" /** 行内代码块 */) {
              _text = `\`${_text}\``;
            } else if (mode[0] === "B" /** 粗体 */) {
              _text = `**${_text}**`;
            } else if (mode[0] === "h" /** 字体以及背景颜色 */) {
              /** 这里在某些选项下可以选择开启转换 */
              _text = _text;
            } else if (mode[0] === "i" /** 斜体 */) {
              _text = `*${_text}*`;
            } else if (mode[0] === "U" /** 下划线 */) {
              /** 这里在某些选项下可以选择开启转换 */
              _text = `${_text}`;
            } else if (mode[0] === "S" /** 删除线 */) {
              _text = `~~${_text}~~`;
            } else if (mode[0] === "Equation" /** 公式 */) {
              _text = `$${_text}$`;
            } else {
              /** 这里mode的类型应当始终为 never */
              mode;
              _text = `<未知类型 ${mode[0]}>`;
              console.log(`<未知类型 ${mode[0]}>`, mode, 修饰, el);
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
  /** 对各级标题进行处理
   *  对bullList节点进行处理 */
  (() => {
    const header = { bullList: "-", header: "#", midHeader: "##", subHeader: "###", tinyHeader: "####" };

    return {
      check: (p: any) => header.hasOwnProperty(p.type),
      async parer(p: midHeaderNode) {
        const t = header[p.type];
        return `${t} ${NodeTitleToMarkdown(p.attributes.title)}`;
      },
    };
  })(),
  /** 数字列表的解析 */
  {
    check: (p) => p.type === "enumList",
    async parer(p: enumListNode, pageChunkRes) {
      let l = 0;
      const brothers = sub_nodeToNode(pageChunkRes.data.block[p.parent_id].value, pageChunkRes);
      let i = brothers.findIndex((el) => el.id === p.id);
      while (i >= 0 && brothers[i].type === "enumList") {
        i -= 1;
        l += 1;
      }
      // const l = pageChunkRes.data.block[p.parent_id].value.sub_nodes.findIndex((id) => id === p.id) + 1;
      return `${l}. ${NodeTitleToMarkdown(p.attributes.title)}`;
    },
  },
  /** 折叠列表的解析 */
  {
    check: (p) => p.type === "toggleList",
    async parer(p: enumListNode, pageChunkRes) {
      return NodeTitleToMarkdown(p.attributes.title);
    },
  },
  /** 对书签的解析， **这里到时候应该要调成可控的** */
  {
    check: (p) => p.type === "bookmark",
    async parer(p: bookmarkNode) {
      const rich = p.attributes.rich_media[0];
      const description = rich.description || "";
      const thumbnail =
        /** 和我来一样有描述信息才显示缩略图 */ description && rich?.thumbnail?.length
          ? `![](${rich.thumbnail[0].href}){:height="60px" width="60px"}`
          : "";
      return `> [![](${rich.icons[0].href}){:height="30px" width="30px"} 崮生 一些随笔](${p.attributes.source} "${description}") ${description} ${thumbnail}`;
    },
  },
  /** 对嵌入内容的解析， **这里到时候应该要调成可控的** */
  {
    check: (p) => ["embed", "bilibiliVideo", "tencentVideo", "youkuVideo", "youtubeVideo"].includes(p.type),
    async parer(p: embedNode) {
      return `<iframe src="${p.attributes.embedLink}"></iframe>`;
    },
  },
  /** 对着重文字的解析 */
  {
    check: (p) => ["callout"].includes(p.type),
    async parer(p: calloutNode) {
      return `<em>${我来md导出.NodeTitleToMarkdown(p.attributes.title)}</em>`;
    },
  },
  /** 分割线 */
  {
    check: (p) => ["divider"].includes(p.type),
    async parer(p: Node) {
      return `---`;
    },
  },
  /** 文件 */
  {
    check: (p) => ["file"].includes(p.type),
    async parer(p: fileNode) {
      /** TODO 这里需要获取签名才能访问 */
      const src = encodeURIComponent(`https://${p.attributes.bucket[0][0]}.wolai.com/${p.attributes.file[0]}`);
      return `[file:${p.attributes.alias[0]}](${src}})`;
    },
  },
  /** 公式 */
  {
    check: (p) => ["blockEquation"].includes(p.type),
    async parer(p: blockEquationNode) {
      /** TODO 这里需要获取签名才能访问 */
      return `$$\n${p.attributes.title.join("\n")}\n$$`;
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
      if (p.parent_id === p.page_id) {
        /** 顶层块 也就是当前页面块 */
        return `# [${NodeTitleToMarkdown(p.attributes.title)}](page:${p.id})`;
      } else {
        /** 页面内引用其他页面的块 */
        return `[${NodeTitleToMarkdown(p.attributes.title)}](page:${p.id})`;
      }
    },
  },
  {
    check: (p) => p.type === "todoList",
    async parer(p: todoListNode, pageChunkRes: pageChunkRes) {
      return `[${p.attributes.checked === "yes" ? "x" : " "}] ${NodeTitleToMarkdown(p.attributes.title)}`;
    },
  },
);

function sub_nodeToNode(p: Node, pageChunkRes: pageChunkRes) {
  return p.sub_nodes.map((id) => pageChunkRes.data.block[id].value);
}
我来md导出.registerSubNodeParer(
  /** 对页面下面的一级节点进行处理 */ {
    check: (p) => p.type === "page",
    async parer(md_str, p: Node, pageChunkRes) {
      return (
        md_str +
        "\n\n" +
        (
          await Promise.all(sub_nodeToNode(p, pageChunkRes).map((p) => 我来md导出.nodeToMarkdown(p, pageChunkRes)))
        ).join("\n\n")
      );
    },
  },
  /** 对列表类的层级进行处理 */ {
    check: (p) => ["bullList", "enumList", "todoList"].includes(p.type),
    async parer(md_str, p: Node, pageChunkRes) {
      /** 获取一个节点有多少父级 */
      function getNodeNumberOfLayers(p: Node, pageChunkRes: pageChunkRes) {
        let l = 0;
        let cur = p;
        while (cur?.parent_id) {
          l++;
          cur = pageChunkRes.data.block[cur.parent_id]?.value;
          if (cur?.type === "toggleList") {
            /** 不是相同的结构了，层级关系算到这里位置，更外层的层级关系交给该结构自行处理 */
            l++; /** 因为上面算了页面，这里将 toggleList 当做和页面一样看待 */
            break;
          }
        }
        /** 不算页面这一级 */
        return l - 1;
      }
      const l = getNodeNumberOfLayers(p, pageChunkRes) - 1;
      // console.log(l,p,md_str);

      const md_str_List = (
        await Promise.all(sub_nodeToNode(p, pageChunkRes).map((p) => 我来md导出.nodeToMarkdown(p, pageChunkRes)))
      ).map(
        (md_str) =>
          `${"".padEnd(/** 列表内的是当前节点的子节点而l是当前节点的层级，所以这里要+1 */ l + 1, "\t")}${md_str}`,
      );
      return `${md_str}${md_str_List.length ? "\n" + md_str_List.join("\n") : ""}`;
    },
  },
  /** 对折叠列表类的层级进行处理 */ {
    check: (p) => ["toggleList"].includes(p.type),
    async parer(md_str, p: Node, pageChunkRes) {
      const md_str_List = await Promise.all(
        sub_nodeToNode(p, pageChunkRes).map((p) => 我来md导出.nodeToMarkdown(p, pageChunkRes)),
      );
      return `<details>
      <summary>${md_str}</summary>
${md_str_List.join(_n)}
  </details>`;
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

  newBtn.querySelectorAll("span")[1].textContent = `[✨] 导出Markdown`;
  newBtn.addEventListener("click", async () => {
    if (curData === null) {
      return alert("没有获取到当前页面数据，您可以尝试刷新重试。");
    }
    const res = JSON.parse(curData);
    const md = await 我来md导出.toMarkdown(res);
    const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    console.log(`[markdown:${downloadUrl}]\n----\n`, md);
    console.log("[copy(md)]", copy(md));
    alert("复制成功");
  });
});

namespace 附加按钮 {
  export let 已附加 = false;
}
/** 替换 windows 上的 xml 对象 */
//@ts-ignore
unsafeWindow.XMLHttpRequest = XMLHttpRequest;
