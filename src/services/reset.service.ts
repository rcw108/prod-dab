import { API_URL } from '@/configs/api.config'
import axios from 'axios'

export const ResetServices = {
	sendLinkToResetPassword: async (username_or_email: string) => {
		return await axios
			.post(
				`${API_URL}/wp-json/custom/v1/send-password-reset`,
				{
					username_or_email
				},
				{ withCredentials: true }
			)
			.then(res => res.data)
	},

	validateTokenFromEmail: async (login: string, key: string) => {
		return await axios
			.post(`${API_URL}/wp-json/custom/v1/verify-reset-token`, { login, key })
			.then(res => res.data)
	},

	changePasswordAfterValidate: async (
		login: string,
		key: string,
		new_password: string
	) => {
		return await axios
			.post(`${API_URL}/wp-json/custom/v1/reset-password`, {
				login,
				key,
				new_password
			})
			.then(res => res.data)
	}
}
