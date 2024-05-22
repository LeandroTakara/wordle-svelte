<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    function openSettings() {
        dispatch('openSettings')
    }
</script>

<header>
    <div class="header-wrapper">
        <h1>
            <span class="big-title-word">Wordle</span>
            <span class="small-title-word">made with</span>
            <img src="./svelte_logo.png" alt="svelte logo" class="svelte-logo">
            <span class="big-title-word svelte">Svelte</span>
        </h1>

        <button on:click={openSettings}>
            <i class="fa-solid fa-gear gear-icon"></i>
        </button>
    </div>
</header>

<style>
    header {
        padding: 10px 20px;
        background-color: rgb(81, 81, 81);
        box-shadow: 0 5px 8px 3px rgba(0, 0, 0, 0.1);
        color: white;
    }

    .header-wrapper {
        position: relative;
        margin: 0 auto;
        width: 500px;
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
    
    button {
        position: absolute;
        top: 50%;
        translate: 0 -50%;
        right: 0;
        background-color: transparent;
    }
    .gear-icon {
        color: white;
    }
</style>
