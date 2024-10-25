import axios from '@/api/interceptor'
import { userInformationUrl } from '@/configs/user.config'
import { User } from '@/types/user.interface'

export const UserService = {
	async getCurrentUser(token: string) {
		return axios.get<User>(`${userInformationUrl}&JWT=${token}`)
	}
}
