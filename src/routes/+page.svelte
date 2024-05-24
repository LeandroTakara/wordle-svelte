<script>
    import '../global.css'
    import { onMount } from 'svelte'
    import { fly, fade } from 'svelte/transition'
    // components
    import Header from './Header.svelte'
    import Wordle from './Wordle.svelte'
    import Keyboard from './Keyboard.svelte'
    import WordleResult from './WordleResult.svelte'
    import Settings from './Settings.svelte'
    // stores
    import { wordleGame, wordleGameAnimator } from '$lib/wordleStore.js'

    import JSConfetti from 'js-confetti'
    
    import { CHANGE_SCREEN_TIME, CHANGE_SCREEN_DELAY_TIME, LETTERS } from '$lib/constants.js'

    onMount(() => {
        jsConfetti = new JSConfetti()
    })

    let jsConfetti

    let seeSettings = false

    $: isPlaying = $wordleGame.isPlaying

    $: if ($wordleGame.hasWon()) {
        jsConfetti.addConfetti({ confettiNumber: 100, confettiRadius: 5 })
    } else if ($wordleGame.hasLost()) {
        jsConfetti.addConfetti({ confettiNumber: 100, emojis: ['😓', '😔', '😭'], emojiSize: 40 })
    }

    function handleKeyAction(key) {
        wordleGame.sendKey(key)
    }

    function handleKeyDown(event) {
        const key = event.key.toLowerCase()

        if (document.activeElement === document.body) {
            handleKeyAction(key)
        } else {
            const KEYS = [...LETTERS, 'arrowleft', 'arrowright', ' ', 'backspace']

            if (KEYS.includes(key)) {
                document.activeElement.blur()
                handleKeyAction(key)
            }
        }
    }
</script>

{#if seeSettings}
    <Settings on:closeSettings={() => seeSettings = false}/>
{/if}

<div class="wrapper">
    <Header on:openSettings={() => seeSettings = true}/>

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

<svelte:window on:keydown={handleKeyDown} />

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        overflow: hidden;
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
