import { getStoreLocal } from '@/utils/getStoreLocal'
import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './product.interface'

const initialState: InitialState = {
	products: getStoreLocal('products'),
	popularCategories: [],
	tags: getStoreLocal('tags'),
	categories: getStoreLocal('categories'),
	isLoading: false
}

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		pushAllProducts: (state, { payload }) => {
			localStorage.setItem('products', JSON.stringify(payload))
			console.log(payload)
			state.products = payload
		},
		setPopularCategories: (state, { payload }) => {
			state.popularCategories = payload
		},
		pushTags: (state, { payload }) => {
			state.tags = payload
		},
		pushCategories: (state, { payload }) => {
			state.categories = payload
		}
	}
})

export const {
	pushAllProducts,
	setPopularCategories,
	pushTags,
	pushCategories
} = productSlice.actions
export const { reducer } = productSlice
