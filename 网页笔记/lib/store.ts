import { reactive } from "vue";
import { loadChanges } from "../fun/fun";
import { AllStoreName } from "../config";
import { commandJSON } from "../fun/command";

/** 设置一条本地存储 */
export async function setLocalItem(name: string, value: string) {
  //为了在非油猴环境下存储依旧能起一部分的作用
  if (typeof unsafeWindow !== "undefined") {
    return await GM.setValue(name, value);
  } else {
    return await localStorage.setItem(name, String(value));
  }
}

/** 读取一条本地存储 */
export async function getLocalItem<T>(/** 键名 */ name: string, /** 没有的时候的默认值 */ defaultValue?: T) {
  if (typeof unsafeWindow !== "undefined") {
    const res = await GM.getValue(name, defaultValue);
    return res;
  } else {
    //为了在非油猴环境下存储依旧能起一部分的作用
    const value = localStorage.getItem(name);
    if (value === null) return await defaultValue;
    return await value;
  }
}

/** 所有被存储的东西 */
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
  /** 自动加载本地暂存更改 */
  (async () => {
    console.log(curStore);
    if (document.readyState === "complete") {
      loadChanges(curStore);
    } else {
      window.addEventListener("load", function () {
        loadChanges(curStore);
      });
    }
  })();
});
