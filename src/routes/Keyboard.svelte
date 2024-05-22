<script>
    import { createEventDispatcher } from 'svelte'

    import { KEYBOARD_ALPHABETICALLY } from '$lib/constants.js'
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

    function getCSSClass(key) {
        if (key === 'backspace') return 'backspace-key'
        if (key === 'enter') return 'enter-key'
        return KEYS_STATES[$keysMatches[key]]
    }

    function getKey(key) {
        if (key === 'backspace') return ''
        return key
    }
</script>

<div class="keyboard">
    {#each KEYBOARD_ALPHABETICALLY as keyboardRow}
        <div class="keyboard-row">
            {#each keyboardRow as keyboardKey}
                {#key $keysMatches[keyboardKey]}
                    <button
                        type="button"
                        class="key {getCSSClass(keyboardKey)}"
                        on:click={() => chooseKey(keyboardKey) }
                        >
                        {getKey(keyboardKey)}
                    </button>
                {/key}
            {/each}
        </div>
    {/each}
</div>

<style>
    .keyboard {
        display: flex;
        flex-direction: column;
        row-gap: 3px;
    }

    .keyboard-row {
        display: flex;
        column-gap: 3px;
    }

    .key {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
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
        flex-grow: 1;
    }

    .key.backspace-key {
        position: relative;
        flex-grow: 1;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 40%;
            translate: -50% -50%;
            border-right: solid white 15px;
            border-top: solid transparent 11px;
            border-bottom: solid transparent 11px;
        }

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 60%;
            translate: -50% -50%;
            background-color: white;
            width: 30%;
            height: 7px;
        }
    }
</style>
