import { MoveLine } from './singleTemplates/simpleSingle.interface'

export interface Order {
	icon: string
	text: string
}

export interface CheckoutACF {
	top_bar_icon: string
	top_bar_text: string
	logotype: string
	marquee_line_repeater: MoveLine[]
	rating_image: string
	rating_text: string
	checkout_timer: string
	checkout_after_timer_text: string
	order_advantages: Order[]
	credit_card_image: {
		card_image: string
	}[]
}

export interface ICheckoutLayout {
	acf: CheckoutACF
}

export interface ICheckoutShippingValidate {
	products: {
		product_id: number
		quantity: number
		weight: number
	}[]
	destination_zip: string
	destination_country: string
	destination_state: string
}

export interface ICheckoutShippingValidateResponse {
	id: string
	label: string
	cost: string
}

export interface ICheckoutOrder {
	payment_method: string
	payment_method_title: string
	set_paid: false
	coupon_lines?: {
		code: string
	}[]
	billing: {
		first_name: string
		last_name: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
		email: string
		phone?: string
	}
	shipping: {
		first_name: string
		last_name: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
	}
	line_items: {
		product_id: number
		quantity: number
		price: number
	}[]
	shipping_lines: {
		method_id: string
		method_title: string
		total: string
	}[]
}

export interface ICreateTransactionRequest {
	createTransactionRequest: {
		merchantAuthentication: {
			name: string
			transactionKey: string
		}
		transactionRequest: {
			transactionType: string
			amount: string
			payment: {
				creditCard: {
					cardNumber: string
					expirationDate: string
					cardCode: string
				}
			}
			lineItems?: {
				lineItem?: {
					itemId?: string
					name?: string
					description?: string
					quantity?: string
					unitPrice?: string
				}[]
			}
			tax?: {
				amount: string
				name: string
				description: string
			}
			duty?: {
				amount: string
				name: string
				description: string
			}
			shipping?: {
				amount: string
				name: string
				description: string
			}
			poNumber?: string
			customer?: {
				id: string
			}
			billTo: {
				firstName: string
				lastName: string
				company?: string
				address: string
				city: string
				state: string
				zip: string
				country: string
			}
			shipTo?: {
				firstName: string
				lastName: string
				company?: string
				address: string
				city: string
				state: string
				zip: string
				country: string
			}
			customerIP?: string
			userFields?: {
				userField: {
					name: string
					value: string
				}[]
			}
		}
	}
}

export interface Discount {
	id: number
	code: string
	amount: string
	status: string
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	discount_type: string
	description: string
	date_expires: null | string
	date_expires_gmt: null | string
	usage_count: number
	individual_use: boolean
	product_ids: number[]
	excluded_product_ids: number[]
	usage_limit: number
	usage_limit_per_user: number
	limit_usage_to_x_items: null | string
	free_shipping: boolean
	product_categories: string[]
	excluded_product_categories: string[]
	exclude_sale_items: boolean
	minimum_amount: string
	maximum_amount: string
	email_restrictions: string[]
	used_by: string[]
}

export interface SubscribeCreate {
	customer_id?: number
	status: 'active' | 'on-hold' | 'cancelled' | 'pending'
	billing_period: string
	billing_interval: number
	start_date: string
	next_payment_date: string
	payment_method: 'authnet'
	payment_method_title: 'Credit Card'
	payment_details?: {
		post_meta: {
			[key: string]: string
		}
	}

	billing: {
		first_name: string
		last_name: string
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
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
	}
	line_items: {
		product_id: number
		variation_id?: number
		quantity: number
	}[]
	shipping_lines?: [
		{
			method_id: string
			method_title: string
			total: string
		}
	]
}

export interface AuthNetCreateSubscribe {
	ARBCreateSubscriptionRequest: {
		merchantAuthentication: {
			name: string
			transactionKey: string
		}
		refId?: string
		subscription: {
			name: 'Sample subscription'
			paymentSchedule: {
				interval: {
					length: string
					unit: string
				}
				startDate: string
				totalOccurrences: string
				trialOccurrences?: string
			}
			amount: string
			trialAmount?: string
			payment: {
				creditCard: {
					cardNumber: string
					expirationDate: string
					cardCode: string
				}
			}
			billTo: {
				firstName: string
				lastName: string
			}
		}
	}
}

export interface AuthSubRequestData {
	amount: string
	cardNumber: string
	expirationDate: string
	cardCode: string
	firstName: string
	lastName: string
	startDate: string
	interval: string
	unit: string
}

export interface AuthGetProfileRequestData {
	getCustomerProfileRequest: {
		merchantAuthentication: {
			name: string
			transactionKey: string
		}
		customerProfileId: number
		includeIssuerInfo: string
	}
}

export interface CreatePaymentMethod {
	customerProfileId: string
	cardNumber: string
	expirationDate: string
	cardCode: string
	billTo: {
		firstName: string
		lastName: string
		address: string
		city: string
		state: string
		zip: string
		country: string
		phoneNumber?: string
	}
}
