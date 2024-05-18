<script>
    // stores
    import { wordleGame } from '$lib/wordleStore.js'
    // wordle
    import { LETTERS_STATES } from '$lib/wordleGame.js'

    const CSSClasses = {
        [LETTERS_STATES.CORRECT]: 'correct',
        [LETTERS_STATES.WRONG]: 'wrong',
        [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
        [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
    }

    const guesses = $wordleGame.guesses
    const guessesMatches = $wordleGame.guessesMatches
</script>

<div class="wordle">
    {#each { length: $wordleGame.rows } as _, row}
        {@const guess = guesses[row]}
        {@const guessMatch = guessesMatches[row]}

        <div class="row">
            {#each { length: $wordleGame.columns } as _, column}
                {@const letter = guess?.[column] || ''}
                {@const state = guessMatch?.[column] ?? LETTERS_STATES.NOT_GUESSED}

                <div class="letter {CSSClasses[state]}">
                    {letter}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .wordle {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
    }

    .letter {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: solid black 1px;
        text-transform: uppercase;
        color: white;
        font-size: 1rem;
        font-weight: 700;

        &.guessing {
            background-color: transparent;
            border-color: white;
            cursor: pointer;
        }

        &.not-guessed {
            background-color: transparent;
        }

        &.correct {
            background-color: var(--correct-color);
        }

        &.wrong {
            background-color: var(--wrong-color);
        }
        
        &.wrong-position {
            background-color: var(--wrong-position-color);
        }
    }
</style>
