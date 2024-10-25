import { API_URL } from '@/configs/api.config'
import { AuthService } from '@/services/auth.service'
import axios from 'axios'
import Cookies from 'js-cookie'
import { errorCatch, getContentType } from './api.heplers'

const base64BasicAuthToken = btoa(
	`${process.env.NEXT_PUBLIC_WOO_USER_KEY}:${process.env.NEXT_PUBLIC_WOO_USER_API_KEY}`
)

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: {
		...getContentType(),
		Authorization: `Basic ${base64BasicAuthToken}`
	}
})

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) ===
					'You are not authorized to access this endpoint.') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewToken()

				return instance.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'Signature verification failed') {
					Cookies.remove('accessToken')
					Cookies.remove('refreshToken')
				}
			}
		}

		throw error
	}
)

export default instance
