import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export const sortProductsByCategories = (
	category: string,
	products: WooCommerceSingleProduct[]
) => {
	const sortedProducts = products.filter(product =>
		product.categories.some(cat => cat.name == category)
	)

	return sortedProducts
}
