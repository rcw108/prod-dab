import { useEffect } from 'react'
import { useActions } from './useActions'
import { useCart } from './useCart'
import { useProducts } from './useProducts'

export const usePushCookieUserCart = () => {
	const { addToCart, pushAllProducts, addCartArray } = useActions()
	const { userCart, itemListCount } = useCart()
	const { products } = useProducts()
	useEffect(() => {
		localStorage.setItem('userCart', JSON.stringify(userCart))
		if (products) {
			if (itemListCount) {
				const productsList = products.filter(product =>
					itemListCount.find(item => item.id === product.id)
				)

				addCartArray(productsList)
			}
		}
	}, [products])
}
