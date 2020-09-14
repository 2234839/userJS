<script>
  import { createEventDispatcher } from "svelte/internal/index.mjs";
  const dispatch = createEventDispatcher();
  export let defaultColor = "#EB5757";
  export let defaultColorList = [
    "#EB5757",
    "#F2C94C",
    "#9B51E0",
    "#E0E0E0",
    "#2F80ED",
    "#2F80ED",
    "#828282",
    "#27AE60",
    "#27AE60",
    "#EB5757",
    "#56CCF2",
    "#F2994A",
    "#4F4F4F",
    "#219653",
    "#BB6BD9",
    "#F2F2F2",
    "#2D9CDB",
    "#2D9CDB",
    "#BDBDBD",
    "#6FCF97",
    "#6FCF97",
  ];

  function changeColor(c) {
    defaultColor = c;
    dispatch("change", c);
  }
</script>

<style>
  .c {
    position: relative;
  }
  .c-color_block {
    width: 22px;
    height: 22px;
    /* Red */
    background: var(--color);
    border-radius: 6px;
  }
  /** 色板在获取hover后才能展示 */
  .c:hover .c-swatches {
    display: flex;
  }
  .c .c-swatches {
    display: none;
  }

  .c-swatches {
    position: absolute;
    background: #f8f8f8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    width: 218px;

    display: flex;
    flex-wrap: wrap;
  }
  .c-swatches-item {
    margin: 4px;
  }
</style>

<div class="c">
  <label class="c-color_block" style="--color:{defaultColor};display:flex" title="点击此处选择自定义颜色">
    <input type="color" bind:value={defaultColor} on:change={() => changeColor(defaultColor)} style="display:none" />
  </label>
  <div class="c-swatches">
    {#each defaultColorList as c, i (i)}
      <div on:click={() => changeColor(c)} class="c-swatches-item c-color_block" style="--color:{c}" />
    {/each}
  </div>
</div>
