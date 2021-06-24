import { writable } from "svelte/store";

/** 目前在呈现的消息列表 */
export const messageList = writable<unknown[]>([]);

/** 消息的基类 扩展类记得重写 thatMessage 以免公用出现bug */
export class Message {
  /** 用来指向不同的类，以便扩展这个类的类的old_message不被公用 */
  private autoHideTime = 1000 * 3;
  constructor(public par: Message_Data) {}

  /** 展示el */
  show() {
    messageList.update((r) => [...r, this]);
    return this;
  }
  /** 隐藏el */
  hide() {
    messageList.update((r) => r.filter((el) => this !== el));
    return this;
  }
  /** 展示el  autoHideTime 毫秒后隐藏*/
  autoHide() {
    this.show();
    setTimeout(() => {
      this.hide();
    }, this.autoHideTime);
    return this;
  }
  /** 获取一个Message对象 */
  static getMessage(par: Message_Data) {
    return new Message(par);
  }
}

export interface Message_Data {
  msg: string;
  style?: string;
}
