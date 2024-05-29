<script>
    import { createEventDispatcher } from 'svelte'

    import { KEYBOARD_TYPES } from '$lib/constants.js'
    // stores
    import { keysMatches } from '$lib/wordleStore.js'
    import { settingsStore } from '$lib/settingsStore.js'
    // wordle
    import { LETTERS_STATES } from '$lib/wordleGame.js'

    $: keyboard = KEYBOARD_TYPES[$settingsStore.keyboard]

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
    {#each keyboard as keyboardRow, i}
        <div class="keyboard-row">
            {#each keyboardRow as keyboardKey, j}
                {@const CSSClass = (function() {
                    if (keyboardKey === 'backspace') return 'backspace-key'
                    if (keyboardKey === 'enter') return 'enter-key'
                    return KEYS_STATES[$keysMatches[keyboardKey]]
                })()}

                <button
                    type="button"
                    class="key {CSSClass}"
                    on:click={() => chooseKey(keyboardKey) }
                >
                    {#if keyboardKey === 'backspace'}
                        <i class="fa-solid fa-delete-left"></i>
                    {:else}
                        {keyboardKey}
                    {/if}
                </button>
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
        justify-content: center;
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
        flex-grow: 1;
    }
</style>
