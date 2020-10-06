<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let 选中 = false;
  export let text = "button";

  function onSelect() {
    dispatch("select");
  }
</script>

<style>
  .c {
    border: 1px solid black;
    background-color: rgb(228, 228, 228);
    border-radius: 4px;
    display: flex;
    padding: 4px 3px;
  }
  .c-indicator {
    background-color: rgb(202, 202, 202);
    transition: all 0.4s;
    padding: 4px 9px;
    border-radius: 4px;
  }
  .c.-select .c-indicator {
    background-color: rgb(172, 255, 151);
  }
  .c-interval {
    transition: all 0.4s;
    flex: 0;
  }
  .c.-select .c-interval {
    flex: 1;
  }
</style>

<div class="c {选中 ? '-select' : ''}" on:click={() => onSelect()}>
  <div class="c-interval" />
  <div class="c-indicator">{text}</div>
</div>
