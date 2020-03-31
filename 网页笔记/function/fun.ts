import config, { AllStoreName } from "../config";
import { AllStore, setLocalItem } from "../lib/store";
import { Message } from "../ui/message";
import { remote_getStore, remote_setStore, remote_register, _login } from "./ajax";
import { CommandControl, editSelect, deleteSelect, closeEditSelect, addNote } from "./command";
import { currentElement, editElement } from "../state/index";
import { Warning } from "../ui/warning";
import $, { getSelectors } from "../util";

/** ════════════════════════🏳‍🌈 提供给用户使用的功能 🏳‍🌈════════════════════════
 *
 ** ════════════════════════🚧 提供给用户使用的功能 🚧════════════════════════ */

/** 函数名 */
export const enum key_funName {
  editElement,
  deleteElement,
  copyTitle,
  closeEdit,
  backOut,
  undo,
  addNote,
  saveChanges,
  uploadThe,
  downloadThe,
  register,
  login,
}

export const fun = {
  /** 使元素可编辑 */
  [key_funName.editElement]() {
    if (currentElement.innerHTML.length > 10 * 1000)
      return new Warning({ msg: "该元素内容过大，请选择更确定的文本元素。" }).autoHide();
    CommandControl.run(new editSelect(currentElement));
  },
  /** 删除元素 */
  [key_funName.deleteElement]() {
    CommandControl.run(new deleteSelect(currentElement));
  },
  /** 复制title */
  [key_funName.copyTitle]() {
    $.copyTitle(currentElement);
  },
  /** 关闭可编辑 */
  [key_funName.closeEdit]() {
    CommandControl.run(new closeEditSelect(currentElement));
  },
  /** 撤销 */
  [key_funName.backOut]() {
    CommandControl.backOut();
  },
  /** 重做 */
  [key_funName.undo]() {
    CommandControl.reform();
  },
  /** 新增笔记 */
  [key_funName.addNote]() {
    CommandControl.run(new addNote(currentElement));
  },
  /** 保存所有的修改 */
  [key_funName.saveChanges]() {
    saveChanges(editElement);
    new Message({ msg: "保存成功" }).autoHide();
  },
  /** 将修改上传到云端 */
  async [key_funName.uploadThe]() {
    remote_setStore({
      url: config.locationUrl,
      store: await saveChanges(editElement),
    }).then((r) => {
      new Message({ msg: "云端存储:" + r.message }).autoHide();
    });
  },
  /** 从云端下载修改 */
  [key_funName.downloadThe]() {
    new Message({ msg: "正在读取云端存储" }).autoHide();
    remote_getStore({
      url: config.locationUrl,
    }).then((r) => {
      if (r.body === undefined || r.body.length === 0) return new Message({ msg: "云端存储:" + r.message }).autoHide();
      const allStore = <AllStore>JSON.parse(r.body[0].store);
      loadChanges(allStore);
      new Message({ msg: "云端存储:" + r.message }).autoHide();
    });
  },
  /** 注册 */
  [key_funName.register]() {
    register();
  },
  /** 登录 */
  [key_funName.login]() {
    login();
  },
};

/** 保存修改 */
async function saveChanges(editElement: Set<HTMLElement>) {
  let data: AllStore = {
    element_List: {},
    CommandStack: CommandControl.getCommandStackJsonObj(),
  };
  editElement.forEach((el) => {
    const selectors = getSelectors(el);
    data.element_List[selectors] = el.innerHTML;
  });
  const data_str = JSON.stringify(data);
  await setLocalItem(AllStoreName, JSON.stringify(data));
  return data_str;
}

/** 加载修改 */
export async function loadChanges(allStore: AllStore) {
  for (const selectors in allStore.element_List) {
    if (allStore.element_List.hasOwnProperty(selectors)) {
      const html = allStore.element_List[selectors];
      const el = document.querySelector(selectors);
      if (el === null) return console.error(`${selectors} 的元素无法找到，赋值失败`);
      editElement.add(<HTMLElement>el);
      el.innerHTML = html;
    }
  }
  CommandControl.loadCommandJsonAndRun(allStore.CommandStack);
}

function login() {
  const title = ">>>网页笔记<<<\n";
  const user = prompt(title + "请输入用户名");
  if (user === null) return;
  const secret_key = prompt(title + "请输入密钥。");
  if (secret_key === null) return;
  _login({
    user,
    secret_key,
  }).then((r) => {
    new Message({ msg: r.message }).autoHide();
  });
}
function register() {
  const title = ">>>网页笔记<<<\n";
  const user = prompt(title + "请输入用户名");
  if (user === null) return;
  const secret_key = prompt(title + "请输入密钥。要记住哦，没有提供找回功能");
  if (secret_key === null) return;
  remote_register({
    user,
    secret_key,
  }).then((r) => {
    new Message({ msg: r.message }).autoHide();
  });
}

const div = document.createElement("div");
div.style.outline = "2px solid red";
const outline_str = div.style.outline;
/** 轮廓线,用以显示当前元素 */
export function outline(el: HTMLElement) {
  if (el.style.outline !== outline_str) {
    //@ts-ignore
    el.__outline__ = el.style.outline;
    el.style.outline = outline_str;
  }
  setTimeout(reduction, 400);
  function reduction() {
    if (el == currentElement) {
      outline(el);
      /** 鼠标还在这个元素上，再等会 */
      return;
    }
    //@ts-ignore
    el.style.outline = el.__outline__;
  }
}

/** 自动保存 */
setInterval(function() {
  saveChanges(editElement);
}, 1000 * 60);
