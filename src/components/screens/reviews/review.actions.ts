'use server'

import { Stamped } from '@/types/stamped.interface'
import axios from 'axios'

export const getReviews = async (page: number = 1) => {
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
		return response.data
	} catch (error) {
		console.log('Error get Reviews', error)
	}
}
