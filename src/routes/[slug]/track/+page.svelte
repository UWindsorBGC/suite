<script>
    export let data;

    const { monsters } = data;

    let showModal = false;

    let showMod = false;

    let dmgType = 'dmg';
    
    function action() {
        if (dmgType === 'dmg') return 'Damage';
        if (dmgType === 'hdmg') return 'Half Damage';
        return 'Heal';
    }

    function mod(name, id) {
        showMod = id;
        dmgType = name;
    }
    
    function percent(health, max) {
        return ((health / max) * 100);
    }
    function setColor(health, max) {
        let color = 'green';

        if (percent(health, max) <= 50 && percent(health, max) > 20) color = '#FFC000';
        if (percent(health, max) <= 20) color = 'red';

        return color;
    }

</script>

<title> Tracker </title>

<div class = 'container'>
    <h1> Monsters </h1>
    {#each monsters || [] as m (m.id)}
        <div class = 'monster'>
            <form method = "POST" action = "?/kill">
                <input type = 'text' name = 'id' value = '{m.id}' hidden>
                <button type = 'submit' class = 'delete'> x </button> 
            </form>
            <p> {m.name} &#160; &#160; &#160; <br>
                <img src = '/images/ac.png' alt = 'armor' class = 'stat-icon'> {m.armor} 
                <button on:click = "{() => mod('dmg', m.id)}" class = 'mod-button'>
                    <img src = '/images/dmg.png' alt = 'dmg' class = 'stat-icon'>
                </button>

                <button on:click = "{() => mod('hdmg', m.id)}" class = 'mod-button'>
                    <img src = '/images/hdmg.png' alt = 'hdmg' class = 'stat-icon'>
                </button>

                <button on:click = "{() => mod('heal', m.id)}" class = 'mod-button'>
                    <img src = '/images/health.png' alt = 'heal' class = 'stat-icon'>
                </button>
                <br> <br>
            </p>

            <div class = 'health-bar-container'>
                <div class = 'health-bar' style = 
                    'width: {percent(m.health, m.max)}%; --color: {setColor(m.health, m.max)}'>
                    <p class = 'health-bar-text'>
                        {#if m.health <= 0}
                            <p style = 'color: red;'> DEAD </p>
                        {:else}
                            {`${m.health}/${m.max}`} 
                        {/if}
                    </p>
                </div>
            </div>
        </div> <br>
        
        {#if showMod === m.id}
        <div class = 'modifier'> 
            <button on:click = "{() => showMod = false}" class = 'modal-close'> x </button>
            <form method = "POST" action = "?/{dmgType}" >
                <label for = 'mod'> <h3> {action()} {m.name} </h3> </label>
                <input type = 'text' name = 'id' value = '{m.id}' hidden>
                <input type = 'text' name = 'mod' class = 'modal-input' autocomplete = "off">
                <input type = 'submit' hidden>
            </form>
        </div>
        {/if} {/each} <br>
    
    <button class = 'add' on:click = "{() => showModal = true}"> &plus; Add Monster </button>
</div>

{#if showModal}
<div class = 'modal'>
    <button on:click = "{() => showModal = false}" class = 'modal-close'> x </button>
    <h1> Add Monster </h1>
    <form method = 'POST' action = '?/create'>
        <label for = 'name'> <h2> Name </h2> </label>
        <input type = 'text' name = 'name' class = 'modal-input' 
               autocomplete = "off" required>
        <label for = 'health'> <h2> Health </h2> </label>
        <input type = 'number' name = 'health' class = 'modal-input' min = '1' required>
        <label for = 'armor'> <h2> Armor Class </h2> </label>
        <input type = 'number' name = 'armor' class = 'modal-input' required>
        <label for = 'count'> <h2> Count </h2> </label>
        <input type = 'number' name = 'count' class = 'modal-input' value = '1' min = '1'> <br> <br>
        <button class = 'modal-button'> Add Monster </button>
    </form>
</div>
{/if}


<style>
    @font-face {
        font-family: Mr Eaves Small Caps;
        src: url("/fonts/Mr Eaves Small Caps.otf");
    }

    .container h1 {
        color: rgba(245, 245, 245, 1);
    }

    .monster {
        background-color: rgb(16, 16, 16);
        width: fit-content;
        height: fit-content;
        padding: 1rem;
        border-radius: 1rem;
        white-space: nowrap;
    }

    .monster p {
        margin: 0;
        font-size: 24px
    }

    .stat-icon {
        margin-bottom: -8px;
        gap: 0;
    }

    .add {
        background-color: var(--element-bg);
        padding: 1rem;
        color: white;
        font-size: 18px;
        border: none;
        border-radius: 1rem;
    }

    .modal {
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(16, 16, 16);
        padding: 2rem;
        border: white 1px solid;
        border-radius: 1rem;
    }

    .modal-input {
        padding: 1rem;
        background-color: rgb(16, 16, 16);
        border: white 1px solid;
        font-size: 24px;
        color: white;
    }

    .modal-button {
        padding: 1rem;
        background-color: black;
        border: white 1px solid;
    }

    .modal-close {
        position: absolute;
        top: 1rem; right: 1rem;
        background-color: inherit;
        font-size: 36px;
        border: none;
        color: white;
        height: fit-content;
        width: fit-content;
    }

    .delete {
        position: relative;
        float: right;
        background-color: inherit;
        border: none;
        font-size: 24px;
        color: white;
    }

    .mod-button {
        border: none;
        background-color: inherit;
        height: 32px;
        width: 32px;
    }

    .modifier {
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(16, 16, 16);
        padding: 2rem;
        font-size: 24px;
        border-radius: 25px;
    }

    .health-bar-container {
        width: 100%;
        height: 2rem;
        background-color: #323232;
        position: relative;
        text-align: center;
        border-radius: 0.5rem;
    }

    .health-bar-text {
        font-size: 24px;
        position: absolute;
        margin: 0; left: 0; right: 0; top: 50%;
        transform: translateY(-50%);
    }

    .health-bar {
        background-color: var(--color);
        height: 2rem;
        border-radius: 0.5rem;
    }
</style>