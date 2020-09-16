/** 当前被选中的元素 */

import { fireStore } from "./remote.state";

export let currentElement: HTMLElement;

export let path: HTMLElement[];

/** 修改当前指向的元素和路径 */
export function setPath(elList: HTMLElement[]) {
  path = elList;
  currentElement = elList[0];
}

/** 标记被修改后的元素(被污染了的元素)，以便保存修改的内容 */
export const editElement: Set<Element> = new Set();

const globalSettingRef = fireStore.doc("setting/global");
globalSettingRef.onSnapshot({
  next(r) {
    console.log("[    r]", r.data());
  },
});
// globalSettingRef.update({
//   test: 3,
// });
// globalSettingRef
//   //   .doc("samples/sandwichData")
//   .get()
//   .then((r) => {});
