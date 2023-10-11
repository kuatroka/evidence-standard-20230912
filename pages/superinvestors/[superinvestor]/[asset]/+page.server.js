import { get_tr_per_cik, get_tr_per_cik_drilldown,
    get_other_cik_per_cusip } from "./../../lib/server/db/duckdb";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { superinvestor, asset } = params;
    
    
    return { entries_tr_per_cik : await get_tr_per_cik(superinvestor, asset),
            entries_tr_per_cik_drilldown : await get_tr_per_cik_drilldown(superinvestor, asset),
            entries_other_cik_per_cusip: await get_other_cik_per_cusip(asset)};
}











