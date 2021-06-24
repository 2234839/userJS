import config, { AllStoreName } from "../config";
import { AllStore, curStore, setLocalItem } from "../lib/store";
import { Message } from "../ui/message";
import { remote_getStore, remote_setStore, remote_register, _login } from "./ajax";
import { CommandControl, editSelect, deleteSelect, closeEditSelect, addNote } from "./command";
import { currentElement, editElement, setPath } from "../state/index";
import { Warning } from "../ui/warning";
import $, { getSelectors, nodePath, log } from "../util";

/** ════════════════════════🏳‍🌈 提供给用户使用的功能 🏳‍🌈════════════════════════
 *
 ** ════════════════════════🚧 提供给用户使用的功能 🚧════════════════════════ */

export const fun = {
  /** 使元素可编辑 */
  editElement() {
    if (currentElement.innerHTML.length > 10 * 1000)
      return new Warning({ msg: "该元素内容过大，请选择更确定的文本元素。" }).autoHide();
    CommandControl.run(new editSelect(currentElement));
  },
  /** 删除元素 */
  deleteElement() {
    CommandControl.run(new deleteSelect(currentElement));
  },
  /** 复制title */
  copyTitle() {
    $.copyTitle(currentElement);
  },
  /** 关闭可编辑 */
  closeEdit() {
    CommandControl.run(new closeEditSelect(currentElement));
  },
  /** 撤销 */
  backOut() {
    CommandControl.backOut();
  },
  /** 重做 */
  undo() {
    CommandControl.reform();
  },
  /** 新增笔记 */
  addNote() {
    CommandControl.run(new addNote(currentElement));
  },
  /** 保存所有的修改 */
  saveChanges() {
    saveChanges(editElement);
    new Message({ msg: "保存成功" }).autoHide();
  },
  /** 将修改上传到云端 */
  async uploadThe() {
    remote_setStore({
      url: config.locationUrl,
      store: await saveChanges(editElement),
    }).then((r) => {
      new Message({ msg: "云端存储:" + r.message }).autoHide();
    });
  },
  /** 从云端下载修改 */
  downloadThe() {
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
  register() {
    register();
  },
  /** 登录 */
  login() {
    login();
  },
};
/** 按键和函数的映射关系 */
export const KeyMap = {
  KeyQ: [fun.editElement],
  KeyD: [fun.deleteElement],
  KeyC: [fun.copyTitle],
  KeyW: [fun.closeEdit],
  KeyZ: [fun.backOut],
  KeyY: [fun.undo],
  KeyN: [fun.addNote],
  KeyS: [fun.saveChanges],
  KeyO: [fun.uploadThe],
  KeyP: [fun.downloadThe, fun.saveChanges],
  KeyK: [fun.register],
  KeyL: [fun.login],
  F2:[] as any[],
  KeyM:[] as any[],
};
/** 编辑模式下才能运行 */
function editRun<T extends () => void>(list: T[]): (() => void)[] {
  return list.map((f) => async () => {
    if (config.elementEdit === false) {
      log("没有开启编辑功能");
    } else {
      return await f();
    }
  });
}

/** 保存修改 */
export async function saveChanges(editElement: Set<Element>) {
  const data = {
    element_List: {} as AllStore["element_List"],
    CommandStack: CommandControl.commandStack,
  };
  /** 获取修改过的元素的html */
  editElement.forEach((el) => {
    const selectors = getSelectors(el);
    data.element_List[selectors] = el.innerHTML;
  });
  const data_str = JSON.stringify(Object.assign(curStore, data));
  await setLocalItem(AllStoreName, JSON.stringify(data));
  return data_str;
}

/** 加载修改 */
export async function loadChanges(allStore: AllStore) {
  /** 将修改过的 html 写回去 */
  for (const selectors in allStore.element_List) {
    const html = allStore.element_List[selectors];
    const el = document.querySelector(selectors);
    if (el === null) {
      console.error(`${selectors} 的元素无法找到，无法重写`);
    } else {
      editElement.add(<HTMLElement>el);
      el.innerHTML = html;
      log("-重写-", selectors,el);
    }
  }
  /** 重新执行命令栈 */
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

/** 轮廓线,用以显示当前元素 */
export function outline(el: HTMLElement) {
  el.classList.add("user_js_llej_outline");
  setTimeout(reduction, 400);
  function reduction() {
    if (el == currentElement) {
      outline(el);
      /** 鼠标还在这个元素上，再等会 */
      return;
    }
    el.classList.remove("user_js_llej_outline");
  }
}
/** 监听鼠标移动 */
export function on_mouse(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    setPath(nodePath(event.target));

    if (config.elementEdit) {
      outline(event.target);
    }
  }
}
/** 监测按键事件 */
export async function on_keydown(event: KeyboardEvent) {
  const code = event.code;

  if (code in KeyMap) {
    if (isEditing()) {
      // return new Message({ msg: "有元素获得焦点，视为正在输入文本，不执行指令" }).autoHide();
      return
    } else {
      if (code === "F2" || code === "KeyM") {
        /** 切换编辑模式 */
        return switchState();
      } else if (config.elementEdit === false) {
        log("没有开启编辑功能");
      } else {
        /** 执行按键绑定的函数 */
        const func_list = KeyMap[code as keyof typeof KeyMap];
        log(`[按下了] ${code},执行了: ${(func_list as Function[]).map((f) => f.name).join(" ")}`);
        for await (const f of func_list) {
          await f();
        }
      }
    }
  } else {
    log("未注册该按键处理程序 " + code);
  }
  function isEditing() {
    return (
      document.querySelector(":focus") ||
      /** 如果目标元素是自定义组件的话上面这个还检测不了，需要检测 shadow 中是否存在焦点 */
      //@ts-expect-error
      (event.target.shadowRoot && event.target.shadowRoot.querySelector(":focus"))
    );
  }
}
/** 编辑事件 */
export function on_input(event: Event) {
  if (event.target instanceof HTMLElement) {
    const el = event.target;
    if (el.innerHTML.length > 10 * 1000)
      new Warning({
        msg: "该元素html内容过大，将不会保存这里的修改，请选择更确定的文本元素。",
      }).autoHide();
    else editElement.add(el);
  }
}
/** 切换状态 */
export function switchState() {
  return (config.elementEdit = !config.elementEdit);
}
