import axios from '@/api/interceptor'
import { refreshTokenUrl, validateTokenUrl } from '@/configs/auth.config'
import { RefreshResponse, ValidateUserResponse } from '@/types/user.interface'
import Cookies from 'js-cookie'

export const AuthService = {
	async getNewToken() {
		const accessToken = Cookies.get('accessToken')

		return await axios.post<RefreshResponse>(
			`${refreshTokenUrl}&JWT=${accessToken}`,
			{}
		)
	},

	async validateToken(token: string) {
		return axios.get<ValidateUserResponse>(`${validateTokenUrl}&JWT=${token}`)
	}

	/* 
		registerUser
	*/
}
