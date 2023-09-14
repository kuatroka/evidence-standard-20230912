import DuckDB, { OPEN_READONLY } from 'duckdb'
import { DUCKDB_SHORT_PATH } from './db-path.js';
import type { Every_cik_qtr,
    Cusip,
    Cik_cusip_per_quarter } from "./types";

// Instantiate DuckDB
const db = new DuckDB.Database(DUCKDB_SHORT_PATH, OPEN_READONLY);
const conn = db.connect();


export async function get_cik_cusip_per_quarter(): Promise<Cik_cusip_per_quarter[]> {  
    const query = (query: string) => {
        return new Promise<Cik_cusip_per_quarter[]>((resolve, reject) => {
            conn.all(query, (err, res: any) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };
    const sql = `select *
                from 
                cik_cusip_per_quarter`; // Use template literals correctly
    const cik_cusip_per_quarter: Cik_cusip_per_quarter[] = await query(sql);
    // db.close()
    return cik_cusip_per_quarter as Cik_cusip_per_quarter[] ; // Return an object with entries property
    
};


export async function get_every_cik_qtr(): Promise<Every_cik_qtr[]> {
    const query = (query: string) => {
        return new Promise<Every_cik_qtr[]>((resolve, reject) => {
            conn.all(query, (err, res: any) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };
    const sql = `select 
                    cik,
                    cik_name,
                    quarter,
                    prev_quarter,
                    total_value_quarter_all_cik_usd,
                    prc_change_total_value_pct,
                    total_num_cik_per_quarter_num0,
                    prc_change_total_num_cik_pct,
                    total_assets_per_quarter_num0,
                    prc_change_total_num_assets_pct,
                    num_assets,
                    value_usd,
                    pct_pct
                from 
                every_cik_qtr`;
    
    const get_every_cik_qtr: Every_cik_qtr[] = await query(sql);
    // db.close()
    return get_every_cik_qtr as Every_cik_qtr[] ; // Return an object with entries property
    };




export async function getCusip(limit=60): Promise<Cusip[]> {
    // const db = new DuckDB.Database(DUCKDB_SHORT_PATH, OPEN_READONLY);
    // const conn = db.connect();
    const query = (query: string) => {
    return new Promise<Cusip[]>((resolve, reject) => {
        conn.all(query, (err, res: any) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};
const sql = `SELECT         
                DISTINCT(cusip) AS cusip,
                ANY_VALUE(name_of_issuer) AS name_of_issuer,
                ANY_VALUE(cusip_ticker) AS cusip_ticker,
                ANY_VALUE(quarter) AS quarter,
                last(value) AS value,
            FROM main
            WHERE cusip_ticker != 'null'
            GROUP BY cusip
            LIMIT ${limit}`; // Use template literals correctly
const entries: Cusip[] = await query(sql);
// db.close()
return entries as Cusip[] ; // Return an object with entries property
};
