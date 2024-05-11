<script>
    export let letter
    export let state
    export let highlight

    import { LETTERS_STATES } from '$lib/wordleGame.js'

    const CSSclasses = {
        [LETTERS_STATES.CORRECT]: 'correct',
        [LETTERS_STATES.WRONG]: 'wrong',
        [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
        [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
        [LETTERS_STATES.GUESSING]: 'guessing',
    }
</script>

<div
    class="letter {CSSclasses[state]}"
    class:highlight
>
    {letter}
</div>

<style>
    .letter {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: solid black 3px;
        text-transform: uppercase;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;

        &.guessing {
            border-color: white;
            background-color: rgb(82, 82, 82);
        }
        
        &.highlight::before {
            content: '';
            position: absolute;
            bottom: 0;
            background-color: white;
            width: 100%;
            height: 4px;
        }

        &.not-guessed {
            background-color: rgb(65, 65, 65);
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
