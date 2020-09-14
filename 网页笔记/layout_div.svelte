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
  import { msg,note_list_store } from "./state/store";
  import Msg from "./svelte/msg";
  import Note from "./svelte/Note";
  import Toolbar from "./svelte/Toolbar";
  import { on_mouse, on_keydown, on_input } from "./fun/fun";
  import { SelectionEvent } from "./util"
  import { elementEdit } from "./config";
  import { styleText } from "./state/highlighted_style";
  let note_list=[]
  note_list_store.subscribe(list=>{
    note_list=list
  })
  let html=""
  function paste(e) {
    html=e.clipboardData.getData('text/html')
  }

  const { isRange , anchorRect } = SelectionEvent;
</script>

<style>
  .root {
    z-index: 60;
    position: absolute;
    top:3rem;
  }
</style>

<!-- windows 组件用于在窗口上绑定事件 -->
<svelte:window
  on:keydown={on_keydown}
  on:input={on_input}
  on:mouseover={on_mouse} />

<div class="root">
  {@html html}
  {@html $styleText}
  <Msg />
</div>

{#if $isRange && $elementEdit}
  <div style="position:fixed;top:{$anchorRect.top}px;left:{$anchorRect.left}px;transform:translateY(-100%);user-select: none;">
    <Toolbar bind:highlighted={SelectionEvent.高亮}/>
  </div>
{/if}

{#each note_list as note}
    <Note bind:note={note} ></Note>
{/each}
<!-- 外发光的选中样式 -->
{@html "<style>.user_js_llej_outline{outline:2px solid red}</style>"}
