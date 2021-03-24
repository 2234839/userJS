<script lang="ts">
  export let 重新执行回调: () => {};
  export let showConfigView = false;

  import { user_config } from "./config";

  GM.registerMenuCommand("打开配置面板", () => (showConfigView = true), "k");

  let config = user_config;
  $: showConfig = config.filter((el) =>
    new RegExp(el.生效范围正则).test(location.href),
  );

  function 重新执行() {
    Object.assign(user_config, config);
    重新执行回调();
  }
  (async () => {
    const s = await GM.getValue("user_config", JSON.stringify(user_config));
    config = JSON.parse(s);
    重新执行();
    console.log("[user_config]", user_config);
  })();

  async function saveAndReload() {
    await GM.setValue("user_config", JSON.stringify(config));
    重新执行();
  }
  async function 重置() {
    await GM.deleteValue("user_config");
    location.reload();
  }
</script>

<div
  class="app {showConfigView ? '' : '-hide'}"
  on:click|self={() => (showConfigView = !showConfigView)}
>
  <div class="main">
    <button
      on:click={() => (showConfigView = false)}
      class="des"
      title="点击外部阴影亦可"
    >🖱️点击这关闭配置面板
    </button>
    <button on:click={saveAndReload} class="des"> 🖱️点击这保存 </button>
    <button on:click={重置} class="des">🖱️ 点击这恢复默认配置并刷新页面
    </button>
    {#each showConfig as 配置项}
      <div>{配置项.标签文本}</div>
      <div class="border">
        <div class="des">{配置项.数据需求描述}</div>
        <button
          on:click={() => {
            配置项.数据.push('');
            config = config;
          }}
          class="des"
        >🖱️ 点击这新增一项
        </button>
        <div style="display:flex;flex-direction: column">
          {#each 配置项.数据 as data_str, data_str_i}
            <div>
              <input type="text" style="width:90%" bind:value={data_str} />
              <button
                on:click={() => {
                  配置项.数据.splice(data_str_i, 1);
                  config = config;
                }}
                title="单击删除项目「{data_str}」"
              >
                ❌</button>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .des {
    font-size: small;
    background-color: rgb(219, 219, 219);
  }
  .border {
    border: 1px solid #333;
  }
  .main {
    background: white;
    padding: 10px 15px;
    max-width: 80vw;
  }
  .app {
    z-index: 999;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.534);
  }
  .-hide {
    display: none;
  }
</style>
