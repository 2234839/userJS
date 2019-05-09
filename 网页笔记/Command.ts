
/** 每一个命令都应该实现的东西 */
interface Command {
    /** 执行这个命令 */
    do(): this
    /** 撤销这个命令 */
    undo(): this
    /** 重新执行命令 */
    redo(): this
}

/** 删除一个元素 */
export class deleteSelect implements Command {
    selectEL: HTMLElement
    selectEL_display: string
    constructor(/** 要被删除的元素 */ select: HTMLElement) {
        this.selectEL = select
    }
    do() {
        this.selectEL_display = this.selectEL.style.display
        this.selectEL.style.display = "none"
        return this
    }
    undo() {
        this.selectEL.style.display = this.selectEL_display
        return this
    }
    redo() {
        this.do()
        return this
    }
}

/** 使元素可编辑 */
export class editSelect implements Command {
    selectEL: HTMLElement
    selectEL_contentEditable: string
    constructor(/** 要操作的元素 */ select: HTMLElement) {
        this.selectEL = select
    }
    do() {
        this.selectEL_contentEditable=this.selectEL.contentEditable
        this.selectEL.contentEditable = 'true';
        return this
    }
    undo() {
        this.selectEL.contentEditable=this.selectEL_contentEditable
        return this
    }
    redo() {
        this.do()
        return this
    }
}

/** 命令控制器 */
export const CommandControl: CommandControl = {
    commandStack: [],
    backoutStack: [],
    pushCommand(command: Command) {
        return this.commandStack.push(command)
    },
    run(command: Command) {
        this.backoutStack.splice(0,this.backoutStack.length)
        return this.pushCommand(command.do())
    },
    backout() {
        if (this.commandStack.length===0){
            console.warn('命令栈已空，无法进行撤销');
            return
        }
        const command=this.commandStack.pop()
        return this.backoutStack.push(command.undo())
    },
    reform(){
        if (this.backoutStack.length === 0) {
            console.warn('撤销栈已空，无法进行重做');
            return
        }
        const command = this.backoutStack.pop()
        return this.commandStack.push(command.redo())
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
    reform():number
}