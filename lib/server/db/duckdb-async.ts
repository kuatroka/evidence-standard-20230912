import { DUCKDB_PATH } from './db-path.js';
import { DUCKDB_SHORT_PATH } from './db-path.js';
import type { Cik, Cusip } from "./types";

import { Database } from "duckdb-async";

// Instantiate DuckDB
// const db = await Database.create(DUCKDB_PATH);
// const conn = db.connect();

export async function getCik(limit=60): Promise<Cik[]> {  
    const db = await Database.create(DUCKDB_SHORT_PATH);

    const sql = `select distinct(cik) as cik, 
                any_value(quarter) as quarter
                from 
                main
                GROUP BY all
                LIMIT ${limit}`; // Use template literals correctly
    const cik = await db.all(sql);
    await db.close();
    return cik as Cik[] ; // Return an object with entries property
};
export async function getCusip(limit=60): Promise<Cusip[]> {
    const db = await Database.create(DUCKDB_SHORT_PATH);
    
    const sql = `
    SELECT         
        cusip,
        name_of_issuer,
        cusip_ticker,
        quarter,
        SUM(value) AS value,
    FROM main.main
    GROUP BY all
    LIMIT ${limit}`; // Use template literals correctly

    const cusip = await db.all(sql);
    await db.close();
    return cusip as Cusip[] ; // Return an object with entries property
    
};



