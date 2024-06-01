<script>
    import '../global.css'
    // components
    import Header from '$lib/components/Header.svelte'
    import Settings from '$lib/components/Settings.svelte'

    let seeSettings = false
</script>

{#if seeSettings}
    <Settings on:closeSettings={() => seeSettings = false}/>
{/if}

<div class="wrapper">
    <Header on:openSettings={() => seeSettings = true}/>

    <slot />
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        overflow: hidden;
    }
</style>
