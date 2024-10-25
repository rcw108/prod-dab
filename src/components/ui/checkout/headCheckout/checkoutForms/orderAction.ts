'use server'

import {
	createOrder,
	getDiscountCodeAsync,
	updateOrderPaymentStatus
} from '@/components/ui/home/products/productActions'
import {
	CreateCustomerPaymentProfileBody,
	UpdateCustomerProfileByIdDataBody
} from '@/types/authorize.interface'
import {
	AuthNetCreateSubscribe,
	AuthSubRequestData,
	CreatePaymentMethod,
	ICheckoutOrder,
	ICreateTransactionRequest
} from '@/types/checkoutLayout.interface'
import axios from 'axios'

const sendTransactionRequest = async (
	transactionData: ICreateTransactionRequest
) => {
	try {
		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			transactionData,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		return response.data
	} catch (error) {
		console.error('Error sending transaction request:', error)
		throw new Error('Transaction request failed')
	}
}

// Функция создания ордера
export const handleCreateOrder = async (
	orderData: ICheckoutOrder,
	cardData: {
		creditCard: {
			cardNumber: string
			expirationDate: string
			cardCode: string
			total: number
		}
	},
	shippingData: {
		shipping: {
			label: string
			cost: string
		}
	}
) => {
	const transactionData: ICreateTransactionRequest = {
		createTransactionRequest: {
			merchantAuthentication: {
				name: process.env.AUTH_NET_NAME || '',
				transactionKey: process.env.AUTH_NET_KEY || ''
			},
			transactionRequest: {
				transactionType: 'authCaptureTransaction',
				amount: String(cardData.creditCard.total), // Сумма заказа
				payment: {
					creditCard: {
						cardNumber: cardData.creditCard.cardNumber, // Данные можно получать из формы оплаты
						expirationDate: cardData.creditCard.expirationDate,
						cardCode: cardData.creditCard.cardCode
					}
				},
				lineItems: {
					lineItem: orderData.line_items.map(item => ({
						itemId: String(item.product_id),
						name: String(item.product_id),
						quantity: String(item.quantity),
						unitPrice: String(item.price)
					}))
				},
				shipping: {
					amount: shippingData.shipping.cost,
					name: shippingData.shipping.label,
					description: shippingData.shipping.label
				},
				billTo: {
					firstName: orderData.billing.first_name,
					lastName: orderData.billing.last_name,
					company: orderData.billing.address_2,
					address: orderData.billing.address_1,
					city: orderData.billing.city,
					state: orderData.billing.state,
					zip: orderData.billing.postcode,
					country: orderData.billing.country
				},
				shipTo: {
					firstName: orderData.shipping.first_name,
					lastName: orderData.shipping.last_name,
					company: orderData.shipping.address_2,
					address: orderData.shipping.address_1,
					city: orderData.shipping.city,
					state: orderData.shipping.state,
					zip: orderData.shipping.postcode,
					country: orderData.shipping.country
				}
			}
		}
	}

	try {
		const order = await createOrder(orderData)
		console.log(123123123, order)
		console.log('Order created successfully:', order)
		try {
			const transactionResponse = await sendTransactionRequest(transactionData)
			console.log(222222222222222, transactionResponse.messages)
			if (transactionResponse.transactionResponse.responseCode === '2') {
				const res = await updateOrderPaymentStatus(order.id, 'failed')
				console.log(res)
			}
			if (transactionResponse.transactionResponse.responseCode === '1') {
				const res = await updateOrderPaymentStatus(order.id, 'processing')
				console.log(res)
			}
			if (transactionResponse.transactionResponse.responseCode === '4') {
				const res = await updateOrderPaymentStatus(order.id, 'processing')
				console.log(res)
			}
			if (transactionResponse.transactionResponse.responseCode === '3') {
				const res = await updateOrderPaymentStatus(order.id, 'failed')
				console.log(res)
			}
			return { order, transactionResponse }
		} catch (error) {
			console.log('Error sending transaction response:', error)
		}
	} catch (error) {
		console.error('Error creating order:', error)
		throw new Error('Order creation failed')
	}
}

export const getDiscountCode = async (discountName: string) => {
	const res = await getDiscountCodeAsync(discountName)
	return res
}

// Profile

export const createCustomerPaymentProfile = async (
	data: CreateCustomerPaymentProfileBody
) => {
	try {
		const requestBody = {
			createCustomerPaymentProfileRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				customerProfileId: data.customerProfileId,
				paymentProfile: {
					billTo: data.paymentProfile.billTo,
					payment: data.paymentProfile.payment,
					defaultPaymentProfile: data.paymentProfile.defaultPaymentProfile
				},
				validationMode: 'liveMode'
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error creating customer payment profile:', error)
	}
}

// export const createCustomerProfile = async (
// 	data: CreateCustomerProfileBody,
// 	profileId: number
// ) => {
// 	try {
// 		const requestBody = {
// 			createCustomerProfileRequest: {
// 				merchantAuthentication: {
// 					name: process.env.AUTH_NET_NAME || '',
// 					transactionKey: process.env.AUTH_NET_KEY || ''
// 				},
// 				profile: {
// 					merchantCustomerId: data.profile.merchantCustomerId,
// 					description: data.profile.description,
// 					email: data.profile.email,
// 					paymentProfiles: {
// 						customerType: data.profile.paymentProfiles.customerType,
// 						payment: {
// 							creditCard: {
// 								cardNumber: data.profile.paymentProfiles.creditCard.cardNumber,
// 								expirationDate: data.profile.paymentProfiles.creditCard
// 							}
// 						}
// 					}
// 				},
// 				validationMode: 'liveMode'
// 			}
// 		}

// 		const response = await axios.post(
// 			'https://api2.authorize.net/xml/v1/request.api',
// 			requestBody,
// 			{
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			}
// 		)

// 		if (response.data.messages.resultCode === 'Ok') {
// 			const updateMetaDataCustomerProfile = await setCustomerAuthorizeMetaData(
// 				{
// 					meta_data: {
// 						id: 513990,
// 						key: '_authnet_customer_id',
// 						value: String(response.data.customerProfileId)
// 					}
// 				},
// 				profileId
// 			)
// 		}
// 	} catch (error) {
// 		console.error('Error creating customer profile:', error)
// 	}
// }

export const getCustomerProfileById = async (id: number) => {
	try {
		const requestBody = {
			getCustomerProfileRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				customerProfileId: id,
				includeIssuerInfo: 'true'
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error getting customer profile:', error)
	}
}

export const updateCustomerProfileById = async (
	id: string,
	data: UpdateCustomerProfileByIdDataBody
) => {
	try {
		const requestBody = {
			updateCustomerProfileRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				profile: {
					merchantCustomerId: data.profile.merchantCustomerId,
					description: data.profile.description,
					email: data.profile.email,
					customerProfileId: id
				}
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error updating customer profile:', error)
	}
}

export const deleteCustomerPaymentProfileById = async (
	idProfile: string,
	idPaymentProfile: string
) => {
	try {
		const requestBody = {
			deleteCustomerPaymentProfileRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				customerProfileId: idProfile,
				customerPaymentProfileId: idPaymentProfile
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error deleting customer payment profile:', error)
	}
}

// Subscribe

export const createSubscribeAuthNet = async (data: AuthSubRequestData) => {
	try {
		const requestData: AuthNetCreateSubscribe = {
			ARBCreateSubscriptionRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				subscription: {
					name: 'Sample subscription',
					paymentSchedule: {
						interval: {
							length: data.interval,
							unit: data.unit
						},
						startDate: data.startDate,
						totalOccurrences: '9999'
					},
					amount: data.amount,
					payment: {
						creditCard: {
							cardNumber: data.cardNumber,
							expirationDate: data.expirationDate,
							cardCode: data.cardCode
						}
					},
					billTo: {
						firstName: data.firstName,
						lastName: data.lastName
					}
				}
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestData,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error creating subscribe:', error)
	}
}

export const getSubscribeCustomerProfile = async (id: string) => {
	try {
		const requestBody = {
			ARBGetSubscriptionRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				subscriptionId: id,
				includeTransactions: true
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error getting subscribe:', error)
	}
}

export const deleteSubscribeCustomer = async (id: string) => {
	try {
		const requestBody = {
			ARBCancelSubscriptionRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				subscriptionId: id
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error deleting subscribe:', error)
	}
}

export const createSubscribeAuthNetWithProfile = async (
	data: AuthSubRequestData,
	profile: { profileId: string; paymentProfileId: string }
) => {
	try {
		const requestBody = {
			ARBCreateSubscriptionRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				subscription: {
					name: 'Sample subscription',
					paymentSchedule: {
						interval: {
							length: data.interval,
							unit: data.unit
						},
						startDate: data.startDate,
						totalOccurrences: '9999'
					},
					amount: data.amount,
					profile: {
						customerProfileId: profile.profileId,
						customerPaymentProfileId: profile.paymentProfileId
					}
				}
			}
		}
		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error creating subscribe with user:', error)
	}
}

export const createPaymentMethodAuthNet = async (data: CreatePaymentMethod) => {
	try {
		const requestBody = {
			createCustomerPaymentProfileRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				customerProfileId: data.customerProfileId,
				paymentProfile: {
					billTo: data.billTo,
					payment: {
						creditCard: {
							cardNumber: data.cardNumber,
							expirationDate: data.expirationDate,
							cardCode: data.cardCode
						}
					},
					defaultPaymentProfile: false
				},
				validationMode: 'liveMode'
			}
		}
		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error creating payment method:', error)
	}
}
