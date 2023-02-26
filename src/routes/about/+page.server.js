/*
    Last Edited by: Morose#6189
    Date: February 26, 2023.
*/

import pkg from 'pg';
const { Pool } = pkg;

import config from '../../../config.json';

const pool = new Pool({
    user: config.db.username,
    host: config.db.host,
    database: config.db.name,
    password: config.db.password
});

export const load = async () => {
    try {
        const execs = await pool.query("SELECT * FROM members WHERE role_type = 'Executive';");
        const hosts = await pool.query("SELECT * FROM members WHERE role_type = 'Host';");

        return { execs: execs.rows, hosts: hosts.rows };
    } catch (error) {
        return { success: false };
    }
};
