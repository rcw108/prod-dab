import {
	pushAllProducts,
	pushCategories,
	pushTags,
	setPopularCategories
} from './products/product.slice'

import { addCartArray, addToCart, toggleCartProduct } from './cart/cart.slice'

import { logout, setUser, toggleAuthorize } from './user/user.slice'

export const allActions = {
	pushAllProducts,
	setPopularCategories,
	pushTags,
	pushCategories,
	toggleCartProduct,
	addToCart,
	addCartArray,
	setUser,
	logout,
	toggleAuthorize
}
