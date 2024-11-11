import Shop from '@/components/screens/shop/Shop'
import {
	getProductCategories,
	getProductTags,
	getProductVibes
} from '@/components/ui/home/products/productActions'
import { shopPageUrl } from '@/configs/page.config'
import { IShopPage } from '@/types/shopPage.interface'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

const fetchShopData = async () => {
	const response: IShopPage = await fetch(
		`${shopPageUrl}?acf_format=standard`
	).then(res => res.json())

	return response
}

export const metadata = {
	title: 'Shop - DABPENS'
}

const ShopPage: FC = async () => {
	const categories = await getProductCategories()
	const tags = await getProductTags()
	const vibes = await getProductVibes()

	const data = await fetchShopData()

	return (
		<>
			{data && categories && tags && vibes && (
				<Shop categories={categories} tags={tags} data={data} vibes={vibes} />
			)}
		</>
	)
}

export default ShopPage
