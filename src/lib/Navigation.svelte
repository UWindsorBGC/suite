<script>
    let showNav = false;

    function toggle() {
        showNav = !showNav;
    }
</script>

<button class = 'navbutton' on:click = "{toggle}"> ≡ </button>
{#if showNav}
<nav>
    <ul>
        <br> <br> <br> <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Home </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> In Person </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Online </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/dnd"> Dungeons & Dragons </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Lancer </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Magic The Gathering </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Chess </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/about"> About Us </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Documents </a> </li>
        <br>
        <li> <a class = 'entry' on:click = "{toggle}" href = "/"> Social Media </a> </li>
    </ul>
</nav>
{/if}

<style>
nav {
    background-color: #121212;
    font-size: 24px;
    color: white;
    height: 100%;
    width: fit-content;
    padding: 2rem;
    text-align: left;
    position: fixed;
    
}

nav ul {
    list-style: none;
}

.navbutton {
    position: relative;
    background-color: inherit;
    font-size: 36px;
    color: white;
    height: fit-content;
    width: fit-content;
    float: left;
    z-index: 9;
    border: none;
    line-height: 6em;
    padding: 0 2rem 0; 
}

.entry:visited, .entry:link {
    color: white;
    text-decoration: none;
}
</style>