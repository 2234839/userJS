<script>
  import ColorBlock from "./component/ColorBlock.svelte";
  export let highlighted = () => {
    console.warn("没有传入高亮处理函数");
  };
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
  <div class="llej-toolbar-btn">
    <div>文字颜色</div>
    <div style="margin:0 8px;">
      <ColorBlock on:change={(e) => highlighted({ style: `color:${e.detail};` })} />
    </div>
  </div>
  <div class="llej-toolbar-btn">
    <div>背景颜色</div>
    <div style="margin:0 8px;">
      <ColorBlock on:change={(e) => highlighted({ style: `background-color:${e.detail};` })} />
    </div>
  </div>
  <div class="llej-toolbar-btn">
    <div>下划线</div>
    <div style="margin:0 8px;">
      <ColorBlock
        on:change={(e) => highlighted({ style: `text-decoration: underline;text-decoration-color: ${e.detail};` })} />
    </div>
  </div>
</div>
