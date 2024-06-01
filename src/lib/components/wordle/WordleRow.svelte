<script>
    export let guess
    export let guessMatch
    export let columns
    export let isRowActive
    export let activeColumn

    // components
    import WordleLetter from './WordleLetter.svelte'
    // stores
    import { ANIMATIONS, wordleAnimator } from '$lib/stores/wordleAnimator.js'
</script>

<div class="row" class:invalid-word={$wordleAnimator === ANIMATIONS.INVALID_GUESS && isRowActive}>
    {#each { length: columns } as _, column}
        {@const letter = guess[column]}
        {@const state = guessMatch[column]}
        {@const highlight = isRowActive && activeColumn === column}

        <WordleLetter   
            {letter}
            {state}
            {highlight}
            {column}
            on:chooseColumn
        />
    {/each}
</div>

<style>
    .row {
        display: flex;
        column-gap: 5px;
    }

    .row.invalid-word {
        position: relative;
        animation: invalid-word 0.2s;
    }

    @keyframes -global-invalid-word {
        0%   { left: 0;     }
        33%  { left: -10px; }
        66%  { left: 10px;  }
        100% { left: 0;     }
    }
</style>
