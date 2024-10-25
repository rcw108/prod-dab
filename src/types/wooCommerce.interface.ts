export interface Dimensions {
	length: string
	width: string
	height: string
}

export interface Category {
	id: number
	name: string
	slug: string
}

export interface Tag {
	id: number
	name: string
	slug: string
}

export interface Image {
	id: number
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	src: string
	name: string
	alt: string
}

export interface Meta {
	id: number
	key: string
	value: string | string[] | number[]
}

export interface BundledItem {
	bundled_item_id: number
	product_id: number
	menu_order: number
	quantity_min: number
	quantity_max: string
	quantity_default: number
	priced_individually: boolean
	shipped_individually: boolean
	override_title: boolean
	title: string
	override_description: boolean
	description: string
	optional: boolean
	hide_thumbnail: boolean
	discount: string
	override_variations: boolean
	// allowed_variations: []
	override_default_variation_attributes: boolean
	// default_variation_attributes: []
	single_product_visibility: string
	cart_visibility: string
	order_visibility: string
	single_product_price_visibility: string
	cart_price_visibility: string
	order_price_visibility: string
	stock_status: 'in_stock' | 'out_of_stock'
}

export interface BundleInterface {
	bundled_by: string[]
	bundle_stock_status: string
	bundle_stock_quantity: number
	bundle_virtual: boolean
	bundle_layout: string
	bundle_add_to_cart_form_location: string
	bundle_editable_in_cart: boolean
	bundle_sold_individually_context: string
	bundle_item_grouping: string
	bundle_min_size: number
	bundle_max_size: number
	bundle_price: {
		price: {
			min: {
				incl_tax: string
				excl_tax: string
			}
			max: {
				incl_tax: string
				excl_tax: string
			}
		}
		regular_price: {
			min: {
				incl_tax: string
				excl_tax: string
			}
			max: {
				incl_tax: string
				excl_tax: string
			}
		}
	}
	bundled_items: BundledItem[]
}

export interface SingleProductACF {
	rate_image: string
	rate_text: string
	title_de: string
	text_de: string
	title_subs: string
	text_subs: string
	title_ad: string
	text_ad: string
	title_sp: string
	text_sp: string
	star_image: string
	author: string
	review_text: string
	info_repeater: {
		title: string
		text: string
	}[]
	chart_image: string | boolean
}

export interface AttributesVar {
	id: number
	name: string
	slug: string
	position: number
	visible: boolean
	variation: boolean
	options: string[]
}

export interface WooCommerceSingleProduct extends BundleInterface {
	id: number
	name: string
	slug: string
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	type: string
	status: string
	featured: boolean | string
	catalog_visibility: string
	description: string
	short_description: string
	sku: string
	price: string
	regular_price: string
	sale_price: string
	date_on_sale_from: string
	date_on_sale_from_gmt: string
	date_on_sale_to: string
	date_on_sale_to_gmt: string
	on_sale: boolean
	purchasable: boolean
	total_sales: number
	virtual: boolean
	external_url: string
	button_text: string
	manage_stock: boolean
	stock_quantity: number
	in_stock: boolean
	backorders: string
	backorders_allowed: boolean
	backordered: boolean
	sold_individually: boolean
	weight: string
	dimensions: Dimensions
	shipping_required: boolean
	shipping_taxable: boolean
	shipping_class: string
	shipping_class_id: number
	reviews_allowed: boolean
	average_rating: string
	rating_count: number
	upsell_ids: number[]
	cross_sell_ids: number[]
	parent_id: number
	purchase_note: string
	categories: Category[]
	tags: Tag[]
	images: Image[]
	attributes: AttributesVar[]
	// default_attributes: []
	variations: number[]
	// grouped_products: []
	menu_order: number
	price_html: string
	related_ids: number[]
	meta_data: Meta[]
	stock_status: string
	has_options: boolean
	post_password: string
	acf: SingleProductACF
}
