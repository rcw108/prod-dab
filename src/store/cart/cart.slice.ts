import { getCookieDataCart, saveCartToCookie } from '@/utils/cookie.hepler'
import { getStoreLocal } from '@/utils/getStoreLocal'
import { createSlice } from '@reduxjs/toolkit'
import { InitialState, ItemListCount } from './cart.interface'

const initialState: InitialState = {
	userCart: getStoreLocal('userCart') || [],
	itemListCount: getCookieDataCart('cartCountList')
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCartArray: (state, { payload }) => {
			state.userCart = payload
		},

		toggleCartProduct: (state, { payload }: { payload: ItemListCount }) => {
			const countListItem = state.itemListCount.find(
				item => item.id === payload.id
			)

			if (countListItem) {
				const countIndex = state.itemListCount.indexOf(countListItem)
				state.itemListCount.splice(countIndex, 1)
				saveCartToCookie(state.itemListCount)
			} else {
				state.itemListCount.push({
					id: payload.id,
					count: payload.count,
					price: payload.price,
					paymentType: payload.paymentType,
					type: payload.type,
					name: payload.name,
					subscriptionPeriod: payload.subscriptionPeriod,
					subscriptionPrice: payload.subscriptionPrice,
					variableItems: payload.variableItems,
					bundleItems: payload.bundleItems,
					itemImage: payload.itemImage
				})
				saveCartToCookie(state.itemListCount)
			}
			saveCartToCookie(state.itemListCount)
		},

		addToCart: (state, { payload }: { payload: ItemListCount }) => {
			const itemListCart = state.itemListCount.find(
				item => item.id === payload.id
			)

			if (!itemListCart) {
				state.itemListCount.push({
					id: payload.id,
					count: payload.count,
					price: payload.price,
					paymentType: payload.paymentType,
					type: payload.type,
					name: payload.name,
					bundleItems: payload.bundleItems,
					variableItems: payload.variableItems,
					subscriptionPeriod: payload.subscriptionPeriod,
					subscriptionPrice: payload.subscriptionPrice,
					itemImage: payload.itemImage
				})
				saveCartToCookie(state.itemListCount)
			}

			if (itemListCart) {
				itemListCart.count += payload.count
				saveCartToCookie(state.itemListCount)
			}
			saveCartToCookie(state.itemListCount)
		}
	}
})

export const { toggleCartProduct, addToCart, addCartArray } = cartSlice.actions
export const { reducer } = cartSlice
