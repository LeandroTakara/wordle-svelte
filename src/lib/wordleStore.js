import { writable } from 'svelte/store'
import WordleGame, { LETTERS_STATES } from './wordleGame.js'

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
                if (wordleGame.currentGuessIsCompleted()) {
                    const lastRow = wordleGame.currentRow

                    wordleGame.sendGuess()

                    keysMatches.update(keysMatches => {
                        const letters = wordleGame.getGuess(lastRow)
                        const matches = wordleGame.getGuessMatch(lastRow)

                        const keyStates = {
                            [LETTERS_STATES.NOT_GUESSED]: 0,
                            [LETTERS_STATES.WRONG]: 1,
                            [LETTERS_STATES.WRONG_POSITION]: 2,
                            [LETTERS_STATES.CORRECT]: 3,
                        }

                        for (let i = 0; i < wordleGame.columns; i++) {
                            const keyMatch = keysMatches.find(keyMatch => keyMatch.key === letters[i])

                            if (keyStates[matches[i]] > keyStates[keyMatch.state]) {
                                keyMatch.state = matches[i]
                            }
                        }

                        return keysMatches
                    })
                }
            } else if (key === 'backspace') {
                wordleGame.removeLetter()
            }

            set(wordleGame)
        }
    }
}

export const wordleGame = createWordleStore(ROWS, COLUMNS, CORRECT_GUESS)
export const keysMatches = writable(LETTERS.split('').map(key => ({ key, state: LETTERS_STATES.NOT_GUESSED })))
