import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export interface Tag {
	id: number
	name: string
	slug: string
	description: string
	count: number
}

export interface Category {
	id: number
	name: string
	slug: string
	count: number
	parent: number
	display: string
}

export interface Vibe {
	id: number
	name: string
	slug: string
	count: number
}

export interface InitialState {
	products: WooCommerceSingleProduct[] | null
	isLoading: boolean
	popularCategories: string[]
	tags: Tag[] | null
	categories: Category[] | null
}
