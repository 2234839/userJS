import { reactive, watchEffect } from "vue";
import { getWindow, log } from "../util";
import { AllStoreName } from "../config";
import { Command, commandJSON } from "../fun/command";

const w = getWindow();

/** 设置一条本地存储 */
export async function setLocalItem(name: string, value: string) {
  //为了在非油猴环境下存储依旧能起一部分的作用
  if (w.hasOwnProperty("GM") && w.hasOwnProperty("GM")) {
    return await GM.setValue(name, value);
  } else {
    return await localStorage.setItem(name, String(value));
  }
}

/** 读取一条本地存储 */
export async function getLocalItem<T>(/** 键名 */ name: string, /** 没有的时候的默认值 */ defaultValue?: T) {
  if (w.hasOwnProperty("GM") && w.hasOwnProperty("GM")) {
    const res = await GM.getValue(name, defaultValue);
    return res;
  } else {
    //为了在非油猴环境下存储依旧能起一部分的作用
    const value = localStorage.getItem(name);
    if (value === null) return await defaultValue;
    return await value;
  }
}

/** 存储所有的东西 */
export interface AllStore {
  CommandStack: commandJSON[];
  element_List: {
    [/** 选择器 */ name: string]: /** innerHTML */ string;
  };
  Highlighted_count: number;
}

export const curStore = reactive({
  CommandStack: [] as commandJSON[],
  element_List: {} as {
    [/** 选择器 */ name: string]: /** innerHTML */ string;
  },
  /** 用于记录高亮 id 避免新高亮出现重复 */
  Highlighted_count: 0 as number,
});

getLocalItem(AllStoreName, "{}").then((s) => {
  Object.assign(curStore, JSON.parse(s));
});

watchEffect(() => {
  log("存储变更", curStore);
});
