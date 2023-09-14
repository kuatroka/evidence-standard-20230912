import { error} from '@sveltejs/kit';
import { get_every_cik_qtr, get_cik_cusip_per_quarter } from "../../lib/server/db/duckdb";
// import { getCusip } from "../../lib/server/db/duckdb-async";

/** @type {import('./$types').PageServerLoad} */



console.time("total")
export async function load() {
    return  { 
      entries_cik_cusip_per_quarter: await get_cik_cusip_per_quarter(),
      entries_every_cik_qtr : await get_every_cik_qtr()
    } ;
	};

console.timeEnd("total")



 ///// for typescript version of the load()

// import type { PageServerLoad } from './$types';
// export const load: PageServerLoad = async ({ params }) => {

//   return  {   entries_cusip: await getCusip(),  
//     entries_cik_cusip_per_quarter: await get_cik_cusip_per_quarter()
//               }  ;    
// };











