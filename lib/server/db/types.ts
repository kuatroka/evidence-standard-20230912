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

export type Overview_per_quarter = {
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
	roll_mean_cik_qtr_adj_mode_sec_pnl_prc: number;
	roll_mean_cik_qtr_prc_change: number;
	roll_mean_all_cik_qtr_adj_mode_sec_pnl_prc: number;
	roll_mean_all_cik_qtr_prc_change: number;
	num_assets: number;
	value_usd: number;
	pct_pct: number;
};

export type Every_cik_qtr_cusip = {
	cik: number;
	cik_name: string;
	cusip: string;
	cusip_ticker: string;
	name_of_issuer: string;
	quarter: string;
	value_usd: number;
	shares: number;	
	pct_pct: number;
	rolling_twrr: number
};

export type Quarters_per_cik = {
	cik: number;
	quarter: string;
};

export type Overview_tr_closed = {
	cik: number;
	quarter: string;
	num_closed_tr_per_qtr: number;
	qtr_open_closed_tr_ratio: number;
	qtr_mean_tr_twr: number;
	qtr_avg_tr_duration_qtr: number;
};

export type Tr_per_cik = {
	tr_id: string;
	cik: number;
	tr_id_link: string
	tr_open: string;
	tr_number: number;
	tr_close: string;
	tr_open_value: number;
	tr_open_shares: number;
	tr_close_value: number;
	tr_close_shares: number;
	num_tr2: number;
	name_of_issuer: string;
	cik_name: string;
	cusip: string;
	tr_duration_qtr: number;
	tr_twrr: number
};

