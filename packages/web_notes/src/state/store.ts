import { writable } from "svelte/store";
import { getLocalItem, setLocalItem } from "../lib/store";

/** 用来显示笔记的地方 */
export const note_list_store = writable([] as Note[]);

/** 笔记的类型 */
type Note = {
  /** 挂载点 */
  point: Element;
  /** 内容 */
  content: string;
};

const defaultSetting = {
  a: 3,
  swatches: {
    textColor: {
      default: "#333",
      list: [
        "#EB5757",
        "#F2C94C",
        "#9B51E0",
        "#E0E0E0",
        "#2F80ED",
        "#2F80ED",
        "#828282",
        "#27AE60",
        "#27AE60",
        "#EB5757",
        "#56CCF2",
        "#F2994A",
        "#4F4F4F",
        "#219653",
        "#BB6BD9",
        "#F2F2F2",
        "#2D9CDB",
        "#2D9CDB",
        "#BDBDBD",
        "#6FCF97",
        "#6FCF97",
      ],
    },
    bgColor: {
      default: "#EB5757",
      list: [
        "#EB5757",
        "#F2C94C",
        "#9B51E0",
        "#E0E0E0",
        "#2F80ED",
        "#2F80ED",
        "#828282",
        "#27AE60",
        "#27AE60",
        "#EB5757",
        "#56CCF2",
        "#F2994A",
        "#4F4F4F",
        "#219653",
        "#BB6BD9",
        "#F2F2F2",
        "#2D9CDB",
        "#2D9CDB",
        "#BDBDBD",
        "#6FCF97",
        "#6FCF97",
      ],
    },
    underlineColor: {
      default: "#EB5757",
      list: [
        "#EB5757",
        "#F2C94C",
        "#9B51E0",
        "#E0E0E0",
        "#2F80ED",
        "#2F80ED",
        "#828282",
        "#27AE60",
        "#27AE60",
        "#EB5757",
        "#56CCF2",
        "#F2994A",
        "#4F4F4F",
        "#219653",
        "#BB6BD9",
        "#F2F2F2",
        "#2D9CDB",
        "#2D9CDB",
        "#BDBDBD",
        "#6FCF97",
        "#6FCF97",
      ],
    },
  },
};

class PageNotesStore<T extends { [k: string]: any }, K extends keyof T> {
  private store = {} as T;
  /** 没有加载玩配置这个 promise 不会结束 */
  private initializing: Promise<any>;
  private _writable = writable({} as T);
  constructor(private storePath: string) {
    this.initializing = getLocalItem(
      storePath,
      JSON.stringify(defaultSetting)
    ).then((r) => {
      if (r) {
        this.store = JSON.parse(r);
      }
      this._writable.set(this.store);

      this._writable.subscribe((r) => {
        this.store = r;
        this.save(r);
      });
      return;
    });
  }
  protected async getStore(): Promise<T> {
    await this.initializing;
    return this.store;
  }
  protected save(r: T) {
    setLocalItem(this.storePath, JSON.stringify(r));
  }
  getWritable() {
    return this._writable;
  }

  async get(k: K): Promise<T[K]> {
    return (await this.getStore())[k];
  }
  async set(k: K, value: T[K]) {
    const s = await this.getStore();
    s[k] = value;
    this._writable.set(s);
    this.save(s);
  }
}

type defaultSetting = typeof defaultSetting;

/** 设置相关的存储 */
export const settingStore = new PageNotesStore<
  defaultSetting,
  keyof defaultSetting
>("__setting__");
