<script>
    import '../global.css'
    // components
    import Wordle from './Wordle.svelte'
    import Keyboard from './Keyboard.svelte'
    // stores
    import { wordleGame } from '$lib/wordleStore.js'

    function handleKeyAction(key) {
        wordleGame.sendKey(key)
    }
</script>

<main>
    <div class="game">
        <Wordle />
    </div>

    <Keyboard on:chooseKey={event => handleKeyAction(event.detail.key)} />
</main>

<svelte:window on:keydown={event => handleKeyAction(event.key.toLowerCase())} />

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100dvh;
    }
</style>
