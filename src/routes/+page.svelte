<!--
    Last Edited by: Morose#6189
    Date: February 25, 2023.
-->

<script>
    export let data;

    const { events } = data;

    const live = "<img src = 'live.png' alt = 'live' width = '48'>";
</script>

<title> The University of Windsor Board Games Club </title>

<section id="live">
    {#each events || [] as event}
        {#if event.status === 2}
            <div class="event">
                <h2>
                    {event.name}
                    {@html live} <br />
                    <sub> Started on {event.start_time} </sub>
                    <sub> <br /> Ends on {event.end_time} </sub>
                </h2>

                {#if event?.image}
                    <img src={event.image} alt={event.name} class="eventimg" /> <br />
                {/if}

                <p>{event.description}</p>
            </div>
        {/if}
    {/each}
</section>

<section id="events">
    <h1>Upcoming Events!</h1>
    {#each events || [] as event}
        {#if event.status == 1}
            <div class="event">
                <h2>
                    {event.name} <br />
                    <sub> {event.start_time} </sub>
                    <sub> Hosted in {event.location} </sub>
                </h2>

                {#if event?.image}
                    <img src={event.image} alt={event.name} class="eventimg" /> <br />
                {/if}

                <p>{@html event.description}</p>
            </div>
        {/if}
    {:else}
        No upcoming events! Stay tuned for more!
    {/each}
</section>

<style>
    /* This is the style for the events section */
    #events,
    #live {
        background: var(--element-bg);
        width: 50%;
        height: fit-content;
        color: white;
        margin: 0 auto;
        padding: 2rem;
        border-radius: 1rem;
        align-items: center;
        margin-bottom: 5em;
    }

    .eventimg {
        max-width: 100%;
        max-height: 100%;
    }

    .event {
        border-bottom: 2px rgba(255, 255, 255, 25%) solid;
    }

    .event:last-child {
        border-bottom: none;
    }
    /* This centers the title */
    #events h1 {
        text-align: center;
    }

    #live:empty {
        display: none;
    }
</style>
