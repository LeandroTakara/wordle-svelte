<script>
    export let keysMatches
    export let key

    import { LETTERS_STATES } from '$lib/wordle/wordle.js'
    // stores
    import { ANIMATIONS, wordleAnimator } from '$lib/stores/wordleAnimator.js'

    // maps a letter state to a CSS class
    const KEYS_STATES = {
        [LETTERS_STATES.CORRECT]: 'correct',
        [LETTERS_STATES.WRONG]: 'wrong',
        [LETTERS_STATES.WRONG_POSITION]: 'wrong-position',
        [LETTERS_STATES.NOT_GUESSED]: 'not-guessed',
    }

    let matchCSSClass1 = ''
    let matchCSSClass2 = ''

    $: keyMatch1 = keysMatches[0]
    $: keyMatch2 = keysMatches[1]

    // changes the CSS class when there is no animation playing
    $: if ($wordleAnimator === ANIMATIONS.NONE) {
        matchCSSClass1 = KEYS_STATES[keyMatch1[key]]
        matchCSSClass2 = KEYS_STATES[keyMatch2[key]]
    }
</script>

<button type="button" class="key" on:click>
    <div class="matches" class:both-wrong={matchCSSClass1 === 'wrong' && matchCSSClass2 === 'wrong'}>
        <div class="match {matchCSSClass1}"></div>
        <div class="match {matchCSSClass2}"></div>
    </div>
    <span class="letter">{key}</span>
</button>

<style>
    .key {
        position: relative;
        width: 50px;
        height: 50px;
        text-transform: uppercase;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        background-color: transparent;
        
        &:hover {   
            filter: brightness(1.3);
        }
    }

    .matches {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 100%;
        height: 100%;
        display: flex;
    }

    .match {
        width: 50%;
        height: 100%;
        transition: background-color 0.3s;
        background-color: rgb(80, 80, 80);
    }

    .correct {
        background-color: var(--correct-color);
    }

    .wrong-position {
        background-color: var(--wrong-position-color);
    }

    .wrong {
        opacity: 0.3;
    }

    .key:has(.both-wrong){
        opacity: 0.3;
    }

    .letter {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
    }
</style>
