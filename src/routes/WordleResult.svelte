<script>
    // components
    import WordleDisplay from './WordleDisplay.svelte'
    // stores
    import { wordleGame } from '$lib/wordleStore.js'
    // wordle
    import { GAME_STATES } from '$lib/wordleGame.js'

    const message = $wordleGame.gameState === GAME_STATES.WIN ? 'YOU WIN' : 'YOU LOSE'
    const correctGuess = $wordleGame.correctGuess
</script>

<div class="results">
    <h2>Results</h2>
    <span class="game-result">{message}</span>

    <p class="game-correct-word">The word was: {correctGuess}</p>

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

    .game-result {
        color: white;
        margin-top: 10px;
    }

    .game-correct-word {
        color: white;
    }

    .mini-wordle {
        margin: 10px 0 20px;
    }

    .btn {
        padding: 8px 12px;
        color: white;
        background-color: rgb(81, 81, 81);
    }
</style>
