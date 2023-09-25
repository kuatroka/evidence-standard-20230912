import DuckDB, { OPEN_READONLY } from 'duckdb'
import { DUCKDB_SHORT_PATH } from './db-path.js';
import type { Every_cik_qtr,
    Overview_per_quarter,
    Every_cik_qtr_cusip, Quarters_per_cik } from "./types";

// Instantiate DuckDB
const db = new DuckDB.Database(DUCKDB_SHORT_PATH, OPEN_READONLY);
const conn = db.connect();

///////// Overview of every quarter /////////
export async function get_overview_per_quarter(): Promise<Overview_per_quarter[]> {  
    const query = (query: string) => {
        return new Promise<Overview_per_quarter[]>((resolve, reject) => {
            conn.all(query, (err, res: any) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };
    const sql = `select *
                from 
                overview_per_quarter`; // Use template literals correctly
    const overview_per_quarter: Overview_per_quarter[] = await query(sql);
    // db.close()
    return overview_per_quarter as Overview_per_quarter[] ; // Return an object with entries property
    
};

///////// Every cik and quarter /////////
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
                    quarter_end_date,
                    prev_quarter,
                    total_value_quarter_all_cik_usd,
                    prc_change_total_value_pct,
                    total_num_cik_per_quarter_num0,
                    prc_change_total_num_cik_pct,
                    total_assets_per_quarter_num0,
                    prc_change_total_num_assets_pct,
                    roll_mean_cik_qtr_adj_mode_sec_pnl_prc,
                    roll_mean_cik_qtr_prc_change,
                    roll_mean_all_cik_qtr_adj_mode_sec_pnl_prc,
                    roll_mean_all_cik_qtr_prc_change,
                    num_assets,
                    value_usd,
                    pct_pct
                from every_cik_qtr 
                `;
                
    const get_every_cik_qtr: Every_cik_qtr[] = await query(sql);
    // db.close()
    return get_every_cik_qtr as Every_cik_qtr[] ; // Return an object with entries property
    };

///////// Every cik and quarter with parameters /////////

export async function get_every_cik_qtr_params(superinvestor?: string): Promise<Every_cik_qtr[]> {
    const query = (query: string) => {
        return new Promise<Every_cik_qtr[]>((resolve, reject) => {
            conn.all(query, (err, res: any) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };

    let sql = `
    SELECT 
        cik,
        cik_name,
        quarter,
        quarter_end_date,
        prev_quarter,
        total_value_quarter_all_cik_usd,
        prc_change_total_value_pct,
        total_num_cik_per_quarter_num0,
        prc_change_total_num_cik_pct,
        total_assets_per_quarter_num0,
        prc_change_total_num_assets_pct,
        roll_mean_cik_qtr_adj_mode_sec_pnl_prc,
        roll_mean_cik_qtr_prc_change,
        roll_mean_all_cik_qtr_adj_mode_sec_pnl_prc,
        roll_mean_all_cik_qtr_prc_change,
        num_assets,
        value_usd,
        pct_pct
    FROM every_cik_qtr`;

    if (superinvestor) {
        sql += `
        WHERE cik = '${superinvestor}'`;
    }

    sql += `
    ORDER BY cik, quarter`;

    const get_every_cik_qtr: Every_cik_qtr[] = await query(sql);
    console.log(get_every_cik_qtr.slice(0, 1));
    // db.close()
    return get_every_cik_qtr as Every_cik_qtr[]; // Return an object with entries property
}


// export async function get_every_cik_qtr_params(superinvestor): Promise<Every_cik_qtr[]> {
//         const query = (query: string) => {
//             return new Promise<Every_cik_qtr[]>((resolve, reject) => {
//                 conn.all(query, (err, res: any) => {
//                     if (err) reject(err);
//                     resolve(res);
//                 })
//             })
//         };
//         const sql = `select 
//                         cik,
//                         cik_name,
//                         quarter,
//                         quarter_end_date,
//                         prev_quarter,
//                         total_value_quarter_all_cik_usd,
//                         prc_change_total_value_pct,
//                         total_num_cik_per_quarter_num0,
//                         prc_change_total_num_cik_pct,
//                         total_assets_per_quarter_num0,
//                         prc_change_total_num_assets_pct,
//                         roll_mean_cik_qtr_adj_mode_sec_pnl_prc,
//                         roll_mean_cik_qtr_prc_change,
//                         roll_mean_all_cik_qtr_adj_mode_sec_pnl_prc,
//                         roll_mean_all_cik_qtr_prc_change,
//                         num_assets,
//                         value_usd,
//                         pct_pct
//                     from every_cik_qtr_cusip 
//                     where cik = '${superinvestor}'
//                     order by cik, quarter
//                     `;
                    
//         const get_every_cik_qtr: Every_cik_qtr[] = await query(sql);
//         // db.close()
//         return get_every_cik_qtr as Every_cik_qtr[] ; // Return an object with entries property
//         };


///////// Every cik, quarter and cusip with parameters /////////
export async function get_every_cik_qtr_cusip(superinvestor): Promise<Every_cik_qtr_cusip[]> {
        const query = (query: string) => {
            return new Promise<Every_cik_qtr_cusip[]>((resolve, reject) => {
                conn.all(query, (err, res: any) => {
                    if (err) reject(err);
                    resolve(res);
                })
            })
        };
    
        let sql = `
        SELECT cusip, name_of_issuer AS name, value_usd AS value, shares, cusip_ticker,  quarter, pct_pct
        FROM main.all_cik_quarter_cusip
        where cik = '${superinvestor}' `;

        const every_cik_qtr_cusip: Every_cik_qtr_cusip[] = await query(sql);
        // db.close()
        return every_cik_qtr_cusip as Every_cik_qtr_cusip[] ; // Return an object with entries property
        };

///////////

export async function get_quarters_per_cik(superinvestor): Promise<Quarters_per_cik[]> {
    const query = (query: string) => {
        return new Promise<Quarters_per_cik[]>((resolve, reject) => {
            conn.all(query, (err, res: any) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };

    let sql = `
    SELECT cik, name_of_issuer AS name, value_usd AS value, shares, cusip_ticker,  quarter, pct_pct
    FROM main.all_cik_quarter_cusip
    where cik = '${superinvestor}' `;

    const every_cik_qtr_cusip: Quarters_per_cik[] = await query(sql);
    // db.close()
    return every_cik_qtr_cusip as Quarters_per_cik[] ; // Return an object with entries property
    };
