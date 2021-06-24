export class Style {
    static message = `
    border: 1px solid black;
    background-color: white;
    position: fixed;
    top: 20px;
    left: 30px;
    animation: llej_myfirst 5s;
    z-index:800;
    `
    static warning = `
    border: 1px solid black;
    background-color: red;
    position: fixed;
    top: 20px;
    left: 30px;
    z-index:800;
    `
    static note = `
    border: 1px solid black;
    background-color: #c6c5ba;
    position: sticky;
    top: 20px;
    left: 30px;
    width: auto;
    height: auto;
    z-index:800;
    `
}

/** 注入动画 */
const keyframes= document.createElement('style')
keyframes.innerHTML=`
@keyframes llej_myfirst
{
    from { background: red;color:white; }
    to { background: yellow;color:black; }
}
`
document.head.appendChild(keyframes)