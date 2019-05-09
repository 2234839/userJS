
const commandStack=[]

/** 每一个命令都应该实现的东西 */
interface Command{
    /** 执行这个命令 */
    do():this
    /** 撤销命令 */
    undo(): this
    /** 重新执行命令 */
    redo(): this
}

/** 删除一个元素 */
class deleteSelect implements Command{
    selectEL: HTMLElement
    selectEL_display:string
    constructor(/** 要被删除的元素 */ select:HTMLElement){
        this.selectEL=select
        this.selectEL_display=select.style.display
    }
    do(){
        this.selectEL.style.display="none"
        return this
    }
    undo(){
        this.selectEL.style.display = this.selectEL_display
        return this
    }
    redo(){
        this.selectEL.style.display = this.selectEL_display
        return this
    }
}