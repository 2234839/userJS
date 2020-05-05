/** 油猴的一些功能 */
declare const GM: {
  getValue<T>(/** 键名 */ name: string, /** 没有的时候的默认值 */ defaultValue?: T): Promise<string | undefined>;
  setValue(name: string, value: string): Promise<string>;
  deleteValue(name: string): Promise<string>;

  xmlHttpRequest: any;
};

declare const unsafeWindow:typeof window;
