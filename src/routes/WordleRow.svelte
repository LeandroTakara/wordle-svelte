<script>
    export let row
    // components
    import WordleLetter from './WordleLetter.svelte'
    // stores
    import { wordleGame, wordleGameAnimator } from '$lib/wordleStore.js'

    $: guess = $wordleGame.getGuess(row)
    $: guessMatch = $wordleGame.getGuessMatch(row)
</script>

<div class="row" class:invalid-word={$wordleGameAnimator === 'invalid-word' && row === $wordleGame.currentRow}>
    {#each { length: $wordleGame.columns } as _, column}
        {@const letter = guess[column]}
        {@const state = guessMatch[column]}
        {@const highlight = !$wordleGame.guessSent && $wordleGame.isPlaying && row === $wordleGame.currentRow && column === $wordleGame.currentColumn}

        <WordleLetter {letter} {state} {highlight} {row} {column} />
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
        0% {
            left: 0;
        }
        33% {
            left: -10px;
        }
        66% {
            left: 10px;
        }
        100% {
            left: 0;
        }
    }
</style>
