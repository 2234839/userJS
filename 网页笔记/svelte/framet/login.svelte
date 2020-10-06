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
  let i = 0;
</script>

<style>
  .c {
    background: #fff;
    padding: 0.7em 0.6em;
    border-radius: 0.5em;
    position: relative;
  }
  .c-row {
    display: flex;
  }
</style>

<div class="c">
  {curText}
  <wired-tabs selected="登录">
    <wired-tab name="登录">
      <div class="c-row">
        <div>邮箱</div>
        <wired-input placeholder="邮箱" />
      </div>
      <div class="c-row">
        <div>密码</div>
        <wired-input placeholder="密码" />
      </div>
    </wired-tab>
    <wired-tab name="注册">
      <h4>Card 2</h4>
    </wired-tab>
    <wired-tab name="忘记密码">
      <h4>Card 3</h4>
    </wired-tab>
  </wired-tabs>
  <wired-progress value={i} />
  <wired-input placeholder="Enter name" on:input={(e) => console.log(e.target.value)} />
  <wired-slider knobradius="15" value={i} min="0" max="100" on:change={(e) => (i = e.detail.value)} />
</div>
