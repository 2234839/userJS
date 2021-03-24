import type { AjaxHook } from "../util/ajax-hook";
import type { Flag } from "./flag.enum";
import { 知乎推荐不见, 知乎答案不见 } from "./内置处理函数/知乎";

export type domRule = {
  type: "dom";
  目标选择器: string;
  处理函数?: (el: Element, data: string[], flag: typeof Flag) => void;
  处理函数文本: string;
};

export type resRule = {
  type: "res";
  处理函数?: (
    config: AjaxHook.reqConfig,
    res: any,
    data: string[],
    flag: typeof Flag,
  ) => void;
  处理函数文本: string;
};
export type allRule = domRule | resRule;
export type config = {
  标签文本: string;
  /** 使用 new RegExp(生效范围正则) 来匹配网页地址，匹配不上的不会生效 */
  生效范围正则: string;
  规则列表: allRule[];
  数据: string[];
  数据需求描述: string;
}[];

export const user_config: config = [
  {
    标签文本: "崮生提供的黑名单规则",
    生效范围正则: "//www.zhihu.com/",
    规则列表: [
      {
        type: "dom",
        目标选择器: ".ContentItem",
        处理函数文本: 知乎答案不见.toString(),
      },
      {
        type: "res",
        处理函数文本: 知乎推荐不见.toString(),
      },
    ],
    数据: ["gu-shi-dang-an-ju-71,故事档案局"],
    数据需求描述:
      "填入用户 id 例如「gu-shi-dang-an-ju-71,故事档案局,其他任意文本可有可无」，id 和 name 都需要，在推荐页面会通过 name 来屏蔽（难以拿到id进行比较）",
  },
];
