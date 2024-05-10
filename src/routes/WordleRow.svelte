<script>
    export let row

    import WordleLetter from './WordleLetter.svelte'

    import { wordleGame } from '$lib/wordleStore.js'
</script>

<div class="row">
    {#each { length: $wordleGame.columns } as _, column}
        {@const letter = $wordleGame.getGuess(row)[column]}
        {@const state = $wordleGame.getGuessMatch(row)[column]}
        
        {@const highlight = $wordleGame.isPlaying && row === $wordleGame.currentRow && column === $wordleGame.currentColumn}

        <WordleLetter {letter} {state} {highlight} />
    {/each}
</div>

<style>
    .row {
        display: flex;
        column-gap: 5px;
    }
</style>
