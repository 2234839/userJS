<script lang="ts">
  import { uriPreview } from "./uri_preview.namespace";
  let target = null as HTMLAnchorElement | null;
  let html = null as string | null;
  $: setTimeout(
    async (el: HTMLAnchorElement | null) => {
      if (target === el && el !== null) {
        /** 视为在这个元素上停留了一段时间 */
        html = await uriPreview.start(el);
      }
    },
    300,
    target,
  );
  /** 监听全局的鼠标移动 */
  function onMouseMove(e: MouseEvent) {
    const newTarget = findA(e.target as HTMLElement);
    if (target === newTarget) {
      // 同一个 a 标签就不更新了
    } else {
      target = newTarget;
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

<style>
  .c {
    position: fixed;
    z-index: 100;
    left: 30vw;
    top: 40vh;
    background-color: antiquewhite;
    padding: 4px 8px;
    border-radius: 5px;
  }
</style>

<svelte:body on:mousemove={onMouseMove} />
<div class="c">
  {@html html}
</div>
