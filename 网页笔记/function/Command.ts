import { Message } from "../ui/message";
import { note } from "../ui/note";
import { getSelectors } from "../util";

export interface commandJSON{
    /** 选择器 */
    selectEL: string,
    /** 构造函数的名字，一般就是类名 */
    constructor: string
}

/** 每一个命令都应该实现的东西 */
class Command {
    selectEL: HTMLElement
    constructor(/** 要被删除的元素 */ select: HTMLElement) {
        this.selectEL = select
    }
    /** 执行这个命令 */
    do() {
        return this
    }
    /** 撤销这个命令 */
    undo() {
        return this
    }
    /** 重新执行命令 */
    redo() {
        return this.do()
    }
    /** 将命令变成可以转化为json字符串的对象 */
    toCommandJSON():commandJSON {
        return {
            selectEL: getSelectors(this.selectEL),
            constructor: (<any>this).__proto__.constructor.name
        }
    }
    /** 加载commandJSON转变为命令,通过泛型来构造对象的方式 */
    static load<T>(obj: commandJSON, CLASS: new (el: HTMLElement) => T) {
        return new CLASS(document.querySelector(obj.selectEL))
    }
}

/** 删除一个元素 */
export class deleteSelect extends Command {
    selectEL_display: string
    do() {
        this.selectEL_display = this.selectEL.style.display
        this.selectEL.style.display = "none"
        return this
    }
    undo() {
        this.selectEL.style.display = this.selectEL_display
        return this
    }
}

/** 使元素可编辑 */
export class editSelect extends Command {
    selectEL_contentEditable: string
    do() {
        this.selectEL_contentEditable = this.selectEL.contentEditable
        this.selectEL.contentEditable = 'true';
        return this
    }
    undo() {
        this.selectEL.contentEditable = this.selectEL_contentEditable
        return this
    }
}

/** 使元素不可编辑 */
export class closeEditSelect extends Command {
    selectEL_contentEditable: string
    do() {
        this.selectEL_contentEditable = this.selectEL.contentEditable
        this.selectEL.contentEditable = 'false';
        return this
    }
    undo() {
        this.selectEL.contentEditable = this.selectEL_contentEditable
        return this
    }
}

/** 新增一个笔记 */
export class addNote extends Command {
    note: note
    do() {
        this.note = new note({ el: this.selectEL }).show()
        return this
    }
    undo() {
        this.note.hide()
        return this
    }
    redo() {
        this.note.show()
        return this
    }
}

/** 命令控制器 */
export const CommandControl: CommandControl = {
    commandStack: [],
    backoutStack: [],
    pushCommand(command) {
        return this.commandStack.push(command)
    },
    run(command) {
        try {
            this.backoutStack.splice(0, this.backoutStack.length)
            return this.pushCommand(command.do())
        } catch (error) {
            console.error('命令执行失败',command,error);
        }
        return -1
    },
    backout() {
        if (this.commandStack.length === 0) {
            console.warn('命令栈已空，无法进行撤销');
            Message.getMessage({ msg: '命令栈已空，无法进行撤销' }).autoHide()
            return
        }
        const command = this.commandStack.pop()
        return this.backoutStack.push(command.undo())
    },
    reform() {
        if (this.backoutStack.length === 0) {
            console.warn('撤销栈已空，无法进行重做');
            Message.getMessage({ msg: '撤销栈已空，无法进行重做' }).autoHide()
            return
        }
        const command = this.backoutStack.pop()
        return this.commandStack.push(command.redo())
    },
    loadCommandJSON(obj) {
        if (obj.constructor === "deleteSelect")
            return Command.load(obj, deleteSelect)
        if (obj.constructor === "editSelect")
            return Command.load(obj, editSelect)
        if (obj.constructor === "closeEditSelect")
            return Command.load(obj, closeEditSelect)
        if (obj.constructor === "addNote")
            return Command.load(obj, addNote)
    },
    getCommandStackJsonObj(){
        return this.commandStack.map(a => a.toCommandJSON())
    },
    getCommandStackJSON(){
        return JSON.stringify(this.getCommandStackJsonObj())
    },
    loadCommandJsonAndRun(commandJSON){
        commandJSON
            .map(this.loadCommandJSON)
            .forEach(command=>this.run(command))
        return true
    }
}

/** 命令控制器的接口 */
interface CommandControl {
    /** 命令栈，执行过的 */
    commandStack: Command[]
    /** 撤销栈，被撤销的命令 */
    backoutStack: Command[]
    /** 向命令栈中添加一个命令 */
    pushCommand(command: Command): number
    /** 执行一个命令并加入命令栈，清空撤销栈 */
    run(command: Command): number
    /** 撤销最后一个命令并加入撤消栈 */
    backout(): number
    /** 重做,重做撤销栈中的命令,命令会被转移至命令栈 */
    reform(): number
    /** 加载commandJSON转化为命令对象 */
    loadCommandJSON(obj: commandJSON):Command

    /** 不是很关键的一些命令。用来提供方便的 */

    /** 获取命令栈的JSON对象 */
    getCommandStackJsonObj(): any[]

    /** 获取命令栈的JSON字符串 */
    getCommandStackJSON():string

    /** 加载命令栈的JSON字符串并且执行 */
    loadCommandJsonAndRun(commandJSON:commandJSON[]): boolean
}