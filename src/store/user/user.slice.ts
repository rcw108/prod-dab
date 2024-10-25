import {
	getUserFromCookie,
	removeUserToCookie,
	saveUserToCookie
} from '@/utils/cookie.hepler'
import { createSlice } from '@reduxjs/toolkit'
import { InitialUser } from './user.interface'

const initialState: InitialUser = {
	user: getUserFromCookie(),
	jwt: '',
	authorize: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: { payload: InitialUser }) {
			console.log(payload)
			state.user = payload.user
			state.jwt = payload.jwt
			saveUserToCookie(state)
		},
		logout(state) {
			state.user = null
			state.jwt = ''
			state.authorize = null
			removeUserToCookie()
		},
		toggleAuthorize(
			state,
			{ payload }: { payload: Pick<InitialUser, 'authorize'> }
		) {
			state.authorize = payload.authorize
		}
	}
})

export const { setUser, logout, toggleAuthorize } = userSlice.actions
export const { reducer } = userSlice
