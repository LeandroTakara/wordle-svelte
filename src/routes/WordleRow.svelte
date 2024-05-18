<script>
    export let row
    // components
    import WordleLetter from './WordleLetter.svelte'
    // stores
    import { wordleGame } from '$lib/wordleStore.js'

    $: guess = $wordleGame.getGuess(row)
    $: guessMatch = $wordleGame.getGuessMatch(row)
</script>

<div class="row">
    {#each { length: $wordleGame.columns } as _, column}
        {@const letter = guess[column]}
        {@const state = guessMatch[column]}
        {@const highlight = !$wordleGame.guessSent && $wordleGame.isPlaying && row === $wordleGame.currentRow && column === $wordleGame.currentColumn}

        <WordleLetter {letter} {state} {highlight} {column} />
    {/each}
</div>

<style>
    .row {
        display: flex;
        column-gap: 5px;
    }
</style>
