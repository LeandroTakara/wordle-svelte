<script>
    export let wordle

    import { LETTERS_STATES } from '$lib/wordle/wordle.js'

    // maps a letter state to a CSS class
    const CSS_CLASSES = {
        [LETTERS_STATES.CORRECT]: 'correct',
        [LETTERS_STATES.WRONG]: 'wrong',
        [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
        [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
    }

    const guesses = wordle.guesses
    const guessesMatches = wordle.guessesMatches
</script>

<div class="wordle">
    {#each { length: wordle.rows } as _, row}
        {@const guess = guesses[row]}
        {@const guessMatch = guessesMatches[row]}

        <div class="row">
            {#each { length: wordle.columns } as _, column}
                {@const letter = guess?.[column] || ''}
                {@const state = guessMatch?.[column] ?? LETTERS_STATES.NOT_GUESSED}

                <div class="letter {CSS_CLASSES[state]}">
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
