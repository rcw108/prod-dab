import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export interface UserSingleProductCartWithCount
	extends WooCommerceSingleProduct {
	count: number
	type: 'simple' | 'variable' | 'bundle'
	paymentType: 'one-time' | 'subscription'
	subscriptionPeriod?: string
	subscriptionPrice?: number
	variableItems?: VariableItem
	bundleItems?: BundleItem[]
}

export interface BundleItem {
	id: number
	count: number
	name: string
	stock?: string
	stock_count: number
}

export interface VariableItem {
	id: number
	name: string
}

export interface ItemListCount {
	id: number
	count: number
	price: string
	name: string
	type: 'simple' | 'variable' | 'bundle'
	paymentType: 'one-time' | 'subscription'
	subscriptionPeriod?: string
	subscriptionPrice?: number
	variableItems?: VariableItem
	bundleItems?: BundleItem[]
	itemImage: string
}

export interface InitialState {
	userCart: UserSingleProductCartWithCount[]
	itemListCount: ItemListCount[]
}
