export type Cik = {
	cik: number;
	quarter: string;
};

export type Cusip = {
	cusip: string;
	name_of_issuer: string;
	cusip_ticker: string;
	quarter: string;
	value: number;
};

export type Cik_cusip_per_quarter = {
	quarter: string;
	quarter_end_date: string;
	last_reporting_date: string;
	is_quarter_completed: string;
	num_ciks_per_quarter_num0: number;
	num_cusip_per_quarter_num0: number;
	total_cusip_num0: number;
	total_value_per_quarter_usd: number;
	total_ciks_num0: number;
	total_years: number;
	total_quarters: number;
	prc_change_cik: number;
	prc_change_cusip: number;
	prc_change_total_value: number;
	year_as_date: Date;
	year_as_number: number;
	year_as_string: string;	
};

export type Every_cik_qtr = {
	cik: number;
	cik_name: string;
	quarter: string;
	prev_quarter: string;
	total_value_quarter_all_cik_usd: number;
	prc_change_total_value_pct: number;
	total_num_cik_per_quarter_num0: number;
	prc_change_total_num_cik_pct: number;
	total_assets_per_quarter_num0: number;
	prc_change_total_num_assets_pct: number;
	num_assets: number;
	value_usd: number;
	pct_pct: number;


}