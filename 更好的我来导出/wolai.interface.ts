export interface Block {
  role: string;
  value: midHeaderNode | pageNode | quoteNode | textNode | rowNode | columnNode | imageNode | codeNode | enumListNode;
}
export type NodeTitle = (
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
export interface Node {
  id: string;
  active: boolean;
  attributes: {
    title?: NodeTitle;
  };
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
export interface midHeaderNode extends Node {
  type: "midHeader";
  attributes: { title: NodeTitle };
}
export interface pageNode extends Node {
  type: "page";
  attributes: { title: NodeTitle };
}
export interface quoteNode extends Node {
  type: "quote";
  attributes: { title: NodeTitle };
}

export interface textNode extends Node {
  type: "text";
  attributes: { title: NodeTitle };
}
export interface rowNode extends Node {
  type: "row";
  attributes: {};
}
export interface columnNode extends Node {
  type: "column";
}
export interface imageNode extends Node {
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
    title: NodeTitle;
  };
}
export interface codeNode extends Node {
  type: "code";
  attributes: { title: NodeTitle; lineBreak: false; ligatures: false; language: "HTML"; line_number: false };
}
export interface todoListNode extends Node {
  type: "todoList";
  attributes: { title: NodeTitle; checked?: "no" | "yes" };
}
export interface bullListNode extends Node {
  type: "bullList";
  attributes: { title: NodeTitle; checked?: "no" | "yes" };
}
export interface enumListNode extends Node {
  type: "enumList";
  attributes: { title: NodeTitle; checked?: "no" | "yes" };
}

export interface toggleListNode extends Node {
  type: "toggleList";
  attributes: { title: NodeTitle; checked?: "no" | "yes" };
}
export interface calloutNode extends Node {
  type: "callout";
  attributes: { title: NodeTitle };
}
export interface bookmarkNode extends Node {
  type: "bookmark";
  attributes: {
    title: NodeTitle;
    /** 书签导向的真实地址 */ source: string;
    rich_media: {
      /** 网页的描述 */
      description?: string;
      hostname?: string;
      icons: { href: string }[];
      /** 缩略图 */
      thumbnail: { href: string }[];
      title: string;
    }[];
  };
}

export interface fileNode extends Node {
  type: "file";
  attributes: {
    title: NodeTitle;
    alias: string[];
    file: string[];
    bucket: string[][];
  };
}
export interface blockEquationNode extends Node {
  type: "blockEquation";
  attributes: {
    title: NodeTitle;
  };
}

/** 嵌入块 */
export interface embedNode extends Node {
  type: "embed";
  attributes: {
    title: NodeTitle;
    /** 嵌入块的地址 */ source: string;
    /** 嵌入块的地址 */ embedLink: string;
  };
}

export interface simpleTableNode extends Node {
  type: "simpleTable";
  attributes: {
    title: NodeTitle;
    cells: string;
    cellsJson: {
      column: {
        id: string;
        attributes: {
          title: NodeTitle;
        };
        setting: {};
      }[];
      flex: number;
    }[];
  };
}
export interface pageChunkRes {
  code: number;
  data: {
    block: {
      [id: string]: Block;
    };
    position: unknown;
  };
  message: string;
}

const t = [
  {
    column: [
      { id: "b1Bh3ZixtGpqabK5H9Ydd8", attributes: { title: [["这是简单表格", [["B"]]]] }, setting: {} },
      {
        id: "iHjmeSHDhTtyUnVEgfsTWS",
        attributes: { title: [["测试页面", [["BiLink", "cVskxFpJphYGSeukC7CdVx", "jf3mMBrXqF8vdnqQqVjg5X"]]]] },
        setting: {},
      },
      { id: "cAc1GmjYiSnn8ynQ7WsAMt", attributes: { title: [[""]] }, setting: {} },
      { id: "hDqmduG6xS8eXUjn3pwCN3", attributes: { title: [[""]] }, setting: {} },
    ],
    flex: 213,
  },
  {
    column: [
      { id: "jjEHZn7sH8ugFio7EK5Z6v", attributes: { title: [["第二列"]] }, setting: {} },
      { id: "kvMoYCoLqbcn72hM3ouGw2", attributes: { title: [[""]] }, setting: {} },
      { id: "jciogQDoDgdJ4wELDjcvap", attributes: { title: [[""]] }, setting: {} },
      { id: "3az2Bs1gpeNCuCm61B5RPE", attributes: { title: [[""]] }, setting: {} },
    ],
    flex: 100,
  },
  {
    column: [
      { id: "2CnQmWwweUqLyjhQz44SU8", attributes: { title: [[""]] }, setting: {} },
      { id: "4s8UdCfJRSE7nHU3HQP7nq", attributes: { title: [[""]] }, setting: {} },
      { id: "i8PeeR8pDDNdE8Z61PdbcZ", attributes: { title: [[""]] }, setting: {} },
      { id: "t2CgiRkcq1T9FoB3wjwijD", attributes: { title: [[""]] }, setting: {} },
    ],
    flex: 100,
  },
];
