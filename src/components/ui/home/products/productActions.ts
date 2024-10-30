'use server'

import { createSubcribe } from '@/configs/order.config'
import { Category, Tag } from '@/store/products/product.interface'
import {
	ICheckoutOrder,
	SubscribeCreate
} from '@/types/checkoutLayout.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import { cache } from 'react'

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
	consumerKey: process.env.WOO_USER_KEY || '',
	consumerSecret: process.env.WOO_USER_API_KEY || '',
	version: 'wc/v3'
})

export const getAllProducts = cache(async (per_page: number = 100) => {
	const response: { data: WooCommerceSingleProduct[] } = await api.get(
		'products',
		{
			per_page
		}
	)
	return {
		products: response.data
	}
})

export const getSingleProductBySlug = async (slug: string = '') => {
	const response = await api.get('products', {
		slug: slug
	})
	return response.data[0]
}

export const getProductTags = cache(async () => {
	const response: { data: Tag[] } = await api.get('products/tags')
	return response.data
})

export const getProductCategories = cache(async () => {
	const response: { data: Category[] } = await api.get('products/categories')
	return response.data
})

export const createOrder = async (orderData: ICheckoutOrder) => {
	try {
		const response = await api.post('orders', orderData)
		return response.data
	} catch (error) {
		console.error('Ошибка при создании заказа:', error)
		throw error
	}
}

export const getDiscountCodeAsync = async (discountName: string) => {
	try {
		const discountCode = await api
			.get(`coupons?search=${discountName}`)
			.then(res => res.data)
		return discountCode
	} catch (error) {
		console.error('Error fetching discount code:', error)
		return null
	}
}

export const createSubscribe = async (data: SubscribeCreate) => {
	try {
		const response = await api.post(createSubcribe, data)
		return response
	} catch (error) {
		console.error('Error creating subscribe:', error)
	}
}

export const updateOrderPaymentStatus = async (
	orderId: string,
	status: string
) => {
	try {
		const response = await api.put(`orders/${orderId}`, {
			status
		})
		return response
	} catch (error) {
		console.error('Error updating order payment status:', error)
	}
}

export const createCustomerSubscribeOrderWo = async (body: SubscribeCreate) => {
	try {
		const response = await api.post('subscriptions', body)
		return response
	} catch (error) {
		console.error('Error creating customer subscribe order:', error)
	}
}

export const updateSubscribePaymentStatus = async (
	orderId: string,
	status: string
) => {
	try {
		const response = await api.put(`subscriptions/${orderId}`, {
			status
		})
		return response
	} catch (error) {
		console.error('Error updating order payment status:', error)
	}
}

export const getAllProductsSearch = async (search: string) => {
	try {
		const response = await api.get(`products/?search=${search}&per_page=100`)
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
	}
}
