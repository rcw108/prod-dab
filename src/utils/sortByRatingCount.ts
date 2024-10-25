import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export const sortByRatingCount = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = products.sort((a, b) => {
		return b.rating_count - a.rating_count
	})

	return sortedProducts
}
