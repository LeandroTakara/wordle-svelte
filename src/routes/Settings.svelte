<script>
    import { createEventDispatcher } from 'svelte'
    // stores
    import { settingsStore } from '$lib/settingsStore.js'

    const dispatch = createEventDispatcher()

    function closeSettings() {
        dispatch('closeSettings')
    }
</script>

<div class="settings-container" on:click|self={closeSettings}>
    <section class="settings">
        <h2>Settings</h2>

        <button class="close-settings" on:click={closeSettings}>
            <i class="fa-solid fa-x close-icon"></i>
        </button>

        <label class="keyboard-type">
            Keyboard

            <select bind:value={$settingsStore.keyboard}>
                <option value="Alphabetically">Alphabetically</option>
                <option value="QWERTY">QWERTY</option>
            </select>
        </label>
    </section>
</div>

<style>
    .settings-container {
        position: fixed;
        width: 100dvw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        color: white;
    }

    .settings {
        position: relative;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 500px;
        height: 600px;
        padding: 10px 20px;
        border: solid black 2px;
        background-color: rgb(81, 81, 81);
    }
    
    h2 {
        text-align: center;
        margin-bottom: 30px;
    }

    .close-settings {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        color: white;
        background-color: transparent;
    }

    label {
        display: flex;
        justify-content: space-between;
    }
</style>
