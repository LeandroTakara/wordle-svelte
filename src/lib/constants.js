const MAX_GUESSES = 6
const MAX_LETTERS = 5

const REVEAL_TIME = 1000
const REVEAL_DELAY_TIME = 200
const LAST_LETTER_REVEAL_TIME = REVEAL_TIME + REVEAL_DELAY_TIME * (MAX_LETTERS - 1)

const CHANGE_SCREEN_TIME = 1000
const CHANGE_SCREEN_DELAY_TIME = 1000

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

const KEYBOARD_ALPHABETICALLY = Object.freeze([
    Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']),
    Object.freeze(['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']),
    Object.freeze(['backspace', 'u', 'v', 'w', 'x', 'y', 'z', 'enter']),
])

export {
    MAX_GUESSES,
    MAX_LETTERS,

    REVEAL_TIME,
    REVEAL_DELAY_TIME,
    LAST_LETTER_REVEAL_TIME,

    CHANGE_SCREEN_TIME,
    CHANGE_SCREEN_DELAY_TIME,

    LETTERS,

    KEYBOARD_ALPHABETICALLY,
}
