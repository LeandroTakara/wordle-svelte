<script>
    import WordleRow from './WordleRow.svelte'

    import { wordleGame } from '$lib/wordleStore.js'
</script>

<div class="game">
    {#each { length: $wordleGame.rows } as _, row}
        <WordleRow {row} />
    {/each}
</div>

<style>
    .game {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }
</style>
