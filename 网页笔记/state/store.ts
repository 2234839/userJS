import { writable } from "svelte/store";
export const msg = writable("");

/** 用来显示笔记的地方 */
export const note_list_store = writable([] as Note[]);

/** 笔记的类型 */
type Note = {
  /** 挂载点 */
  point: Element;
  /** 内容 */
  content: string;
};

