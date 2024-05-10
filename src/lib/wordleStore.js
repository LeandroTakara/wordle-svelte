import { writable } from 'svelte/store'
import WordleGame from './wordleGame.js'

const ROWS = 6
const COLUMNS = 5
const CORRECT_GUESS = 'svelt'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

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
                wordleGame.sendGuess()
            } else if (key === 'backspace') {
                wordleGame.removeLetter()
            }

            set(wordleGame)
        },
    }
}

export const wordleGame = createWordleStore(ROWS, COLUMNS, CORRECT_GUESS)
