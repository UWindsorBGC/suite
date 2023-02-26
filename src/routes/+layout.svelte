<!--
    Last Edited by: Morose#6189
    Date: February 25, 2023.
-->
<script>
    // Imports navigation sidebar.
    import Navigation from '../lib/Navigation.svelte';

    // Automatically gets current year.
    const year = new Date().getFullYear();
</script>

<header>
    <div id="logo">
        <Navigation />
        <img src="/logo.png" width="128" height="128" alt="logo" />
        <h1>The University of Windsor Board Games Club</h1>
    </div>
</header>

<slot />

<footer>
    <section class="category">
        <h2>In Person</h2>
        <a class="entry" href="/"> Games <br /> </a>
        <a class="entry" href="/"> Hosts <br /> </a>
        <a class="entry" href="/"> Events </a>
    </section>

    <section class="category">
        <h2>Online</h2>
        <a class="entry" href="/"> Games <br /> </a>
        <a class="entry" href="/"> Hosts <br /> </a>
        <a class="entry" href="/"> Events </a>
    </section>

    <section class="category">
        <h2>Dungeons & Dragons <br /></h2>
        <a class="entry" href="/"> Campaigns <br /> </a>
        <a class="entry" href="/"> Dungeon Masters <br /> </a>
        <a class="entry" href="/"> Events </a>
    </section>

    <section class="category">
        <h2>Lancer</h2>
        <a class="entry" href="/"> Missions <br /> </a>
        <a class="entry" href="/"> Hosts <br /> </a>
        <a class="entry" href="/"> Events </a>
    </section>

    <section class="category">
        <h2>Magic The Gathering</h2>
        <a class="entry" href="/"> Decks <br /> </a>
        <a class="entry" href="/"> Hosts <br /> </a>
        <a class="entry" href="/"> Events </a>
    </section>

    <section class="category">
        <h2>Chess</h2>
        <a class="entry" href="/"> Matches <br /> </a>
        <a class="entry" href="/"> Hosts <br /> </a>
        <a class="entry" href="/"> Events </a>
    </section>
    <h3 id="copyright">Copyright &copy; {year} The University of Windsor Board Games Club</h3>
</footer>

<style>
    :global(html) {
        height: 100%;
    }

    :global(:root) {
        --bg: #262626;
        --element-bg: #121212;
    }

    @font-face {
        font-family: Lexend;
        src: url('/fonts/Lexend-Regular.ttf');
    }

    :global(body) {
        /* This was to remove the default margin and padding. */
        padding: 0px;
        margin: 0px;
        background-color: var(--bg);
        font-family: Lexend;
        color: white;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* This is the style for the big banner on top with the logo */
    header {
        width: 100%;
        height: fit-content;
        background-color: #161616;
        color: white;
        display: table;
        margin-bottom: 5em;
    }

    #logo {
        margin: 0 auto;
        text-align: center;
    }

    /* This is the style for the footer */
    footer {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background-color: #161616;
        color: white;
        margin-top: auto;
        padding-bottom: 25px;
        justify-items: flex-start;
    }

    /* This controls the styling for the categories in the footer */
    .category {
        flex-grow: 1;
        flex-direction: column;
        padding: 50px;
    }

    .entry:link,
    .entry:visited {
        color: white;
        text-decoration: none;
    }

    /* This makes the copyright at the absolute bottom */
    #copyright {
        width: 100%;
        text-align: center;
    }
</style>
