import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export const lowToHigh = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return +a.price - +b.price
	})
	return sortedProducts
}

export const highToLow = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return +b.price - +a.price
	})

	return sortedProducts
}

export const bestSelling = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return b.total_sales - a.total_sales
	})

	return sortedProducts
}

export const latestCreated = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return (
			new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
		)
	})
	return sortedProducts
}

export const averageRating = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return +b.average_rating - +a.average_rating
	})
	return sortedProducts
}

export const getTotalAvailableProducts = (
	products: WooCommerceSingleProduct[]
) => {
	let stock: number = 0
	let outOfStock: number = 0

	products.forEach(product => {
		if (product.status === 'private') return
		if (product.catalog_visibility === 'hidden') return
		if (product.stock_status === 'instock') {
			stock++
		} else {
			outOfStock++
		}
	})

	return { stock, outOfStock }
}

export const sortAvailable = (
	products: WooCommerceSingleProduct[],
	variant: string
) => {
	const sortedProducts = products
		.filter(product => product.stock_status === variant) // Убираем undefined
		.map(product => product as WooCommerceSingleProduct) // Явно указываем тип

	return sortedProducts
}

export const filterByTag = (
	products: WooCommerceSingleProduct[],
	tag: string
) => {
	return tag
		? products.filter(product => product?.tags?.some(t => t.name === tag))
		: products
}

export const filterByVibe = (
	products: WooCommerceSingleProduct[],
	vibe: string
) => {
	return vibe
		? products.filter(product => product?.vibe?.some(t => t.name === vibe))
		: products
}

export const filterByCategory = (
	products: WooCommerceSingleProduct[],
	category: string
) => {
	return category
		? products.filter(product =>
				product?.categories?.some(c => c.name === category)
			)
		: products
}
