<script>
    export let column
    export let letter
    export let state
    export let highlight

    import { fade } from 'svelte/transition'
    // stores
    import { wordleGame, REVEAL_TIME, REVEAL_DELAY_TIME } from '$lib/wordleStore.js'
    // wordle
    import { LETTERS_STATES } from '$lib/wordleGame.js'

    // maps a letter state to a CSS class
    const CSSClasses = {
        [LETTERS_STATES.CORRECT]: 'correct',
        [LETTERS_STATES.WRONG]: 'wrong',
        [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
        [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
        [LETTERS_STATES.GUESSING]: 'guessing',
    }

    let bgCSSClass = null

    // sets the value of the 'bgCSSClass' variable, it is done like this, because of the reveal animation
    $: if (state === LETTERS_STATES.GUESSING || state === LETTERS_STATES.NOT_GUESSED) {
        bgCSSClass = CSSClasses[state]
    } else {
        // waits for some time to make a wave effect together with the components in the same row
        setTimeout(() => {
            bgCSSClass = CSSClasses[state]
        }, $REVEAL_DELAY_TIME * column)
    }
</script>

<div
    class="letter {bgCSSClass}"
    class:highlight
    style:animation-duration='{$REVEAL_TIME}ms'
>
    {#key letter}
        <span in:fade={{ duration: 300 }}>{letter}</span>
    {/key}

    {#if state === LETTERS_STATES.GUESSING}
        <input class="letter-button" type="button" on:click={() => wordleGame.setColumn(column)}>
    {/if}
</div>

<style>
    .letter {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: solid black 3px;
        /* border-radius: 5px; */
        text-transform: uppercase;
        color: white;
        background-color: var(--bg-color);
        font-size: 1.2rem;
        font-weight: 700;

        &.guessing {
            --bg-color: transparent;
            border-color: white;
            cursor: pointer;
        }
        
        &.highlight::before {
            content: '';
            position: absolute;
            bottom: 0;
            background-color: white;
            width: 100%;
            height: 4px;
            cursor: pointer;
        }

        &.not-guessed {
            --bg-color: transparent;
            border: solid rgba(0, 0, 0, 0.5) 3px;
        }

        &.correct {
            --bg-color: var(--correct-color);
            border: none;
            cursor: default;
            user-select: none;
            animation: reveal;
        }

        &.wrong {
            --bg-color: var(--wrong-color);
            border: none;
            cursor: default;
            user-select: none;
            animation: reveal;
        }
        
        &.wrong-position {
            --bg-color: var(--wrong-position-color);
            border: none;
            cursor: default;
            user-select: none;
            animation: reveal;
        }
    }

    .letter-button {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        cursor: inherit;
    }

    @keyframes -global-reveal {
        0% {
            background-color: transparent;
            transform: perspective(200px) rotateY(0deg);
            border: solid white 3px;
        }
        49% {
            background-color: transparent;
            transform: perspective(200px) rotateY(90deg);
            border: solid white 3px;
        }
        50% {
            background-color: var(--bg-color);
            transform: perspective(200px) rotateY(-90deg);
            border: none;
        }
        51% {
            transform: perspective(200px) rotateY(-90deg);
        }
        100% {
            transform: perspective(200px) rotateY(0deg);
        }
    }
</style>
