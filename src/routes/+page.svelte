<script>
    import '../global.css'
    import { fly } from 'svelte/transition'
    // components
    import Wordle from './Wordle.svelte'
    import Keyboard from './Keyboard.svelte'
    import WordleResult from './WordleResult.svelte'
    // stores
    import { wordleGame } from '$lib/wordleStore.js'

    $: isPlaying = $wordleGame.isPlaying

    function handleKeyAction(key) {
        wordleGame.sendKey(key)
    }
</script>

<div class="wrapper">
    <header>
        <h1>
            <span class="big-title-word">Wordle</span>
            <span class="small-title-word">made with</span>
            <img src="./svelte_logo.png" alt="svelte logo" class="svelte-logo">
            <span class="big-title-word svelte">Svelte</span>
        </h1>
    </header>

    <main>
        {#if isPlaying}
            <div
                class="wordle-container"
                in:fly={{ y: 200, delay: 1000, duration: 1000 }}
                out:fly={{ y: 200, delay: 1000, duration: 1000 }}
            >
                <div class="wordle">
                    <Wordle />
                </div>

                <Keyboard on:chooseKey={event => handleKeyAction(event.detail.key)} />
            </div>
        {:else}
            <div
                class="results-container"
                in:fly={{ y: 200, delay: 2000, duration: 1000 }}
                out:fly={{ y: 200, duration: 1000 }}
            >
                <WordleResult />
            </div>
        {/if}
    </main>
</div>

<svelte:window on:keydown={event => handleKeyAction(event.key.toLowerCase())} />

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        overflow: hidden;
    }

    header {
        position: relative;
        padding: 10px 20px;
        background-color: rgb(81, 81, 81);
        box-shadow: 0 5px 8px 3px rgba(0, 0, 0, 0.1);
        color: white;
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

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        margin: 20px 0;
    }

    .wordle-container {
        display: flex;
        flex-direction: column;
        row-gap: 50px;
        height: 100%;
    }

    .wordle {
        display: flex;
        justify-content: center;
    }

    .results-container {
        align-items: center;
    }
</style>
