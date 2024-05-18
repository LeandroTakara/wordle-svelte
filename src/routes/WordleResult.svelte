<script>
    // components
    import WordleDisplay from './WordleDisplay.svelte'
    // stores
    import { wordleGame } from '$lib/wordleStore.js'
    // wordle
    import { GAME_STATES } from '$lib/wordleGame.js'

    const message = $wordleGame.gameState === GAME_STATES.WIN ? 'YOU WIN' : 'YOU LOSE'
</script>

<div class="results">
    <h2>Results</h2>
    <span class="result-message">{message}</span>

    <div class="mini-wordle">
        <WordleDisplay />
    </div>

    <div class="buttons">
        <button class="btn" on:click={wordleGame.newGame}>New Game</button>
    </div>
</div>

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

    .result-message {
        color: white;
    }

    .mini-wordle {
        margin: 30px 0;
    }

    .btn {
        padding: 8px 12px;
        color: white;
        background-color: rgb(81, 81, 81);
    }
</style>
