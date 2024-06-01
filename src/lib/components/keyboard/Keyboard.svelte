<script>
    export let keysMatches
    export let component

    import { createEventDispatcher } from 'svelte'
    // constants
    import { KEYBOARD_TYPES } from '$lib/constants.js'
    // stores
    import { settingsStore } from '$lib/stores/settings.js'

    $: keyboard = KEYBOARD_TYPES[$settingsStore.keyboard]

    const dispatch = createEventDispatcher()

    function chooseKey(key) {
        dispatch('chooseKey', { key })
    }
</script>

<div class="keyboard">
    {#each keyboard as keyboardRow, i}
        <div class="keyboard-row">
            {#each keyboardRow as keyboardKey, j}
                {#if keyboardKey === 'backspace'}
                    <button
                        type="button"
                        class="backspace-key"
                        on:click={() => chooseKey('backspace')}
                    >
                        <i class="key fa-solid fa-delete-left"></i>
                    </button>
                {:else if keyboardKey === 'enter'}
                    <button
                        type="button"
                        class="enter-key"
                        on:click={() => chooseKey('enter')}
                    >
                        <span class="key">enter</span>
                    </button>
                {:else}
                    <svelte:component 
                        this={component}
                        keysMatches={keysMatches}
                        key={keyboardKey}
                        on:click={() => chooseKey(keyboardKey)}
                    />
                {/if}
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

    .enter-key, .backspace-key {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        background-color: rgb(80, 80, 80);
        flex-grow: 1;
    }

    .key {
        position: absolute;
    }
</style>
