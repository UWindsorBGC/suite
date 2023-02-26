import pkg from 'pg';
const { Pool } = pkg;

import config from '../../../../config.json';

const pool = new Pool({
    user: config.db.username,
    host: config.db.host,
    database: config.db.name,
    password: config.db.password
});

export const load = async () => {
    try {
        const res = await pool.query('SELECT * FROM monsters ORDER BY id;');

        return {
            monsters: res.rows
        };
    } catch (error) {
        console.log(error);
    }
};

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get('name');
        const health = formData.get('health');
        const armor = formData.get('armor');
        const count = formData.get('count');

        const query = 'INSERT INTO monsters(name, health, armor, max) VALUES($1, $2, $3, $4);';

        if (count === '1') {
            try {
                await pool.query(query, [name, health, armor, health]);
            } catch (error) {
                console.log(error);
            }

            return { success: true };
        } else {
            for (let i = 1; i <= count; i++) {
                try {
                    await pool.query(query, [`${name} #${i}`, health, armor, health]);
                } catch (error) {
                    console.log(error);
                }
            }

            return { success: true };
        }
    },
    kill: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const query = 'DELETE FROM monsters WHERE id = $1;';
        try {
            await pool.query(query, [id]);
        } catch (error) {
            console.log(error);
        }

        return { success: true };
    },
    dmg: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const mod = formData.get('mod');
        const query = 'UPDATE monsters SET health = health - $1 WHERE id = $2;';
        try {
            await pool.query(query, [mod, id]);
        } catch (error) {
            console.log(error);
        }

        return { success: true };
    },
    hdmg: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const mod = Math.round(formData.get('mod') / 2);
        const query = 'UPDATE monsters SET health = health - $1 WHERE id = $2;';
        try {
            await pool.query(query, [mod, id]);
        } catch (error) {
            console.log(error);
        }

        return { success: true };
    },
    heal: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const mod = formData.get('mod');
        const query = 'UPDATE monsters SET health = health + $1 WHERE id = $2;';
        try {
            await pool.query(query, [mod, id]);
        } catch (error) {
            console.log(error);
        }

        return { success: true };
    }
};
