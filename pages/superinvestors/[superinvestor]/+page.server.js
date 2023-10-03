import { get_every_cik_qtr, get_every_cik_qtr_cusip,
    get_overview_tr_closed } from "./../../lib/server/db/duckdb";

/** @type {import('./$types').PageServerLoad} */


// const conso_duckdb_file = '../../sec.duckdb';
// const conso_duckdb_file = './sources/duckdb-sec/sec_full_tr.duckdb';

// export async function load({ params }) {
//     const db = await Database.create(conso_duckdb_file);
//     const { superinvestor } = params;

//     let query_duckdb = `
//     SELECT cusip, name_of_issuer AS name, value_usd AS value, shares, cusip_ticker,  quarter, pct_pct
//     FROM main.all_cik_quarter_cusip
//     where cik = '${superinvestor}' `;
//     console.time(query_duckdb);
//     const entries = await db.all(query_duckdb);
//     console.timeEnd(query_duckdb);

//     await db.close();
//     console.log(entries.slice(0, 1));
//     return { entries };
// }

console.time("total")
export async function load({ params, url, depends }) {
    const { superinvestor } = params;
    const quarter = url.searchParams.get('quarter_params');
    depends('params:quarter_params');
    
    return  { 
    entries_get_every_cik_qtr : get_every_cik_qtr(superinvestor),
    entries_get_every_cik_qtr_cusip : get_every_cik_qtr_cusip(superinvestor, quarter),
    entries_get_overview_tr_closed : get_overview_tr_closed(superinvestor)
    } ;
	};


console.timeEnd("total")









