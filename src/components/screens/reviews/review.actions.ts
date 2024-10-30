'use server'

import { Stamped } from '@/types/stamped.interface'
import axios from 'axios'

type CachedReviews = {
	data: Stamped
	timestamp: number
}

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 часа в миллисекундах
const reviewsCache: Map<number, CachedReviews> = new Map()

export const getReviews = async (page: number = 1): Promise<Stamped | null> => {
	const now = Date.now()

	// Проверяем, есть ли кэш для запрашиваемой страницы и не истек ли срок его действия
	const cached = reviewsCache.get(page)
	if (cached && now - cached.timestamp < CACHE_DURATION) {
		return cached.data
	}

	const url = `${process.env.NEXT_PUBLIC_REVIEWS_API_URL}/${process.env.REVIEWS_SHOP_ID}/dashboard/reviews?page=${page}`

	const publicKey = process.env.REVIEWS_PUBLIC_KEY || ''
	const privateKey = process.env.REVIEWS_PRIVATE_KEY || ''
	const encodedCredentials = Buffer.from(`${publicKey}:${privateKey}`).toString(
		'base64'
	)

	try {
		const response: { data: Stamped } = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${encodedCredentials}`
			}
		})
		if (response.data) {
			// Сохраняем данные в кэш
			reviewsCache.set(page, { data: response.data, timestamp: now })
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.log('Error get Reviews', error)
		return null
	}
}
