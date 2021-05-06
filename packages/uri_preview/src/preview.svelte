<script lang="ts">
  import PreviewItem from "./component/preview_item.svelte";
  import { uriPreview } from "./uri_preview";

  let target = null as HTMLAnchorElement | null;
  let 预览结果: Promise<uriPreview.预览返回值>[] = [];

  function onGlobalMouseMove(e: MouseEvent) {
    const newTarget = findA(e.target as HTMLElement);
    if (target === newTarget) {
      // 同一个 a 标签就不更新了
    } else {
      target = newTarget;
      setTimeout(
        async (el: HTMLAnchorElement | null) => {
          if (el === null) {
            预览结果 = [];
          } else {
            预览结果 = uriPreview.预览(el);
          }
        },
        300,
        target,
      );
    }
    /** 寻找当前元素所在路径离当前元素最近的 a 元素 */
    function findA(el: Element): HTMLAnchorElement | null {
      if (el instanceof HTMLAnchorElement) {
        return el;
      } else if (!el.parentElement) {
        return null;
      } else {
        return findA(el.parentElement);
      }
    }
  }
</script>

<svelte:body on:mousemove={onGlobalMouseMove} />
{#if 预览结果.length}
  <div class="c">
    {#each 预览结果 as p}
      <div class="c-item">
        {#await p}
          <div>请求中</div>
        {:then [res, error]}
          {#if res}
            <div>
              {@html res.html}
              <PreviewItem />
            </div>
          {:else if error}
            <div>
              {@html error.html}
              <PreviewItem />
            </div>
          {/if}
        {/await}
      </div>
    {/each}
  </div>
{/if}

<style>
  .c {
    position: absolute;
    z-index: 100;
    left: 30vw;
    top: 40vh;
    background-color: antiquewhite;
    padding: 4px 8px;
    border-radius: 5px;
  }
  .c-item {
    border: 1px solid black;
  }
</style>
