<script lang="ts">
import { onMount } from "svelte";
  let ipc;


  onMount(() => {
    const { ipcRenderer } = window.require('electron');
    ipc = ipcRenderer;
    console.log(ipcRenderer)
  })
	async function ipcInvoke() {
		const ss = await ipc.invoke('msg', 'test--msg');
    console.log(ss)
	}
</script>

<h1>
	<button on:click={ipcInvoke}>IPC Get</button>
</h1>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
