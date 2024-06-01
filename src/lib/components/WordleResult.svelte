<script>
    export let wordles

    import { createEventDispatcher } from 'svelte'
    // components
    import WordleDisplay from './wordle/WordleDisplay.svelte'

    const dispatch = createEventDispatcher()

    const message = wordles.every(wordle => wordle.hasWon()) ? 'YOU WIN' : 'YOU LOSE'
    const correctGuesses = wordles.map(wordle => wordle.correctGuess)

    function newGame() {
        dispatch('newGame')
    }
</script>

<section class="results">
    <h2>Results</h2>
    <span class="game-result">{message}</span>

    <div class="mini-wordles">
        {#each wordles as wordle}
            <div class="mini-wordle">
                <WordleDisplay {wordle} />
                <span class="game-correct-word">{wordle.correctGuess}</span>
            </div>
        {/each}
    </div>

    <div class="buttons">
        <button class="btn" on:click={newGame}>New Game</button>
    </div>
</section>

<style>
    .results {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h2 {
        font-size: 1.5rem;
        color: white;
    }

    .game-result {
        color: white;
        margin-top: 10px;
    }

    .game-correct-word {
        display: block;
        color: white;
        margin-top: 10px;
        text-align: center;
    }

    .mini-wordles {
        display: flex;
        column-gap: 20px;
        margin: 10px 0 20px;
    }

    .btn {
        padding: 8px 12px;
        color: white;
        background-color: rgb(81, 81, 81);
    }
</style>
