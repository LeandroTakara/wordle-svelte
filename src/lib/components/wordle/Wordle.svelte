<script>
    export let wordle

    // components
    import WordleRow from './WordleRow.svelte'
</script>

<div class="game">
    {#each { length: wordle.rows } as _, row}
        {@const guess = wordle.getGuess(row)}
        {@const guessMatch = wordle.getGuessMatch(row)}
        {@const isRowActive = wordle.currentRow === row}
        {@const activeColumn = wordle.currentRow === row ? wordle.currentColumn : -1}

        <WordleRow
            {guess}
            {guessMatch}
            columns={wordle.columns}
            {isRowActive}
            {activeColumn}
            on:chooseColumn
        />
    {/each}
</div>

<style>
    .game {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }
</style>
