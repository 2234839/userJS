import { Style } from "./style";

/** 消息的基类 扩展类记得重写 thatMessage 以免公用出现bug */
export class Message{
    el=document.createElement('msg-llej')
    /** 用来指向不同的类，以便扩展这个类的类的old_message不被公用 */

    private autoHideTime=1000*3
    constructor(par: Message_Data){
        this.setThis(par);
    }
    /** 进行一些赋值工作 */
    private setThis({ style=Style.message,msg}:Message_Data) {
        this.el.innerHTML = `
        <div style="${style}">${msg}</div>
        `;
    }

    /** 展示el */
    show(){
        document.body.appendChild(this.el)
        return this
    }
    /** 隐藏el */
    hide() {
        this.el.remove()
        return this
    }
    /** 展示el  autoHideTime 毫秒后隐藏*/
    autoHide(){
        this.show()
        setTimeout(() => {
            this.hide()
        }, this.autoHideTime);
        return this
    }
    /** 获取一个Messag对象，它不一定是新的。这是为了优化内存占用 */
    static getMessage(par:Message_Data){
        return new Message(par)
    }
}


export interface Message_Data{
    msg: string
    style?:string
}

console.log(typeof Message);
