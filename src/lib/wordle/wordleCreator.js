import { MAX_GUESSES, MAX_LETTERS, LETTERS } from '../constants.js'
import WORDS from '../words.js'
import WordleGame, { LETTERS_STATES } from './wordle.js'
import { ANIMATIONS, wordleAnimator } from '../stores/wordleAnimator.js'

/**
 * @param {WordleGame} wordle
 * @param {string} key
 */
function readKey(wordle, key) {
    if (LETTERS.includes(key)) {
        wordle.addLetter(key)
        return
    }

    function handleEnterKey() {
        const isValidGuess = wordle.isCurrentGuessCompleted() && WORDS.includes(wordle.currentGuess)

        if (isValidGuess) {
            wordle.sendGuess()
            wordleAnimator.play(ANIMATIONS.REVEAL)
        } else {
            wordleAnimator.play(ANIMATIONS.INVALID_GUESS)
        }
    }

    const KEYS_ACTIONS = {
        'arrowleft': () => wordle.prevColumn(),
        'arrowright': () => wordle.nextColumn(),
        ' ': () => wordle.nextEmptyColumn(),
        'enter': () => handleEnterKey(),
        'backspace': () => wordle.removeLetter(),
    }

    const func = KEYS_ACTIONS[key]

    if (func) func()
}

/**
 * @param {WordleGame} wordle
 */
function getWordleMatchingGuesses(wordle) {
    // maps how close the letter state is from the correct letter position
    const BETTER_LETTER_STATES = {
        [LETTERS_STATES.NOT_GUESSED]: 0,
        [LETTERS_STATES.WRONG]: 1,
        [LETTERS_STATES.WRONG_POSITION]: 2,
        [LETTERS_STATES.CORRECT]: 3,
    }

    // converts all the digitable letters into an object
    const matchingLetterStates = {}

    for (const letter of LETTERS) {
        matchingLetterStates[letter] = LETTERS_STATES.NOT_GUESSED
    }

    for (let row = 0; row < wordle.currentRow; row++) {
        const guess = wordle.getGuess(row)
        const matchingGuess = wordle.getGuessMatch(row)

        for (let column = 0; column < wordle.columns; column++) {
            const letter = guess[column]
            const letterState = matchingGuess[column]

            // checks if the current letter state is better than the previously saved one
            if (BETTER_LETTER_STATES[letterState] > BETTER_LETTER_STATES[matchingLetterStates[letter]]) {
                matchingLetterStates[letter] = letterState
            }
        }
    }

    return matchingLetterStates
}

function createWordleGame() {
    const wordle = new WordleGame(MAX_GUESSES, MAX_LETTERS)

    const sendKey = key => readKey(wordle, key)
    const getMatches = () => getWordleMatchingGuesses(wordle)

    return {
        wordle,
        sendKey,
        getMatches,
    }
}

export {
    createWordleGame,
}
