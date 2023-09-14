import { error} from '@sveltejs/kit';
import { getCik, getCusip } from "../../lib/server/db/sqlite";

/** @type {import('./$types').PageServerLoad} */


console.time("total")
export function load() {
    const entries_cik = getCik();
    if (!entries_cik) {
		throw error(404, 'Cik not found');
	}

    const entries_cusip = getCusip();
    if (!entries_cusip) {
		throw error(404, 'Cusip not found');
	}

    return  { entries_cik, entries_cusip } ;
	};

console.timeEnd("total")













