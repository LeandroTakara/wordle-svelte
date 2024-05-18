const LETTERS_STATES = {
    CORRECT: 0,
    WRONG: 1,
    WRONG_POSITION: 2,
    NOT_GUESSED: 3,
    GUESSING: 4,
}

const GAME_STATES = {
    PLAYING: 0,
    WIN: 1,
    LOSE: 2,
}

class WordleGame {
    #currentRow
    #currentColumn
    /** @type {string[][]} */
    guesses

    constructor(rows, columns, correctGuess) {
        this.rows = rows
        this.columns = columns
        this.correctGuess = correctGuess
        
        this.#currentRow = 0
        this.#currentColumn = 0
        this.gameState = GAME_STATES.PLAYING
        
        this.guesses = [this.#createGuessArray()]
        this.guessesMatches = []

        this.guessSent = false
    }

    get currentRow() {
        return this.#currentRow
    }

    get currentColumn() {
        return this.#currentColumn
    }

    get currentGuess() {
        return this.#currentGuessArray.join('')
    }

    get isPlaying() {
        return this.gameState === GAME_STATES.PLAYING
    }

    get #currentGuessArray() {
        return this.guesses[this.#currentRow]
    }

    #createGuessArray() {
        return new Array(this.columns).fill('')
    }

    #matchGuess() {
        const guessMatches = []

        const frequency = new Map()

        for (const correctLetter of this.correctGuess) {
            frequency.set(correctLetter, (frequency.get(correctLetter) || 0) + 1)
        }

        // checks all the correct letters
        for (let i = 0; i < this.columns; i++) {
            const guessLetter = this.#currentGuessArray[i]

            if (guessLetter === this.correctGuess[i]) {
                guessMatches[i] = LETTERS_STATES.CORRECT
                frequency.set(guessLetter, frequency.get(guessLetter) - 1)
            }
        }

        // checks all the wrong or wrong-position letters
        for (let i = 0; i < this.columns; i++) {
            if (guessMatches[i] === LETTERS_STATES.CORRECT) continue

            const guessLetter = this.#currentGuessArray[i]

            if ((frequency.get(guessLetter) || 0) === 0) {
                guessMatches[i] = LETTERS_STATES.WRONG
            } else {
                guessMatches[i] = LETTERS_STATES.WRONG_POSITION
                frequency.set(guessLetter, frequency.get(guessLetter) - 1)
            }
        }

        return guessMatches
    }

    sendGuess() {
        if (!this.isCurrentGuessCompleted() && this.guessSent) return

        const guessMatches = this.#matchGuess()
        this.guessesMatches.push(guessMatches)
        this.guessSent = true
    }

    #checkGameState() {
        if (this.guessesMatches[this.guessesMatches.length - 1].every(match => match === LETTERS_STATES.CORRECT)) {
            this.gameState = GAME_STATES.WIN
        } else if (this.guesses.length === this.rows) {
            this.gameState = GAME_STATES.LOSE
        }  
    }

    nextGuess() {
        this.#checkGameState()

        if (this.isPlaying) {
            this.guessSent = false
            this.#currentRow++
            this.#currentColumn = 0
            this.guesses.push(this.#createGuessArray())
        }
    }

    isCurrentGuessCompleted() {
        return this.#currentGuessArray.every(letter => letter)
    }

    getGuess(row) {
        return this.guesses[row] || new Array(this.columns).fill('')
    }

    getGuessMatch(row) {
        if (this.isPlaying && row === this.#currentRow && !this.guessSent) return new Array(this.columns).fill(LETTERS_STATES.GUESSING)
        return this.guessesMatches[row] || new Array(this.columns).fill(LETTERS_STATES.NOT_GUESSED)
    }

    newGame(correctGuess) {
        this.correctGuess = correctGuess
        this.#currentRow = 0
        this.#currentColumn = 0
        this.gameState = GAME_STATES.PLAYING
        this.guesses = [this.#createGuessArray()]
        this.guessesMatches = []
        this.guessSent = false
    }

    addLetter(letter) {
        if (this.#currentColumn < this.columns) {
            this.#currentGuessArray[this.#currentColumn] = letter
            this.guesses = this.guesses
            this.nextEmptyColumn()
        }
    }

    removeLetter() {
        if (
            this.#currentColumn > 0 &&
            (
                this.#currentColumn === this.columns ||
                this.#currentGuessArray[this.#currentColumn] === ''
            )
        ) {
            this.prevColumn()
        }

        this.#currentGuessArray[this.#currentColumn] = ''
    }

    changeColumn(column) {
        if (column < 0 || column >= this.columns) return
        this.#currentColumn = column
    }

    nextColumn() {
        if (this.#currentColumn < this.columns - 1) this.#currentColumn++
        else this.#currentColumn = 0
    }

    prevColumn() {
        if (this.#currentColumn > 0) this.#currentColumn--
        else this.#currentColumn = this.columns - 1
    }

    nextEmptyColumn() {
        if (this.isCurrentGuessCompleted()) {
            this.#currentColumn = this.columns
        } else {
            do {
                this.nextColumn()
            } while (this.#currentGuessArray[this.#currentColumn])
        }
    }
}

export default WordleGame
export {
    LETTERS_STATES,
    GAME_STATES
}
