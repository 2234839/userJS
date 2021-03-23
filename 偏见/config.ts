import { 知乎答案不见 } from "./内置处理函数/知乎";

export type config = {
  标签文本: string;
  规则列表: {
    目标选择器: string;
    // 处理函数(el: Element, data: string[]): void; 这里需要可序列化
    处理函数: string;
  }[];
  数据: string[];
}[];

export const user_config: config = [
  {
    标签文本: "黑名单",
    规则列表: [
      {
        目标选择器: ".ContentItem",
        处理函数: 知乎答案不见.toString(),
      },
    ],
    数据: ["gu-shi-dang-an-ju-71,故事档案局"],
  },
];
