import { writable } from 'svelte/store'
import { LAST_LETTER_REVEAL_TIME } from '../constants.js'

const ANIMATIONS = {
    NONE: 0,
    REVEAL: 1,
    INVALID_GUESS: 2,
}

const ANIMATION_TIME = {
    [ANIMATIONS.REVEAL]: LAST_LETTER_REVEAL_TIME,
    [ANIMATIONS.INVALID_GUESS]: 200,
}

function createWordleAnimator() {
    const { subscribe, set } = writable(ANIMATIONS.NONE)

    return {
        subscribe,
        play: function(animation) {
            set(animation)

            setTimeout(() => {
                set(ANIMATIONS.NONE)
            }, ANIMATION_TIME[animation])
        }
    }
}

export const wordleAnimator = createWordleAnimator()
export {
    ANIMATIONS
}
