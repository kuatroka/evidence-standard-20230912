import { error} from '@sveltejs/kit';
import { get_cik_cusip_per_quarter } from "../../lib/server/db/duckdb-wasm";
/** @type {import('./$types').PageServerLoad} */



console.time("total")
export async function load() {
    return  { 
        entries : await get_cik_cusip_per_quarter(),
    } ;
	};

console.timeEnd("total")