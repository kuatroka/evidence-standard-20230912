<script>
    const total_cik_per_cusip = props.entries_other_cik_per_cusip[0].total_num_cik
    // const total_tr_per_cusip = props.other_cik_per_cusip[0].total_num_tr
    let tr_per_cik = props.entries_tr_per_cik;
    const cik_name = props.entries_tr_per_cik.at(0).cik_name
    const name_of_issuer = props.entries_tr_per_cik.at(0).name_of_issuer 
    const num_tr = props.entries_tr_per_cik.at(0).num_tr
    const format_usd = '[>=1000000000000]$#,##0.0,,,,"T";[>=1000000000]$#,##0.0,,,"B";[>=1000000]$#,##0.0,,"M";$#,##0k'
    const format_usd_no_t = '[>=10000000000]$#,##0.0,,,"B";[>=10000000]$#,##0.0,"M";[>=1000][<100000]$#,##0;$#,##0k'
    const format_shares = '[>=10000000000]#,##0.0,,,"B";[>=10000000]#,##0.0,"M";[>=1000][<100000]#,##0;#,##0k'

    // '[>=1000000000000]$#,##0.0,,,,"T";[>=1000000000]$#,##0.0,,,"B";[>=1000000]$#,##0,,"M";$#,##k'
</script>

# <span style="color: goldenrod;">{cik_name}</span> <br> {num_tr === 1 ? 'Position' : 'Positions'} in: <br>**<span style="color: steelblue;">{name_of_issuer}</span>** 

<!-- ## List of trades: -->
<!-- (click for details) -->




<DataTable data={tr_per_cik} link=link>
<Column id="tr_number"  title='Tr #' align="left" />
    <Column id="tr_open"  title='Open'/>
<Column id="tr_open_value"  title='Entry Value' fmt={format_usd_no_t} align="left"/>
    <Column id="tr_duration_qtr" title='Duration (Qtr)' align="left"/>
    <Column id="tr_close"  title='Close' align="right"/>
    <!-- <Column id="tr_close_value" title='Exit Value' fmt={format_usd_no_t} align="right"/> -->
    <Column id="tr_twrr" title='TR TWRR' fmt='#0.01\%'/> 
</DataTable>


{#if   $page.url.searchParams.get('tr_id')}
# <span style="color: goldenrod;">Transaction **<span style="color: steelblue;"># {tr_per_cik.filter(d=>d.tr_id ===   $page.url.searchParams.get('tr_id'))[0].tr_number}</span>** Drill Down</span>

<BigValue
    data={tr_per_cik}
    title="TR TWRR"
    value=tr_twrr  
    fmt='#0.01\%' 
/>

<BigValue
    data={tr_per_cik}
    title='Duration'
    value=tr_duration_qtr
    fmt='#0 \Qtr'
/> 

<BigValue
    data={tr_per_cik}
    title='Max Roll Up'
    value=max_roll_up
    fmt='#0.01\%'
    
/> 
<BigValue
    data={tr_per_cik}
    title='Opportunity Cost'
    value=opp_cost
    fmt='#0.01\%'
    
/> 

<br>
<DataTable data={props.entries_tr_per_cik_drilldown.filter(d=>d.tr_id ===   $page.url.searchParams.get('tr_id'))}>
<Column id="quarter"  title='Quarter' sort=true/>
<Column id="tr_type"  title='TR Type' align="left"/>
<Column id="value"  title='Total Value' fmt={format_usd} align="left"/>
<!-- <Column id="tr_value"  title='TR Value' fmt={format_usd}/> -->
<Column id="tr_shares"  title='TR Shares' align="left" contentType=delta deltaSymbol=false/>
<Column id="adj_median_sec_price"  title='Price'/>
<Column id="roll_twrr"  title='Roll TWRR' fmt='#0.01\%' contentType=delta deltaSymbol=false/> 
</DataTable>

<!-- {:else} -->
<!-- <DataTable data={props.tr_per_cik_drilldown}>
<Column id="quarter"  title='Quarter'/>
<Column id="tr_type"  title='Exit On' />
</DataTable> -->

{/if}
<!-- **TODO**:*Sort out wrong P/L in transactins wehere stock split occured"*

**TODO**:*Sort out wrong 'CLOSE' when the current quarter is the same as the maximum reported quarter for this cik"*


**TODO**:*Maybe add component/info on "Who else added/reduced the same security in the same quarter?"*

**TODO**:*Add more statistics around the transaction. Like total P/L per each TR and P/L between each period, percentage change for values/shares
added or reduced, "
I might also somehow connect the cik, cusip AND the quarter from the previos page to this page's default view and automaticallyl select the correct transation and maybe even highlight the quarte of transactions...
but it might be just a red herring and something that disctacts me from the core focus on quality and not
quantity of charts...
focus on what is really needed...* -->

<!-- # <span style="color: goldenrod;">Who else traded in<br>**<span style="color: steelblue;">{name_of_issuer}</span>** 
### Since 1999  there have been **{total_cik_per_cusip}** superinvestors who traded **{total_tr_per_cusip}** times in {name_of_issuer}

**TODO**:*1- I need to make the part 'since 1999' dynamic and dependent on the actual data.
I need to have a real year where trading in this company started for the first time"
2- Add a column that show the quarter for the earliest trade and current holdings' value*

**TODO**:*Add a slider to select the quarter on which a trade was open and add a search box for Superinvestor * -->

<!-- <DataTable data={props.other_cik_per_cusip} link="link">
<Column id="cik_name"  title='Superinvestor' sort=true/>
<Column id="num_tr_per_cik"  title='# Tr' />
<Column id="avg_tr_pnl_per_cik"  title='Avg %P/L' fmt='#0.01\%'/>
<Column id="link"  />
</DataTable> -->

