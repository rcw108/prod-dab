export interface QuantityLimits {
	minimum: number
	maximum: number
	multiple_of: number
	editable: boolean
}

export interface ItemImage {
	id: number
	src: string
	thumbnail: string
	srcset: string
	sizes: string
	name: string
	alt: string
}

export interface VariationItem {
	attribute: string
	value: string
}

export interface PriceItem {
	price: string
	regular_price: string
	sale_price: string
	price_range: string | null
	currency_code: string
	currency_symbol: string
	currency_minor_unit: number
	currency_decimal_separator: string
	currency_thousand_separator: string
	currency_prefix: string
	currency_suffix: string
	raw_prices: {
		precision: number
		price: string
		regular_price: string
		sale_price: string
	}
}

export interface TotalItem {
	line_subtotal: string
	line_subtotal_tax: string
	line_total: string
	line_total_tax: string
	currency_code: string
	currency_symbol: string
	currency_minor_unit: number
	currency_decimal_separator: string
	currency_thousand_separator: string
	currency_prefix: string
	currency_suffix: string
}

export interface WooCommerceCartItem {
	key: string
	id: number
	type: string
	quantity: number
	quantity_limits: QuantityLimits
	name: string
	short_description: string
	sku: string
	low_stock_remaining: null | number
	backorders_allowed: boolean
	show_backorder_badge: boolean
	sold_individually: boolean
	images: ItemImage[]
	variation: VariationItem[]
	// item_data: []
	prices: PriceItem
	totals: TotalItem
	catalog_visibility: string
	// extensions : {}
}

export interface TotalCart
	extends Pick<
		TotalItem,
		| 'currency_code'
		| 'currency_symbol'
		| 'currency_minor_unit'
		| 'currency_decimal_separator'
		| 'currency_thousand_separator'
		| 'currency_prefix'
		| 'currency_suffix'
	> {
	total_items: string
	total_items_tax: string
	total_fees: string
	total_fees_tax: string
	total_discount: string
	total_discount_tax: string
	total_shipping: null | string
	total_shipping_tax: null | string
	total_price: string
	total_tax: string
	// tax_lines: []
}

export interface ShippingAddress {
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

export interface BillingAddress extends ShippingAddress {
	email: string
}

export interface WooCommerceCart {
	items: WooCommerceCartItem[]
	// coupons: []
	// fees: []
	totals: TotalCart
	shipping_address: ShippingAddress
	billing_address: BillingAddress
	needs_payment: boolean
	needs_shipping: boolean
	payment_requirements: string[]
	has_calculated_shipping: boolean
	// shipping_rates: []
	items_count: number
	items_weight: number
	// cross_sells: []
	// errors: []
	// payment_methods: []
	// extensions: {}
}
