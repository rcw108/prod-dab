'use server'

import { API_URL } from '@/configs/api.config'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import axios from 'axios'
import {
	Address,
	AuthCustomer,
	RegistrationCustomer,
	SingleCustomer,
	SingleOrder,
	SingleSubscribe
} from './customer.interface'

const authRoute = `${API_URL}/woo/?rest_route=/auth/v1`

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
	consumerKey: process.env.WOO_USER_KEY || '',
	consumerSecret: process.env.WOO_USER_API_KEY || '',
	version: 'wc/v3'
})

export const createCustomer = async (data: RegistrationCustomer) => {
	try {
		const response = await api.post('customers', data)
		return { success: true, data: response.data }
	} catch (error: any) {
		if (error.response && error.response.data) {
			// WooCommerce API error
			return {
				success: false,
				error: {
					code: error.response.data.code,
					message: error.response.data.message
				}
			}
		} else {
			// Network or other error
			return {
				success: false,
				error: {
					code: 'unknown-error',
					message: 'An unexpected error occurred. Please try again.'
				}
			}
		}
	}
}

export const authCustomer = async (data: AuthCustomer) => {
	const reqBody: Partial<RegistrationCustomer> = {
		password: data.password
	}
	console.log(data)
	let path = `${authRoute}/auth&`
	if (data.login.includes('@')) {
		reqBody['email'] = data.login
		path = `${path}email`
	} else {
		reqBody['username'] = data.login
		path = `${path}username`
	}

	const response = await axios
		.post(`${path}=${data.login}&password=${data.password}`, reqBody)
		.then(res => res.data)

	return response
}

export const validateToken = async (token: string) => {
	try {
		const response = await axios
			.get(`${authRoute}/auth/validate&JWT=${token}`)
			.then(res => res.data.data)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const getSingleOrder = async (id: string) => {
	try {
		const response: { data: SingleOrder } = await api.get(`orders/${id}`)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export const getCustomerOrders = async (customerId: number) => {
	try {
		const response: { data: SingleOrder[] } = await api.get(
			`orders?customer=${customerId}`
		)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export const getCustomerSubscribes = async (customerId: number) => {
	try {
		const response: { data: SingleSubscribe[] } = await api.get(
			`subscriptions?customer=${customerId}`
		)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export const createSubscribeAuthnet = async (data: any) => {
	const dataA = {
		ARBCreateSubscriptionRequest: {
			merchantAuthentication: {
				name: process.env.AUTH_NET_NAME || '',
				transactionKey: process.env.AUTH_NET_KEY || ''
			},
			refId: '123456',
			subscription: {
				name: 'Sample subscription',
				paymentSchedule: {
					interval: {
						length: '1',
						unit: 'months'
					},
					startDate: '2020-08-30',
					totalOccurrences: '12',
					trialOccurrences: '1'
				},
				amount: '10.29',
				trialAmount: '0.00',
				payment: {
					creditCard: {
						cardNumber: '4111111111111111',
						expirationDate: '2025-12'
					}
				},
				billTo: {
					firstName: 'John',
					lastName: 'Smith'
				}
			}
		}
	}
}

export const getCustomerById = async (customerId: number) => {
	try {
		const response: { data: SingleCustomer } = await api.get(
			`customers/${customerId}`
		)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export const updateCustomerBillingAddress = async (
	data: { billing?: Partial<Address>; shipping?: Partial<Address> },
	id: number
) => {
	try {
		const response = await api.put(`customers/${id}`, data)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export interface UpdateOtherCustomerInfo {
	first_name: string
	last_name: string
	username: string
}

export const updateOtherCustomerInfo = async (
	data: UpdateOtherCustomerInfo,
	id: number
) => {
	try {
		const response = await api.put(`customers/${id}`, data)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export const changePasswordCustom = async (password: string, id: number) => {
	try {
		const data = {
			user_id: id,
			new_password: password
		}

		const response = await axios.post(
			`${API_URL}/wp-json/custom/v1/change-password`,
			data
		)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

export interface SetCustomerAuthorizeMetaData {
	meta_data: {
		id: number
		key: string
		value?: any
	}[]
}

export const setCustomerAuthorizeMetaData = async (
	data: SetCustomerAuthorizeMetaData,
	id: number
) => {
	try {
		const response = await api.put(`customers/${id}`, data)
		return { success: true, data: response.data }
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data || 'An unexpected error occurred.'
		}
	}
}

// Orders

export const cancelOrder = async (id: string) => {
	try {
		const response = await api.put(`orders/${id}`, {
			status: 'cancelled'
		})
		return { success: true, data: response }
	} catch (error) {
		console.log('Cancel order error', error)
		return {
			success: false,
			error
		}
	}
}

// Order notes

export const getOrderNotesByOrderId = async (id: number) => {
	try {
		const response = await api.get(`orders/${id}/notes`)
		return { success: true, data: response.data }
	} catch (error) {
		return {
			success: false,
			error: 'An unexpected error occurred.'
		}
	}
}
