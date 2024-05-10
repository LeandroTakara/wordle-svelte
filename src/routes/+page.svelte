<script>
    import '../global.css'

    import Wordle from './Wordle.svelte'

    import { wordleGame } from '$lib/wordleStore.js'

    function handleKeyDown(e){
        const key = e.key.toLowerCase()

        handleKeyAction(key)
    }

    function handleKeyAction(key) {
        wordleGame.sendKey(key)
    }
</script>

<main>
    <Wordle />
</main>

<svelte:window on:keydown={handleKeyDown} />

<style>
    main {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
</style>
