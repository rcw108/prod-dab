export interface RegistrationCustomer {
	email: string
	username: string
	password: string
}

export interface AuthCustomer {
	login: string
	password: string
}

export interface CreatedCustomer {
	message?: string
	id: number
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	email: string
	first_name: string
	last_name: string
	role: string
	username: string
	billing: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		postcode: string
		country: string
		state: string
		email: string
		phone: string
	}
	shipping: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		postcode: string
		country: string
		state: string
		phone: string
	}
}

export interface OrderItem {
	id: number
	name: string
	product_id: number
	variation_id: number
	quantity: number
	tax_class: string
	subtotal: string
	subtotal_tax: string
	total: string
	total_tax: string
	taxes: []
	meta_data: [
		{
			id: number
			key: string
			value: string
			display_key: string
			display_value: string
		}
	]
	sku: string
	price: number
	image: {
		id: number
		src: string
	}
	parent_name: string
	bundled_by: string
	bundled_item_title: string
	bundled_items: string[]
}

export interface SingleFee {
	id: number
	name: string
	tax_class: string
	tax_status: string
	amount: string
	total: string
	total_tax: string
	// taxes: []
	// meta_data: []
}

export interface SingleOrder {
	id: number
	parent_id: number
	status: string
	currency: string
	version: string
	prices_include_tax: boolean
	date_created: string
	date_modified: string
	subtotal: string
	discount_total: string
	discount_tax: string
	shipping_total: string
	shipping_tax: string
	cart_tax: string
	total: string
	total_tax: string
	customer_id: number
	order_key: string
	billing: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
		email: string
		phone: string
	}
	shipping: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
		phone: string
	}
	payment_method: string
	payment_method_title: string
	transaction_id: string
	customer_ip_address: string
	customer_user_agent: string
	created_via: string
	customer_note: string
	date_completed: null | string
	date_paid: string
	cart_hash: string
	number: string
	line_items: OrderItem[]
	fee_lines: SingleFee[]
	// coupon_lines
	shipping_lines: {
		id: number
		total: string
		method_id: string
		method_title: string
	}[]
}

export interface SingleSubscribe extends SingleOrder {
	billing_period: string
	billing_interval: string
}

export interface Address {
	first_name: string
	last_name: string
	company: string
	address_1: string
	address_2?: string
	city: string
	postcode: string
	country: string
	state: string
	email: string
	phone: string
}

export interface SingleCustomer {
	id: number
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	email: string
	first_name: string
	last_name: string
	role: string
	username: string
	billing: Address
	shipping: Address
	meta_data: {
		id: number
		key: string
		value: string
	}[]
}

export interface SingleNote {
	note: string
	date_created: string
	date_created_gmt: string
	customer_note: number
	author: string
	id: number
}
