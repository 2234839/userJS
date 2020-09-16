<script lang="ts">
  import SwitchButton from "../component/switch/button.svelte";
  const state = {
    is登录: true,
    is注册: false,
    is找回密码: false,
  };
  type stateKey = keyof typeof state;
  let keys: stateKey[];
  $: keys = Object.keys(state) as stateKey[];

  /** 当前选中选项的文本 */
  let curText: string;
  $: curText = keys.find((k) => state[k]).slice(2);

  function onSelect(key: string) {
    keys.forEach((k) => (state[k as stateKey] = false));
    state[key as stateKey] = true;
  }
</script>

<style>
  .c-row {
    display: flex;
  }
  .c {
    max-width: 300px;
  }
</style>

<div class="c">
  {curText}
  <div class="c-row">
    <div>邮箱</div>
    <input type="text" />
  </div>
  <div class="c-row">
    <div>密码</div>
    <input type="text" />
  </div>
  {#each keys as key, index (index)}
    <SwitchButton bind:选中={state[key]} on:select={() => onSelect(key)} text={key.slice(2)} />
  {/each}
</div>
