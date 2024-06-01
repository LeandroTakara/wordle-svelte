<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    function openSettings() {
        dispatch('openSettings')
    }
</script>

<header>
    <nav class="navigation-container">
        <a class="wordle-link" href="/">Normal</a>
        <a class="wordle-link" href="/duet">Duet</a>
    </nav>

    <h1>
        <span class="big-title-word">Wordle</span>
        <span class="small-title-word">made with</span>
        <img src="./svelte_logo.png" alt="svelte logo" class="svelte-logo">
        <span class="big-title-word svelte">Svelte</span>
    </h1>

    <button class="btn-settings" on:click={openSettings}>
        <i class="fa-solid fa-gear"></i>
    </button>
</header>

<style>
    header {
        position: relative;
        width: 100%;
        max-width: 1000px;
        padding: 10px 20px;
        margin: 10px auto 0;
        background-color: rgb(81, 81, 81);
        color: white;
        box-shadow: 0 5px 8px 3px rgba(0, 0, 0, 0.1);
    }

    .navigation-container {
        position: absolute;
        top: 50%;
        translate: 0 -50%;
        display: flex;
        column-gap: 20px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    .wordle-link:hover {
        text-decoration: underline;
    }

    h1 {
        text-align: center;
    }

    .small-title-word {
        font-size: 1rem;
    }

    .big-title-word {
        font-size: 2rem;
    }

    .svelte-logo {
        height: 30px;
        vertical-align: middle;
    }

    .svelte {
        color: rgb(255, 91, 41);
    }
    
    .btn-settings {
        position: absolute;
        top: 50%;
        translate: 0 -50%;
        right: 20px;
        background-color: transparent;
        font-size: 1.2rem;
        color: white;
    }
</style>
