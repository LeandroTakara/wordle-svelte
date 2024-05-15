import { derived, readable, writable } from 'svelte/store'
import WordleGame, { LETTERS_STATES } from './wordleGame.js'

// constants
const ROWS = 6
const COLUMNS = 5
const CORRECT_GUESS = 'svelt'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

const REVEAL_TIME_MILLISECONDS = 1000
const REVEAL_DELAY_TIME_MILLISECONDS = 200

const LAST_LETTER_REVEAL_MILLISECONDS = REVEAL_TIME_MILLISECONDS + REVEAL_DELAY_TIME_MILLISECONDS * (COLUMNS - 1)

function createWordleStore(rows, columns, correctGuess) {
    const wordleGame = new WordleGame(rows, columns, correctGuess)

    const { subscribe, set } = writable(wordleGame)

    return {
        subscribe,
        sendKey: function(key) {
            if (!wordleGame.isPlaying) return

            if (LETTERS.includes(key)) {
                wordleGame.addLetter(key)
            } else if (key === 'arrowleft') {
                wordleGame.prevColumn()
            } else if (key === 'arrowright') {
                wordleGame.nextColumn()
            } else if (key === ' ') {
                wordleGame.nextEmptyColumn()
            } else if (key === 'enter') {
                if (!wordleGame.currentGuessIsCompleted()) return

                wordleGame.sendGuess()

                // waits for some time before going to the next guess and sets which keys were matched
                setTimeout(() => {
                    wordleGame.nextGuess()
                    set(wordleGame)
                }, LAST_LETTER_REVEAL_MILLISECONDS)
            } else if (key === 'backspace') {
                wordleGame.removeLetter()
            }

            set(wordleGame)
        },
        setColumn: function(column) {
            wordleGame.changeColumn(column)
            set(wordleGame)
        }
    }
}

export const wordleGame = createWordleStore(ROWS, COLUMNS, CORRECT_GUESS)
export const keysMatches = derived(wordleGame, $wordleGame => {
    // maps how close the letter state is from the correct letter position
    const KEY_STATES = {
        [LETTERS_STATES.NOT_GUESSED]: 0,
        [LETTERS_STATES.WRONG]: 1,
        [LETTERS_STATES.WRONG_POSITION]: 2,
        [LETTERS_STATES.CORRECT]: 3,
    }

    // converts all the digitable letters into an object
    const keysMatches = LETTERS.split('').map(key => ({ key, state: LETTERS_STATES.NOT_GUESSED }))

    for (let row = 0; row < $wordleGame.currentRow; row++) {
        const letters = $wordleGame.getGuess(row)
        const matches = $wordleGame.getGuessMatch(row)

        for (let column = 0; column < $wordleGame.columns; column++) {
            const keyMatch = keysMatches.find(keyMatch => keyMatch.key === letters[column])

            // sets how close the key is from the correct answer, because the KEY_STATES map how close the letter is,
            // we can just compare if the matches[column] is better than the current value (keyMatch.state),
            // thus saving the best value for displaying on the keyboard
            if (KEY_STATES[matches[column]] > KEY_STATES[keyMatch.state]) {
                keyMatch.state = matches[column]
            }
        }
    }

    return keysMatches
})
export const REVEAL_TIME = readable(REVEAL_TIME_MILLISECONDS)
export const REVEAL_DELAY_TIME = readable(REVEAL_DELAY_TIME_MILLISECONDS)
