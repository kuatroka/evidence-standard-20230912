<script>

let get_overview_per_quarter = props.entries_get_overview_per_quarter;
$: get_overview_per_quarter_filtered = props.entries_get_overview_per_quarter.filter(item => item.quarter === inputYearQuater);

let quarters = get_overview_per_quarter.map(item => (item.quarter)).reverse();
let sliderValue = quarters.length -1;
$: inputYearQuater = quarters[sliderValue];

$: every_cik_qtr_filtered = props.streamed.entries_every_cik_qtr.filter(item => item.quarter === inputYearQuater);
$: prev_quarter = every_cik_qtr_filtered[0].prev_quarter;

const [ total_quarters, 
        total_ciks,
        last_reporting_date] = get_overview_per_quarter.map(q => [q.total_quarters, q.total_ciks, q.last_reporting_date.toISOString().slice(0, 10)])[0];

const format_usd = '[>=1000000000000]$#,##0.0,,,,"T";[>=1000000000]$#,##0.0,,,"B";[>=1000000]$#,##0.0,,"M";$#,##0k'

const format_shares = '[>=1000000000]#,##0.0,,,"B";[>=1000000]#,##0.0,"M";#,##0k'

</script>


<!-- {JSON.stringify(props.entries_get_overview_per_quarter[0].quarter,  null, 2)}  -->
<div style="display: flex; justify-content: center;">
    <Alert status="warning" open="true">
    <Modal title="Data Quality Warning and Site's Purpose" buttonText="Important Statement About Data Quality and App's Purpose"> 
    This app is in a **technical and functional** beta.
    <br>
    This site is for financial **investigation and research** only. Nothing here constitutes investment or any other kind of advice.
    <br>
    The US SEC doesn't enforce or check the quality of the submitted 13F filings data and its accuracy is **notoriously bad**. We are doing our best to make it better and it's an ongoing process, but there will always be a data bug or error, especially in the years from 1999 to 2013.
    <br>
    If you found a bug, please let us know and provide the 'is' and 'should be' data together with your rationale. We will do our best to fix it.
    </Modal>
    </Alert>  
</div>

# **{quarters.length/4}** years Of Superinvestors' Decisions
### Since 1999, *The U.S. Securities and Exchange Commission (SEC)* requires institutional investors that **"exercise investment discretion over $100 million or more"** to report what is known as **13F Filing**. <br>
### These filings are produced every **Quarter** and investors have **45 days** after the end of quarter to report what financial assets and in what quantity they owned at the last day of each quarter. 
<hr>

<BigValue
    data={get_overview_per_quarter}
    title="All Superinvestors"
    value=total_ciks_num0
    
/>

<BigValue
    data={get_overview_per_quarter}
    title="Reported Years"
    value=total_years
/>

<BigValue
    data={get_overview_per_quarter}
    title="Traded Assets"
    value=total_cusip_num0
/>

<!-- **TODO**:*Maybe add one more BigValue here for Total Value traded in 25 years*
**TODO**:*Add a BigValue for Average %P/L for all cik all time*
**TODO**:*correct the tooltip formatting for Line Chart for Value, Assets. Now it shows data in Billions and 
it needs to be Trillions* -->

<Tabs>
    <Tab label="Value">
        <AreaChart 
            data={get_overview_per_quarter}
            x=quarter_end_date 
            y=total_value_per_quarter_usd
            yAxisTitle="Value($)"
            sort=asc
        />

    </Tab>

    <Tab label="Superinvestors">
        <BarChart 
        data={get_overview_per_quarter}
        x=quarter_end_date 
        y=num_ciks_per_quarter_num0
        yAxisTitle="# of Superinvestors"
        />
    </Tab>

        <Tab label="Assets">
        <BarChart 
        data={get_overview_per_quarter}
        x=quarter_end_date 
        y=num_cusip_per_quarter_num0
        fmt= '#,##0'
        yAxisTitle="# of Assets"
        />
    </Tab>
        <Tab label="Table">
        <DataTable data="{get_overview_per_quarter}" search="true">
            <Column id="quarter" title='Quarter'/>
            <Column id="num_ciks_per_quarter_num0" title='Superinvestors' align='right'/>
            <Column id="prc_change_cik" contentType=delta fmt='#0.01\%' title="(Chg)" align='left'/>
            <Column id="total_value_per_quarter_usd" title='Value' align='right'/>
            <Column id="prc_change_total_value" contentType=delta fmt='#0.01\%' title="(Chg)" align='left'/>

            <Column id="num_cusip_per_quarter_num0" title='Assets' align='right'/>
            <Column id="prc_change_cusip" contentType=delta fmt='#0.01\%' title="(Chg)" align='left'/>
            
        </DataTable>

    </Tab>

</Tabs>

# Reported Quarter: <span style="color: goldenrod;">{inputYearQuater}</span>
### Lastest filing closes(ed) on: **{last_reporting_date}** (Fix this)
<!-- **TODO**:*Fix the code for the last reporting date/reporting closed date* -->

<!-- <RangeInputYear {quarters} bind:quarterValue={inputYearQuater} /> -->
<Slider bind:quarters={quarters} bind:quarterValue={sliderValue} />



<BigValue
    data={get_overview_per_quarter_filtered}
    title="Total Value"
    value=total_value_per_quarter_usd  
    fmt={format_usd}
    comparison=prc_change_total_value
    Comparisonfmt='#0.01\%'  
    comparisonTitle="% QoQ"
    maxWidth='10em'
/>

<BigValue
    data={get_overview_per_quarter_filtered}
    title="# of Superinvestors"
    value=num_ciks_per_quarter_num0  
    fmt='#,##0'  
    comparison=prc_change_cik
    Comparisonfmt='#0.01\%'  
    comparisonTitle="% QoQ"
    maxWidth='10em'
/>

<BigValue
    data={get_overview_per_quarter_filtered}
    title="# of Assets"
    value=num_cusip_per_quarter_num0  
    fmt='#,##0'  
    comparison=prc_change_cusip
    omparisonfmt='#0.01\%' 
    comparisonTitle="% QoQ"
    maxWidth='10em'
/> 

<BigValue
    data={get_overview_per_quarter_filtered}
    title="TWRR"
    value=TWRR  
    fmt='#0.01\%'  
    comparison=TWRR_prc_change
    comparisonTitle="% QoQ"
    maxWidth='10em'
/>
<!-- prev_roll_mean_all_cik_qtr_adj_mode_sec_pnl_prc -->

<!-- **TODO**:*TWRR comes wrong from the table*
**TODO**:*All BigValue comparisons seem to be wrong. Fix it*
**TODO**:*Add a table column for Average % TWR for each cik all each quarter*
**TODO**:*Think about adding a Transactional TWRR or Rolling Return Rate... which is more needed?* -->

<!-- **TODO**:*Formatting of values in the table is not dynamic - needs correction*
**TODO**:*The search box is not synchronised with the slider. When inputting search term and 
selecting values on slider the results ignore the search term*  -->

<!-- {#await props.streamed.entries_every_cik_qtr.filter(item => item.quarter === inputYearQuater)}
    <p>loading...</p>
{:then data} -->

<Tabs>

    <Tab label="Table">
        <DataTable data="{every_cik_qtr_filtered}" link="cik" search="true">
            <Column id="cik_name" title='Superinvestor' wrap='true'/>
            <Column id="num_assets" title='Assets'/>
            <Column id="value_usd" title='Value' fmt={'[>=1000000000000]$#,##0.0,,,,"T";[>=1000000000]$#,##0.0,,,"B";[>=1000000]$#,##0.0,,"M";[>=1000]$#,##0k'}/>
            <Column id="pct_pct" title='Weight' fmt='#0.01\%'/>
            <Column id="roll_mean_cik_qtr_adj_median_sec_pnl_prc" title='TWRR' contentType=delta fmt='#0.01\%'/>
            <!-- <Column id="roll_mean_cik_qtr_prc_change" contentType=delta fmt='#0.01\%' title="TWRR Chg"/> -->
        </DataTable>
    </Tab>


<Tab label="Treemap">

<ECharts config={
    {
        title: {
            text: 'Value by Asset',
            left: 'center'
        },
        tooltip: {
            formatter: function (params) {
                let value = params.data.value;
                let formattedValue = '';
                if (value >= 1e12) {
                    formattedValue = (value / 1e12).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'T';
                } else if (value >= 1e9) {
                    formattedValue = (value / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M';
                } else if (value >= 1e6) {
                    formattedValue = (value / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M';
                } else {
                    formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 2 });
                }
                return `${params.data.name}<br/>
                    $${formattedValue}<br/>
                    ${(params.data.pct_pct).toFixed(2)}% `;
            },
        },
        series: [
            {
                name: 'All Assets',
                type: 'treemap',
                data: every_cik_qtr_filtered.map(item => ({
                    value: item.value_usd,
                    name: item.cik_name,
                    pct_pct: item.pct_pct
                })),
                label: {
                    fontWeight: 'bold',
                    position: 'insideTopLeft',
                    show: true,
                    formatter: '{b}'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                itemStyle: {
                    gapWidth: 3,
                    borderColor: 'white',
                },
            }
        ]
    }
}/> 
<!-- **TODO**:*By dedault, under the chart, the title shows some arbitrary tile's name* -->
    </Tab>
</Tabs>
<!-- {/await} -->


<!-- **TODO**:*I'd like to make the Racing Bar chart work*

**TODO**:*It might be interesting to make a timeline of all cik over all 25 years.
I could show when each cik first appeared and when it disappeared. When it had gaps in being active
I could use color coding. Those with no gaps - blue, with gaps - red...o something like it
i could use this [example](https://unovis.dev/gallery/view?collection=Lines%20and%20Areas&title=Basic%20Timeline) to do the timeline* -->




































<!-- <ScatterPlot 
    data={get_overview_per_quarter} 
    y=num_cusip_per_quarter_num0 
    x=total_value_per_quarter_usd
    xAxisTitle="total_value_per_quarter_usd" 
    yAxisTitle="num_cusip_per_quarter_num0" 
/> -->






<!-- let sliderValueMapping = {}; -->
<!-- quarters.forEach((quarter, index) => {
    sliderValueMapping[quarter] = index;
});

let updateSearchParams = (key, value) => {
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    }
};
    
$: {updateSearchParams('quarter_params', inputYearQuater)}
$: inputYearQuater = $page.url.searchParams.get('quarter_params')
$: sliderValue = sliderValueMapping[inputYearQuater] -->


