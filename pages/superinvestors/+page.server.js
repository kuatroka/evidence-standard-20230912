import { get_every_cik_qtr_no_params, get_overview_per_quarter } from "../../lib/server/db/duckdb";
/** @type {import('./$types').PageServerLoad} */

console.time("total")
export async function load({params}) {
  // const { superinvestor } = params;

  return  { 
      
      entries_get_overview_per_quarter:  await get_overview_per_quarter(),
      streamed: {entries_every_cik_qtr :   await  get_every_cik_qtr_no_params()}
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











