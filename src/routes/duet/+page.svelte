<script>
    import { onMount } from 'svelte'
    // transition functions
    import { fly, fade } from 'svelte/transition'
    // constants
    import { CHANGE_SCREEN_TIME, CHANGE_SCREEN_DELAY_TIME, LETTERS } from '$lib/constants.js'
    // components
    import Keyboard from '$lib/components/keyboard/Keyboard.svelte'
    import WordleResult from '$lib/components/WordleResult.svelte'
    import Wordle from '$lib/components/wordle/Wordle.svelte'
    import DuetKeyboardKey from '$lib/components/keyboard/DuetKeyboardKey.svelte'
    // stores
    import { ANIMATIONS, wordleAnimator } from '$lib/stores/wordleAnimator.js'
    // function to create a wordle game
    import { createWordleGame } from '$lib/wordle/wordleCreator.js'
    // confetti
    import JSConfetti from 'js-confetti'

    onMount(() => {
        jsConfetti = new JSConfetti()
    })

    const wordleObj1 = createWordleGame()
    const wordleObj2 = createWordleGame()
    $: keysMatching = [wordleObj1.getMatches(), wordleObj2.getMatches()]

    $: isPlaying = wordleObj1.wordle.isPlaying || wordleObj2.wordle.isPlaying
    $: canChangeScreen = !isPlaying && $wordleAnimator === ANIMATIONS.NONE

    let jsConfetti = null

    // checks when to play the confetti animation
    $: canPlayWinningConfetti = wordleObj1.wordle.hasWon() && wordleObj2.wordle.hasWon() && $wordleAnimator === ANIMATIONS.NONE
    $: canPlayLosingConfetti = wordleObj1.wordle.hasLost() && wordleObj2.wordle.hasLost() && $wordleAnimator === ANIMATIONS.NONE

    // plays the confetti animation
    $: if (canPlayWinningConfetti) jsConfetti.addConfetti({ confettiNumber: 100, confettiRadius: 5 })
    $: if (canPlayLosingConfetti) jsConfetti.addConfetti({ confettiNumber: 100, emojis: ['😓', '😔', '😭'], emojiSize: 40 })

    function handleKeyDown(event) {
        if ($wordleAnimator !== ANIMATIONS.NONE) return

        const key = event.key.toLowerCase()

        // the user is typing
        if (document.activeElement === document.body) {
            wordleObj1.sendKey(key)
            wordleObj1.wordle = wordleObj1.wordle

            wordleObj2.sendKey(key)
            wordleObj2.wordle = wordleObj2.wordle
        } else { // the user has selected other elements such as buttons or inputs via tab
            if (key === ' ') {
                document.activeElement.blur()
                wordleObj1.sendKey(' ')
                wordleObj1.wordle = wordleObj1.wordle

                wordleObj2.sendKey(' ')
                wordleObj2.wordle = wordleObj2.wordle

                return
            }

            const KEYS = [...LETTERS, 'arrowleft', 'arrowright', 'backspace']

            if (KEYS.includes(key)) {
                wordleObj1.sendKey(key)
                wordleObj1.wordle = wordleObj1.wordle

                wordleObj2.sendKey(key)
                wordleObj2.wordle = wordleObj2.wordle
            }
        }
    }

    function handleChooseKey(event) {
        if ($wordleAnimator !== ANIMATIONS.NONE) return

        const key = event.detail.key

        document.activeElement.blur()

        wordleObj1.sendKey(key)
        wordleObj1.wordle = wordleObj1.wordle

        wordleObj2.sendKey(key)
        wordleObj2.wordle = wordleObj2.wordle
    }

    function changeColumn(event) {
        const column = event.detail.column

        wordleObj1.wordle.changeColumn(column)
        wordleObj1.wordle = wordleObj1.wordle

        wordleObj2.wordle.changeColumn(column)
        wordleObj2.wordle = wordleObj2.wordle
    }

    function newGame() {
        wordleObj1.wordle.newGame()
        wordleObj1.wordle = wordleObj1.wordle

        wordleObj2.wordle.newGame()
        wordleObj2.wordle = wordleObj2.wordle
    }
</script>

<main>
    {#if !canChangeScreen}
        <div
            class="wordle-container"
            in:fly={{ y: 200, delay: CHANGE_SCREEN_DELAY_TIME, duration: CHANGE_SCREEN_TIME }}
            out:fly={{ y: 200, delay: CHANGE_SCREEN_DELAY_TIME, duration: CHANGE_SCREEN_TIME }}
        >
            <div class="wordle">
                <Wordle wordle={wordleObj1.wordle} on:chooseColumn={changeColumn} />
                <Wordle wordle={wordleObj2.wordle} on:chooseColumn={changeColumn} />
            </div>

            {#if $wordleAnimator === ANIMATIONS.INVALID_GUESS}
                <div class="invalid-word" out:fade={{ delay: 1000, duration: 0 }}>
                    <span>Invalid word</span>
                </div>    
            {/if}

            <Keyboard
                keysMatches={keysMatching}
                component={DuetKeyboardKey}
                on:chooseKey={handleChooseKey}
            />
        </div>
    {:else}
        <div
            class="results-container"
            in:fly={{ y: 200, delay: 2 * CHANGE_SCREEN_DELAY_TIME, duration: CHANGE_SCREEN_TIME }}
            out:fly={{ y: 200, duration: CHANGE_SCREEN_TIME }}
        >
            <WordleResult wordles={[wordleObj1.wordle, wordleObj2.wordle]} on:newGame={newGame} />
        </div>
    {/if}
</main>

<svelte:window on:keydown={handleKeyDown} />

<style>
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
        column-gap: 50px;
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
