<script lang="ts">
  import { elementEdit } from "./config";
  import { on_input, on_keydown, on_mouse } from "./fun/fun";
  import { styleText } from "./state/highlighted_style";
  import { note_list_store } from "./state/store";
  import GlobalStyle from "./svelte/global_style.svelte";
  import Msg from "./svelte/msg.svelte";
  import Note from "./svelte/Note.svelte";
  import Toolbar from "./svelte/Toolbar.svelte";
  import { SelectionEvent } from "./util";

  let note_list = [] as any[];
  note_list_store.subscribe((list) => {
    note_list = list;
  });
  $: console.log($elementEdit);
  setTimeout(() => {
    elementEdit.set(false);
  }, 5000);
  const { isRange, anchorRect } = SelectionEvent;
</script>

<style>
  .root {
    z-index: 60;
    position: absolute;
    top: 3rem;
  }
</style>

<!-- windows 组件用于在窗口上绑定事件 -->
<svelte:window on:keydown={on_keydown} on:input={on_input} on:mouseover={on_mouse} />

<div class="root">
  {@html $styleText}
  <Msg />
</div>

<!-- <CenterLayer>
  <LoginFramet />
</CenterLayer> -->

{#if $isRange}
  <div
    style="position:fixed;top:{$anchorRect.top}px;left:{$anchorRect.left}px;transform:translateY(-100%);user-select: none;z-index:900">
    <Toolbar bind:highlighted={SelectionEvent.高亮} />
  </div>
{/if}

{#each note_list as note}
  <Note bind:note />
{/each}
<!-- 外发光的选中样式 -->
<GlobalStyle />
