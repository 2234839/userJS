<script>
  import ColorBlock from "./component/ColorBlock.svelte";
  import { settingStore } from "../state/store.ts";

  export let highlighted = () => {
    console.warn("没有传入高亮处理函数");
  };
  const s = settingStore.getWritable();

  function textHighlight(c) {
    if (c) {
      s.update((r) => {
        r.swatches.textColor.default = c;
        return r;
      });
    }
    highlighted({ style: `color:${$s.swatches.textColor.default};` });
  }
  function bgHighlight(c) {
    if (c) {
      s.update((r) => {
        r.swatches.bgColor.default = c;
        return r;
      });
    }
    highlighted({ style: `background-color:${$s.swatches.bgColor.default};` });
  }
  function underlineHighlight(c) {
    if (c) {
      s.update((r) => {
        r.swatches.underlineColor.default = c;
        return r;
      });
    }
    highlighted({ style: `text-decoration: underline;text-decoration-color:${$s.swatches.underlineColor.default};` });
  }
</script>

<style>
  .llej-toolbar {
    z-index: 1000;
    height: 36px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0px 6px;
    user-select: none;
    font-size: 18px;
    /* 底色 */
    background: #f8f8f8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }
  .llej-toolbar-btn {
    transition: 0.3s all;
    padding: 2px 5px;
    display: flex;
    align-items: center;
  }
  .llej-toolbar-btn:hover {
    background: rgb(231, 231, 231);
  }
</style>

<div class="llej-toolbar">
  <div class="llej-toolbar-btn" on:click={() => textHighlight()}>
    <div>文字颜色</div>
    <div style="margin:0 8px;">
      <ColorBlock defaultColor={$s.swatches.textColor.default} on:change={(e) => textHighlight(e.detail)} />
    </div>
  </div>
  <div class="llej-toolbar-btn" on:click={() => bgHighlight()}>
    <div>背景颜色</div>
    <div style="margin:0 8px;">
      <ColorBlock defaultColor={$s.swatches.bgColor.default} on:change={(e) => bgHighlight(e.detail)} />
    </div>
  </div>
  <div class="llej-toolbar-btn" on:click={() => underlineHighlight()}>
    <div>下划线</div>
    <div style="margin:0 8px;">
      <ColorBlock defaultColor={$s.swatches.underlineColor.default} on:change={(e) => underlineHighlight(e.detail)} />
    </div>
  </div>
</div>
