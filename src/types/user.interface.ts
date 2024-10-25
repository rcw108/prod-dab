export interface WooCommerceMeta {
	variable_product_tour_shown: string
	activity_panel_inbox_last_read: string
	activity_panel_reviews_last_read: string
	categories_report_columns: string
	coupons_report_columns: string
	customers_report_columns: string
	orders_report_columns: string
	products_report_columns: string
	revenue_report_columns: string
	taxes_report_columns: string
	variations_report_columns: string
	dashboard_sections: string
	dashboard_chart_type: string
	dashboard_chart_interval: string
	dashboard_leaderboard_rows: string
	homepage_layout: string
	homepage_stats: string
	task_list_tracked_started_tasks: string
	help_panel_highlight_shown: string
	android_app_banner_dismissed: string
}

export interface User {
	id: number
	name: string
	url: string
	description: string
	slug: string
	avatar_urls: {
		96: string
		24: string
		48: string
	}
	meta: {
		woocommerce_launch_your_store_tour_hidden: string
		woocommerce_coming_soon_banner_dismissed: string
	}
	is_super_admin: boolean
	woocommerce_meta: WooCommerceMeta
}

export interface ValidUser {
	user: {
		ID: string
		user_login: string
		user_nicename: string
		user_email: string
		user_url: string
		user_registered: string
		user_activation_key: string
		user_status: string
		display_name: string
	}
	roles: string[]
	jwt: ValidUserJWT
}

export interface ValidUserJWT {
	token: string
	payload: {
		iat: number
		exp: number
		email: string
		id: string
		username: string
	}
}

export interface NoValidUser {
	message: string
	errorCode: number
}

export interface ValidateUserResponse {
	success: boolean
	data: ValidUser
}

export interface ValidRefresh {
	jwt: string
}

export interface RefreshResponse {
	success: boolean
	data: ValidRefresh
}
