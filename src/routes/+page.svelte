<script>
    import '../global.css'
    import { onMount } from 'svelte'
    import { fly, fade } from 'svelte/transition'
    // components
    import Wordle from './Wordle.svelte'
    import Keyboard from './Keyboard.svelte'
    import WordleResult from './WordleResult.svelte'
    // stores
    import { wordleGame, wordleGameAnimator } from '$lib/wordleStore.js'

    import JSConfetti from 'js-confetti'
    
    import { CHANGE_SCREEN_TIME, CHANGE_SCREEN_DELAY_TIME } from '$lib/constants.js'

    let jsConfetti

    onMount(() => {
        jsConfetti = new JSConfetti()
    })

    $: isPlaying = $wordleGame.isPlaying

    $: if ($wordleGame.hasWon()) {
        jsConfetti.addConfetti({ confettiNumber: 100, confettiRadius: 5 })
    } else if ($wordleGame.hasLost()) {
        jsConfetti.addConfetti({ confettiNumber: 100, emojis: ['😓', '😔', '😭'], emojiSize: 40 })
    }

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
                in:fly={{ y: 200, delay: CHANGE_SCREEN_DELAY_TIME, duration: CHANGE_SCREEN_TIME }}
                out:fly={{ y: 200, delay: CHANGE_SCREEN_DELAY_TIME, duration: CHANGE_SCREEN_TIME }}
            >
                <div class="wordle">
                    <Wordle />
                </div>

                {#if $wordleGameAnimator === 'invalid-word'}
                    <div class="invalid-word" out:fade={{ delay: 1000, duration: 0 }}>
                        <span>Invalid word</span>
                    </div>    
                {/if}

                <Keyboard on:chooseKey={event => handleKeyAction(event.detail.key)} />
            </div>
        {:else}
            <div
                class="results-container"
                in:fly={{ y: 200, delay: 2 * CHANGE_SCREEN_DELAY_TIME, duration: CHANGE_SCREEN_TIME }}
                out:fly={{ y: 200, duration: CHANGE_SCREEN_TIME }}
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
        position: relative;
        flex-grow: 1;
        margin: 20px 0;
    }

    .wordle-container {
        position: absolute;
        left: 50%;
        translate: -50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .wordle {
        display: flex;
        justify-content: center;
    }

    .invalid-word {
        padding: 4px 10px;
        border-radius: 10px;
        background-color: red;
        color: white;
    }

    .results-container {
        position: absolute;
        left: 50%;
        translate: -50%;
    }
</style>
