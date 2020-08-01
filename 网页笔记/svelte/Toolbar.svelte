<script>
  export let highlighted = () => {
    console.warn("没有传入高亮处理函数");
  };
  let color = "#ffff80";
  let backgroundColor = "#ffff80";
</script>

<style>
  .llej-toolbar {
    z-index: 1000;
    background: #fff;
    height: 32px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0px 6px;
    user-select: none;
  }
  .llej-toolbar-btn {
    transition: 0.3s all;
    padding: 2px 5px;
    margin: 2px 5px;
    border: 1px solid rgb(163, 163, 163);
    display: flex;
    align-items: center;
  }
  .llej-toolbar-btn:hover {
    background: rgb(231, 231, 231);
  }
</style>

<div class="llej-toolbar">
  <label class="llej-toolbar-btn">
    文字颜色
    <input
      type="color"
      bind:value={color}
      on:change={() => highlighted({ style: `
      color:${color};
    ` })} />
  </label>
  <div class="llej-toolbar-btn">
    背景颜色
    <input
      type="color"
      bind:value={backgroundColor}
      on:change={() => highlighted({ style: `
      background-color:${backgroundColor};
    ` })} />

  </div>
  <div
    class="llej-toolbar-btn"
    on:click={() => highlighted({ style: `
      text-decoration: underline;
    ` })}>
    下划线
  </div>
</div>
