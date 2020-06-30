<script>
  import { onMount } from "svelte";
  export let setProcessingMethod;
  export let defaultCode;
  let code = defaultCode;

  let launchedIn = false;
</script>

<style>
  .llej-request_agent_interface {
    position: fixed;
    top: 20px;
    right: 40px;
    background: rgb(236, 236, 236);
    overflow: hidden;
    z-index: 9999;
  }
</style>

<div class="llej-request_agent_interface" style={launchedIn ? '' : 'height:25px;width:50px'}>
  <button
    on:click={() => {
      launchedIn = !launchedIn;
    }}>
    {launchedIn ? '收起' : '展开'}
  </button>
  <textarea bind:value={code} name="" id="" cols="30" rows="10" />
  <button
    on:click={() => {
      setProcessingMethod(eval(code), code);
    }}>
    替换url处理函数
  </button>
</div>
