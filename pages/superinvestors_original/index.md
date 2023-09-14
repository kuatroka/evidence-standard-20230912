<script>
// $: last_reporting_date = cik_cusip_per_quarter[0].last_reporting_date
let cik_cusip_per_quarter = props.entries_cik_cusip_per_quarter;

let quarters = cik_cusip_per_quarter.map(item => (item.quarter)).reverse();
$: inputYearQuater = quarters[quarters.length -1];

// $: every_cik_every_qtr_filtered = props.entries_every_cik_qtr.filter(item => item.quarter === inputYearQuater);

// $: prev_quarter = props.entries_every_cik_qtr.find(item => item.quarter === inputYearQuater)?.prev_quarter;

$: entries = props.entries_every_cik_qtr;
$: every_cik_every_qtr_filtered = entries.filter(item => item.quarter === inputYearQuater);
$: prev_quarter = every_cik_every_qtr_filtered[0].prev_quarter;

// $: cik_cusip_per_quarter = every_cik_every_qtr_filtered;

const [ total_quarters, 
        total_ciks,
        last_reporting_date] = cik_cusip_per_quarter.map(q => [q.total_quarters, q.total_ciks, q.last_reporting_date])[0];




</script>

<!-- {JSON.stringify(props.entries_cik_cusip_per_quarter[0].quarter,  null, 2)}  -->

# **25** years Of 13F Filings
### Since 1999, *The U.S. Securities and Exchange Commission (SEC)* requires institutional investors that **"exercise investment discretion over $100 million or more"** to report what is known as **13F Filing**. <br>
### These filings are produced every **Quarter** and investors have **45 days** after the end of quarter to report what financial assets and in what quantity they owned at the last day of each quarter. 
<hr>

<BigValue
    data={cik_cusip_per_quarter}
    title="All Superinvestors"
    value=total_ciks_num0
/>

<BigValue
    data={cik_cusip_per_quarter}
    title="Reported Years"
    value=total_years
/>

<BigValue
    data={cik_cusip_per_quarter}
    title="Traded Assets"
    value=total_cusip_num0
/>

**TODO**:*Maybe add one more BigValue here for Total Value traded in 25 years*



**TODO**:*correct the tooltip formatting for Line Chart for Value, Assets. Now it shows data in Billions and 
it needs to be Trillions*

<hr>

<Tabs>
    <Tab label="Value">
        <AreaChart 
            data={cik_cusip_per_quarter}
            x=quarter_end_date 
            y=total_value_per_quarter_usd
            yAxisTitle="$ End Qtr"
            sort=asc
        />

    </Tab>

    <Tab label="# Superinvestors">
        <BarChart 
        data={cik_cusip_per_quarter}
        x=quarter_end_date 
        y=num_ciks_per_quarter_num0
        yAxisTitle="Active Superinvestors During quarter"
        />
    </Tab>

        <Tab label="# Assets">
        <BarChart 
        data={cik_cusip_per_quarter}
        x=quarter_end_date 
        y=num_cusip_per_quarter_num0
        fmt= '#,##0'
        yAxisTitle="# of Traded Assets"
        />
    </Tab>
        <Tab label="Table">
        <DataTable data="{cik_cusip_per_quarter}" search="true">
            <Column id="quarter" title='quarter'/>
            <Column id="total_value_per_quarter_usd" title='Value at End of quarter'/>
        </DataTable>

    </Tab>

</Tabs>

# Quarter: <span style="color: goldenrod;">{inputYearQuater}</span>
### Lastest filing closes(ed) on: **{last_reporting_date}** (Fix this)
<!-- **TODO**:*Fix the code for the last reporting date/reporting closed date* -->

<RangeInputYear {quarters} bind:quarterValue={inputYearQuater} />

<BigValue
    data={every_cik_every_qtr_filtered}
    title="Total Value"
    value=total_value_quarter_all_cik_usd  
    comparison=prc_change_total_value_pct
    comparisonTitle="Over {prev_quarter}"
/>

<BigValue
    data={every_cik_every_qtr_filtered}
    title="# of Superinvestors"
    value=total_num_cik_per_quarter_num0  
    fmt='#,##0'  
    comparison=prc_change_total_num_cik_pct
    comparisonTitle="Over {prev_quarter}"
/>

<BigValue
    data={every_cik_every_qtr_filtered}
    title="# of Assets"
    value=total_assets_per_quarter_num0  
    fmt='#,##0'  
    comparison=prc_change_total_num_assets_pct
    comparisonTitle="Over {prev_quarter}"
/>


<Tabs>
    <Tab label="Table">
        <DataTable data="{every_cik_every_qtr_filtered}" link="cik" search="true">
            <Column id="cik_name" title='Superinvestor'/>
            <Column id="num_assets" title='Assets (#)'/>
            <Column id="value_usd" title='Value ($)' fmt={'[>=1000000000000]$#,##0.0,,,,"T";[>=1000000000]$#,##0.0,,,"B";[>=1000000]$#,##0.0,,"M";[>=1000]$#,##0k'}/>
            <Column id="pct_pct" title='Weight (%)'/>
        </DataTable>

    </Tab>

    <Tab label="Chart">

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
                    ${(params.data.pct_pct * 100).toFixed(2)}% `;
            },
        },
        series: [
            {
                name: 'All Assets',
                type: 'treemap',
                data: every_cik_every_qtr_filtered.map(item => ({
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
**TODO**:*By dedault, under the chart, the title shows some arbitrary tile's name*
    </Tab>

</Tabs>





































<!-- <ScatterPlot 
    data={cik_cusip_per_quarter} 
    y=num_cusip_per_quarter_num0 
    x=total_value_per_quarter_usd
    xAxisTitle="total_value_per_quarter_usd" 
    yAxisTitle="num_cusip_per_quarter_num0" 
/> -->





