<script>
    export let letter
    export let state
    export let highlight

    import { LETTERS_STATES } from '$lib/wordleGame.js'

    $: getCSSclass = function() {
        const CSSclasses = {
            [LETTERS_STATES.CORRECT]: 'correct',
            [LETTERS_STATES.WRONG]: 'wrong',
            [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
            [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
            [LETTERS_STATES.GUESSING]: 'guessing',
        }

        return CSSclasses[state]
    }
</script>

<div
    class="letter {getCSSclass()}"
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
        font-weight: bolder;

        &.guessing {
            border-color: rgb(255, 255, 255);
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
            background-color: transparent;
        }

        &.correct {
            background-color: rgb(37, 214, 37);
        }

        &.wrong {
            background-color: rgb(214, 37, 37);
        }
        
        &.wrong-position {
            background-color: rgb(214, 187, 37);
        }
    }
</style>
