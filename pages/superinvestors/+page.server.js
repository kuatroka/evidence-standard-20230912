import { get_every_cik_qtr, get_overview_per_quarter } from "../../lib/server/db/duckdb";

/** @type {import('./$types').PageServerLoad} */



console.time("total")
export async function load() {
    return  { 
      entries_every_cik_qtr : await get_every_cik_qtr(),
      entries_get_overview_per_quarter:  await get_overview_per_quarter()
    } ;
	};

console.timeEnd("total")


// return {
//   details: {
//     data: funcDetails()
//   }
//   summary: await funcSummary(),
// }

 ///// for typescript version of the load()

// import type { PageServerLoad } from './$types';
// export const load: PageServerLoad = async ({ params }) => {

//   return  {   entries_cusip: await getCusip(),  
//     entries_cik_cusip_per_quarter: await get_cik_cusip_per_quarter()
//               }  ;    
// };











