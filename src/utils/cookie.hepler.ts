import { InitialUser } from '@/store/user/user.interface'
import Cookies from 'js-cookie'

export const saveCartToCookie = (
	cartCountList: { id: number; count: number }[]
) => {
	const cartCountListString = JSON.stringify(cartCountList)

	Cookies.set('cartCountList', cartCountListString, {
		sameSite: 'None',
		secure: true
	})
}

export const getCookieDataCart = (name: string) => {
	const cookie = Cookies.get(name)
	if (cookie) {
		return JSON.parse(cookie)
	}
	return []
}

export const saveUserToCookie = (user: InitialUser) => {
	Cookies.set('user', JSON.stringify(user), {
		sameSite: 'None',
		secure: true
	})
}

export const removeUserToCookie = () => {
	Cookies.remove('user')
}

export const getUserFromCookie = () => {
	const cookie = Cookies.get('user')
	console.log(cookie)
	if (cookie) {
		const res = JSON.parse(cookie)
		return res.user
	}
	return null
}
