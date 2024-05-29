import { derived, writable } from 'svelte/store'
import WordleGame, { LETTERS_STATES } from './wordleGame.js'
import WORDS from './words.js'
import { LETTERS, MAX_GUESSES, MAX_LETTERS, LAST_LETTER_REVEAL_TIME } from './constants.js'

function createWordleStore(rows, columns) {
    const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)]

    let timeoutNextGuess = null

    const wordleGame = new WordleGame(rows, columns, getRandomWord())

    const { subscribe, set } = writable(wordleGame)

    return {
        subscribe,
        sendKey: function(key) {
            if (!wordleGame.isPlaying || wordleGame.guessSent) return

            if (LETTERS.includes(key)) {
                wordleGame.addLetter(key)
            } else if (key === 'arrowleft') {
                wordleGame.prevColumn()
            } else if (key === 'arrowright') {
                wordleGame.nextColumn()
            } else if (key === ' ') {
                wordleGame.nextEmptyColumn()
            } else if (key === 'enter') {
                if (!wordleGame.isCurrentGuessCompleted() || !WORDS.includes(wordleGame.currentGuess)) {
                    wordleGameAnimator.play('invalid-word')

                    setTimeout(() => {
                        wordleGameAnimator.end()
                    }, 200)

                    return
                }

                if (wordleGame.guessSent) return

                wordleGame.sendGuess()
                wordleGameAnimator.play('reveal')
                localStorage.setItem('svelte-wordle', JSON.stringify({
                    guesses: wordleGame.guesses,
                    guessesMatches: wordleGame.guessesMatches,
                    correctGuess: wordleGame.correctGuess
                }))
    

                // waits for some time before going to the next guess and sets which keys were matched
                timeoutNextGuess = setTimeout(() => {
                    wordleGame.nextGuess()
                    wordleGameAnimator.end()

                    set(wordleGame)
                }, LAST_LETTER_REVEAL_TIME)
            } else if (key === 'backspace') {
                wordleGame.removeLetter()
            }

            set(wordleGame)
        },
        setColumn: function(column) {
            wordleGame.changeColumn(column)
            set(wordleGame)
            clearTimeout(timeoutNextGuess)
        },
        newGame: function() {
            wordleGame.newGame(getRandomWord())

            set(wordleGame)
            clearTimeout(timeoutNextGuess)
        }
    }
}

function createWordleAnimator() {
    const { subscribe, set } = writable('')

    return {
        subscribe,
        play: function(animationName) {
            set(animationName)
        },
        end: function() {
            set('')
        }
    }
}

export const wordleGame = createWordleStore(MAX_GUESSES, MAX_LETTERS)
export const keysMatches = derived(wordleGame, $wordleGame => {
    // maps how close the letter state is from the correct letter position
    const KEY_STATES = {
        [LETTERS_STATES.NOT_GUESSED]: 0,
        [LETTERS_STATES.WRONG]: 1,
        [LETTERS_STATES.WRONG_POSITION]: 2,
        [LETTERS_STATES.CORRECT]: 3,
    }

    // converts all the digitable letters into an object
    const keysMatches = {}

    for (const letter of LETTERS) {
        keysMatches[letter] = LETTERS_STATES.NOT_GUESSED
    }
    
    for (let row = 0; row < $wordleGame.currentRow; row++) {
        const letters = $wordleGame.getGuess(row)
        const matches = $wordleGame.getGuessMatch(row)

        for (let column = 0; column < $wordleGame.columns; column++) {
            // sets how close the key is from the correct answer, because the KEY_STATES map how close the letter is,
            // we can just compare if the matches[column] is better than the current value (keyMatch.state),
            // thus saving the best value for displaying on the keyboard
            if (KEY_STATES[matches[column]] > KEY_STATES[keysMatches[letters[column]]]) {
                keysMatches[letters[column]] = matches[column]
            }
        }
    }

    return keysMatches
})
export const wordleGameAnimator = createWordleAnimator()
