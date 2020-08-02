<script>
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { messageList } from "../ui/message";
</script>

<style>
  .llej-msg_list {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 9998;
  }
  .llej-msg_list-item {
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    margin: 6px 12px;
    padding: 3px 7px;
    display: flex;
    align-items: center;
  }
  .llej-msg_list-item-point {
    --s: 4px;
    width: var(--s);
    height: var(--s);
    background-color: #367dd9;
    margin: var(--s);
    border-radius: 999px;
  }
</style>

<div class="llej-msg_list">
  {#each $messageList as item, index (item)}
    <div animate:flip transition:fly={{ x: -200, duration: 1000 }} class="llej-msg_list-item" style={item.par.style}>
      <div class="llej-msg_list-item-point" />
      {item.par.msg}
    </div>
  {/each}
</div>
