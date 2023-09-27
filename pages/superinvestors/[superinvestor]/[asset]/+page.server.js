import { get_tr_per_cik } from "./../../lib/server/db/duckdb";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { superinvestor, asset } = params;
    
    
    return { entries_tr_per_cik : await get_tr_per_cik(superinvestor, asset) };
}











