import { Style } from "./style";

const old_message:Message[]=[]
const new_message: Message[] = []

export class Message{
    el=document.createElement('msg-llej')
    private autoHideTime=1000*3
    constructor(par: Message_Data){
        this.setThis(par);
        new_message.push(this)
    }
    /** 进行一些赋值工作 */
    private setThis({ style,msg}:Message_Data) {
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
        old_message.push(this)
        return this
    }
    /** 展示el  autoHideTime 毫秒后隐藏*/
    autoHide(){
        this.show()
        setTimeout(() => {
            this.hide()
        }, this.autoHideTime);
    }
    /** 获取一个Messag对象，它不一定是新的。这是为了优化内存占用 */
    static getMessage(par:Message_Data){
        if(old_message.length===0){/** 没有旧的对象 */
            return new Message(par)
        }
        const msg=old_message.pop()
        msg.setThis(par)
        new_message.push(msg)
    }
}


export interface Message_Data{
    msg: string
    style?:string
}