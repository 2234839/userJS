import { Message } from "./message";
import { Style } from "./style";

/** 笔记的 */
export class note extends Message{
    selectEl:HTMLElement
    constructor({ el}:{el:HTMLElement}){
        super({msg:'111111111111111111111',style:Style.note})
        this.selectEl = el
    }
    show(){
        this.selectEl.appendChild(this.el)
        return this
    }
}