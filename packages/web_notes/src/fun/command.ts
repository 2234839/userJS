import { Message } from "../ui/message";
import { getSelectors, log } from "../util";
import { note_list_store } from "../state/store";
import { get } from "svelte/store";
import { styleList } from "../state/highlighted_style";
import { curStore } from "../lib/store";

/** 每一个命令都应该实现的东西 */
export class Command {
  selectEL: HTMLElement;
  constructor(/** 命令执行的元素 */ select?: HTMLElement) {
    if (select === undefined) {
      //TODO 这里
      this.selectEL = document.createElement("div");
    } else {
      this.selectEL = select;
    }
  }
  /** 执行这个命令 */
  do() {
    return this;
  }
  /** 撤销这个命令 */
  undo() {
    return this;
  }
  /** 重新执行命令 */
  redo() {
    return this.do();
  }
  /** 将命令变成可以转化为json字符串的对象 */
  toJSON(): commandJSON {
    return {
      selectEL: this.selectEL ? getSelectors(this.selectEL) : "",
      constructor: (<any>this).__proto__.constructor.name,
    };
  }
  /** 用于可以使用 toJSON 生成的数据重建功能效果 */
  public static 重建(obj: commandJSON) {
    return new this(
      document.querySelector<HTMLElement>(obj.selectEL) || undefined
    );
  }
  /** 加载commandJSON转变为命令,通过泛型来构造对象的方式 */
  static load<T>(obj: T, CLASS: { 重建: (par: T) => Command }) {
    return CLASS.重建(obj);
  }
}

/** 删除一个元素 */
export class deleteSelect extends Command {
  /** 被选中元素的显示状态 */
  selectEL_display?: string;
  do() {
    this.selectEL_display = this.selectEL.style.display;
    this.selectEL.style.display = "none";
    return this;
  }
  undo() {
    if (this.selectEL_display) {
      this.selectEL.style.display = this.selectEL_display;
    }
    return this;
  }
}
/** 使元素可编辑 */
export class editSelect extends Command {
  selectEL_contentEditable = "";
  do() {
    this.selectEL_contentEditable = this.selectEL.contentEditable;
    this.selectEL.contentEditable = "true";
    return this;
  }
  undo() {
    this.selectEL.contentEditable = this.selectEL_contentEditable;
    return this;
  }
}
/** 使元素不可编辑 */
export class closeEditSelect extends Command {
  selectEL_contentEditable = "";
  do() {
    this.selectEL_contentEditable = this.selectEL.contentEditable;
    this.selectEL.contentEditable = "false";
    return this;
  }
  undo() {
    this.selectEL.contentEditable = this.selectEL_contentEditable;
    return this;
  }
}
/** 新增一个笔记 */
export class addNote extends Command {
  do() {
    this.selectEL;
    note_list_store.update((list) => {
      list.push({
        point: this.selectEL,
        content: "6666666",
      });
      return list;
    });
    return this;
  }
  undo() {
    return this;
  }
  redo() {
    return this;
  }
}

/** 高亮功能 */
export class Highlighted extends Command {
  /** css 类名 */
  public className = `llej-page_notes-style-${curStore.Highlighted_count++}`;
  constructor(private styleText: string) {
    super();
  }
  do() {
    styleList.update((r) => {
      return [...r, this.getRawStyleText()];
    });
    return this;
  }
  getRawStyleText() {
    return `
    .${this.className}{
      ${this.styleText}
    }
    `;
  }
  undo() {
    styleList.update((r) => {
      return r.filter((el) => el !== this.getRawStyleText());
    });
    return this;
  }
  static 重建(obj: ReturnType<Highlighted["toJSON"]>) {
    const r = new this(obj.styleText);
    r.className = obj.className;
    return r;
  }
  toJSON() {
    return {
      selectEL: "",
      className: this.className,
      styleText: this.styleText,
      constructor: (<any>this).__proto__.constructor.name,
    };
  }
}

/** 命令控制器 */
export const CommandControl: CommandControl = {
  commandStack: [],
  backOutStack: [],
  pushCommand(command) {
    return this.commandStack.push(command);
  },
  run(command) {
    try {
      this.backOutStack.splice(0, this.backOutStack.length);
      return this.pushCommand(command.do());
    } catch (error) {
      console.error("命令执行失败", command);
    }
    return -1;
  },
  backOut() {
    if (this.commandStack.length === 0) {
      Message.getMessage({ msg: "命令栈已空，无法进行撤销" }).autoHide();
      return -1;
    }
    const command = this.commandStack.pop();
    if (command) {
      return this.backOutStack.push(command.undo());
    }
    return -1;
  },
  reform() {
    if (this.backOutStack.length === 0) {
      Message.getMessage({ msg: "撤销栈已空，无法进行重做" }).autoHide();
      return -1;
    }
    const command = this.backOutStack.pop();
    if (command) {
      return this.commandStack.push(command.redo());
    }
    return -1;
  },
  /** 从json重建命令栈 */
  loadCommandJSON(obj) {
    log("-执行命令-", obj.constructor);
    if (obj.constructor === "deleteSelect")
      return Command.load(obj, deleteSelect);
    if (obj.constructor === "editSelect") return Command.load(obj, editSelect);
    if (obj.constructor === "closeEditSelect")
      return Command.load(obj, closeEditSelect);
    if (obj.constructor === "addNote") return Command.load(obj, addNote);
    if (obj.constructor === "Highlighted")
      return Command.load(obj as any, Highlighted);
  },
  getCommandStackJSON() {
    return JSON.stringify(this.commandStack);
  },
  loadCommandJsonAndRun(commandJSON) {
    commandJSON.map(this.loadCommandJSON).forEach((command) => {
      if (command) {
        this.run(command);
      }
    });
    return true;
  },
};

/** 规定了命令转成 json 的结构 */
export interface commandJSON {
  /** 选择器 */
  selectEL: string;
  /** 构造函数的名字，一般就是类名 */
  constructor: string;
  /** 注意，要能被序列化 */
  [k: string]: any;
}
/** 命令控制器的接口 */
interface CommandControl {
  /** 命令栈，执行过的 */
  commandStack: Command[];
  /** 撤销栈，被撤销的命令 */
  backOutStack: Command[];
  /** 向命令栈中添加一个命令 */
  pushCommand(command: Command): number;
  /** 执行一个命令并加入命令栈，清空撤销栈 */
  run(command: Command): number;
  /** 撤销最后一个命令并加入撤消栈 */
  backOut(): number;
  /** 重做,重做撤销栈中的命令,命令会被转移至命令栈 */
  reform(): number;
  /** 加载commandJSON转化为命令对象 */
  loadCommandJSON(obj: commandJSON): Command | void;

  /** 获取命令栈的JSON字符串 */
  getCommandStackJSON(): string;

  /** 加载命令栈的JSON字符串并且执行 */
  loadCommandJsonAndRun(commandJSON: commandJSON[]): boolean;
}
