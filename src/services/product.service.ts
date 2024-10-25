import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import axios from 'axios'

export const ProductService = {
	getAllProducts: async () => {
		return await axios.get<WooCommerceSingleProduct[]>(
			`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wc/v3/products/?per_page=100`
		)
	},

	getProductById: async (id: number) => {
		return await axios.get<WooCommerceSingleProduct>(
			`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wc/v3/products/${id}`
		)
	}
}
