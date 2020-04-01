<script>
  import {
    fade,
    blur,
    crossfade,
    draw,
    fly,
    scale,
    slide
  } from "svelte/transition";
  import { msg } from "./state/store";
  import config, { AllStoreName, KeyMap } from "./config";
  import { CommandControl } from "./function/command";
  import { fun, loadChanges, outline } from "./function/fun";
  import { AllStore, getLocalItem, setLocalItem } from "./lib/store";
  import { editElement, setPath } from "./state/index";
  import { Warning } from "./ui/warning";
  import { nodePath } from "./util";
  import Msg from "./svelte/msg";
  /** 监听鼠标移动 */
  function on_mouse(event) {
    if (event.target instanceof HTMLElement) {
      setPath(nodePath(event.target));
      if (config.elementEdit) {
        outline(event.target);
      }
    }
  }
  /** 监测按键事件 */
  async function on_keydown(event) {
    const code = event.code;
    //有元素获得焦点，视为正在输入文本，不执行指令
    if (document.querySelectorAll(":focus").length > 0) {
      return;
    }
    /** 切换编辑模式 */
    if (code === "F2" || code === "KeyM") {
      return switchState(event);
    }
    /** 没有开启编辑功能 */
    if (config.elementEdit === false) {
      return;
    }
    if (code in KeyMap) {
      /** 执行按键绑定的函数 */
      const funName = KeyMap[code];
      fun[funName]();
    }
  }
  /** 编辑事件 */
  function on_input(event) {
    if (event.target instanceof HTMLElement) {
      const el = event.target;
      if (el.innerHTML.length > 10 * 1000)
        new Warning({
          msg: "该元素文本过大，将不会保存这里的修改，请选择更确定的文本元素。"
        }).autoHide();
      else editElement.add(el);
    }
  }
  /** 切换状态 */
  function switchState(event) {
    config.elementEdit = !config.elementEdit;
    event.preventDefault();
    event.returnValue = false;
    return false;
  }
  /** 自动加载本地暂存更改 */
  (async () => {
    const AllStoreStr = await getLocalItem(AllStoreName, undefined);
    if (AllStoreStr === undefined) return console.warn("没有可用的存储库");
    const allStore = JSON.parse(AllStoreStr);
    if (document.readyState === "complete") {
      loadChanges(allStore);
    } else {
      window.addEventListener("load", function() {
        loadChanges(allStore);
      });
    }
  })();
</script>

<style>
  .root {
    position: fixed;
    left: 2rem;
    top: 2rem;
    background: #fff;
    z-index: 60;
  }
</style>

<svelte:window
  on:keydown={on_keydown}
  on:input={on_input}
  on:mouseover={on_mouse} />
<div class="root">
  <!-- <Msg /> -->
</div>

<!-- 外发光的选中样式 -->
{@html `<style>.user_js_llej_outline{outline:2px solid red}</style>`}