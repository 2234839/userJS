import { Message, Message_Data } from "./message";
import { Style } from "./style";

export class Warning extends Message{
    constructor({ msg }: Message_Data){
        super({ msg ,style:Style.warning})
    }
}