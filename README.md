<!--
Last edited by: Morose#6189
Date: February 25, 2023.
-->

## What is this?

This is the repository that has the source code for our club's discord bot and website. It has the programs/technology
we need as a club.

**I wouldn't recommend forking/using this unless you want to contribute to the development.**

## Setup

You can press the green **<> Code** code button then press **Download ZIP** or you can just git clone.

```git
cd "path/to/folder/"
git clone https://github.com/UWindsorBGC/suite.git
```

Once you have gotten the installation ready, go to your terminal (if you haven't already) and set current directory to
where you installed the project at and then run

```bash
npm install
```

This will install SvelteKit, discord.js, Prettier and their dependencies on your local machine, once it is done
installing.

Next, you will need to set up a PostgresSQL database in order to actually get both programs running or else it will
complain that it cannot connect to a database.

Next, you have to go to config-example.json and put in the values it asks you to. After you put in the correct values
you save the file and rename it to config.json.

Finally, you run

```bash
npm run dev
```

This will open the website on `localhost:3000` and turn on the bot if everything is configured correctly.

## How to contribute?

Read [CONTRIBUTING.md](CONTRIBUTING.md).

## Can I use this?

Yes, this project is licensed under the GPL v3 License, meaning any public distribution must be open source. Though, it
is not recommended to use it since it is built for a specific use case that not many people may need it for.
