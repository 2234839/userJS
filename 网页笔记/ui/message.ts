import { Style } from "./style";

export class Message{
    el=document.createElement('msg-llej')
    private autoHideTime=1000*3
    constructor({ msg, style = Style.message }: Message_Data){
        this.el.innerHTML=`
        <div style="${style}">${msg}</div>
        `
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
    }
}


export interface Message_Data{
    msg: string
    style?:string
}