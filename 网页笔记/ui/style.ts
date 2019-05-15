export class Style {
    static message = `
    border: 1px solid black;
    background-color: white;
    position: fixed;
    top: 20px;
    left: 30px;
    animation: llej_myfirst 5s;
    `
    static warning = `
    border: 1px solid black;
    background-color: red;
    position: fixed;
    top: 20px;
    left: 30px;
    `
}


/** 注入动画 */
const keyframes= document.createElement('style')
keyframes.innerHTML=`
@keyframes llej_myfirst
{
    from { background: red; }
    to { background: yellow; }
}
`
document.head.appendChild(keyframes)