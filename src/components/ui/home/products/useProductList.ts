import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { useState } from 'react'

export const useProductList = () => {
	const [activeTab, setActiveTab] = useState<'first' | 'second'>('first')
	const [firstCategoryList, setFirstCategoryList] = useState<
		WooCommerceSingleProduct[]
	>([])
	const [secondCategoryList, setSecondCategoryList] = useState<
		WooCommerceSingleProduct[]
	>([])

	const handleTabClick = () => {
		if (activeTab === 'first') {
			setActiveTab('second')
		} else {
			setActiveTab('first')
		}
	}

	return {
		activeTab,
		setFirstCategoryList,
		setSecondCategoryList,
		firstCategoryList,
		secondCategoryList,
		handleTabClick
	}
}
