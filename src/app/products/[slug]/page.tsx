import BundleSinglePage from '@/components/screens/singleProduct/BundleSinglePage'
import SimpleSinglePage from '@/components/screens/singleProduct/SimpleSingle'
import VariableSinglePage from '@/components/screens/singleProduct/VariableSingle'
import { getSingleProductBySlug } from '@/components/ui/home/products/productActions'
import {
	bundleSingleProductUrl,
	simpleSingleProductUrl,
	variableSingleProductUrl
} from '@/configs/product.config'
import { BundleSingle } from '@/types/singleTemplates/bundleSingle.interface'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { VariableSingle } from '@/types/singleTemplates/variableSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
export const revalidate = 1800
const SingleProductPage: FC<{ params: { slug: string } }> = async ({
	params
}) => {
	const product: WooCommerceSingleProduct = await getSingleProductBySlug(
		params.slug
	)

	if (product.type !== 'variable' && product.type !== 'bundle') {
		const pageTemplate: SimpleSingle = await fetch(simpleSingleProductUrl)
			.then(res => res.json())
			.catch(err => console.log(err))
		return <SimpleSinglePage template={pageTemplate} data={product} />
	}
	if (product.type === 'variable') {
		const pageTemplate: VariableSingle = await fetch(variableSingleProductUrl)
			.then(res => res.json())
			.catch(err => console.log(err))
		return <VariableSinglePage template={pageTemplate} data={product} />
	}
	if (product.type === 'bundle') {
		const pageTemplate: BundleSingle = await fetch(bundleSingleProductUrl)
			.then(res => res.json())
			.catch(err => console.log(err))
		return <BundleSinglePage template={pageTemplate} data={product} />
	}
	if (!product) {
		return <div>Product not found</div>
	}
}
export default SingleProductPage
