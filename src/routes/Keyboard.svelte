<script>
    import { createEventDispatcher } from 'svelte'
    // stores
    import { keysMatches } from '$lib/wordleStore.js'
    // wordle
    import { LETTERS_STATES } from '$lib/wordleGame.js'

    // maps a letter state to a CSS class
    const KEYS_STATES = {
        [LETTERS_STATES.CORRECT]: 'correct',
        [LETTERS_STATES.WRONG]: 'wrong',
        [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
        [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
    }

    const dispatch = createEventDispatcher()

    function chooseKey(key) {
        dispatch('chooseKey', { key })
    }
</script>

<div class="keyboard">
    {#each $keysMatches as { key, state }}
        <button
            type="button"
            class="key {KEYS_STATES[state]}"
            on:click={() => chooseKey(key) }
        >
            <span>{key}</span>
        </button>
    {/each}

    <button
        type="button"
        class="key backspace-key"
        on:click={() => chooseKey('backspace')}
    >
    </button>

    <button
        type="button"
        class="key enter-key"
        on:click={() => chooseKey('enter')}
    >
        enter
    </button>
</div>

<style>
    .keyboard {
        display: grid;
        grid-template-columns: repeat(10, 50px);
        grid-template-rows: repeat(3, 50px);
        gap: 5px;
    }

    .key {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-transform: uppercase;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        background-color: rgb(80, 80, 80);
        transition: background-color 0.3s;

        &.correct {
            background-color: var(--correct-color);
        }

        &.wrong-position {
            background-color: var(--wrong-position-color);
        }
        
        &:hover {
            filter: brightness(1.3);
        }

        &.wrong {
            opacity: 0.3;
        }
    }

    .key.enter-key {
        grid-row-start: 3;
        grid-column: 9 / span 2;
    }

    .key.backspace-key {
        position: relative;
        grid-row-start: 3;
        grid-column: 1 / span 2;

        &::before {
            content: '';
            position: absolute;
            left: 35%;
            border-right: solid white 15px;
            border-top: solid transparent 11px;
            border-bottom: solid transparent 11px;
        }

        &:after {
            content: '';
            position: absolute;
            left: 45%;
            background-color: white;
            width: 30px;
            height: 7px;
        }
    }
</style>
