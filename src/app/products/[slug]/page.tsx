import { FC } from 'react'
// export const revalidate = 1800
const SingleProductPage: FC<{ params: { slug: string } }> = ({ params }) => {
	return <div>Bundle</div>
	// if (!params || !params.slug) {
	// 	console.error('Slug is not defined')
	// 	return <div>Error: Slug is not defined</div>
	// }
	// const product: WooCommerceSingleProduct = await getSingleProductBySlug(
	// 	params.slug
	// )
	// console.log(product)

	// if (product.type !== 'variable' && product.type !== 'bundle') {
	// 	const pageTemplate: SimpleSingle = await fetch(simpleSingleProductUrl)
	// 		.then(res => res.json())
	// 		.catch(err => console.log(err))
	// 	console.log(pageTemplate)
	// 	return <SimpleSinglePage template={pageTemplate} data={product} />
	// }
	// if (product.type === 'variable') {
	// 	const pageTemplate: VariableSingle = await fetch(variableSingleProductUrl)
	// 		.then(res => res.json())
	// 		.catch(err => console.log(err))
	// 	console.log(pageTemplate)
	// 	return <VariableSinglePage template={pageTemplate} data={product} />
	// }
	// if (product.type === 'bundle') {
	// 	return <div>Bundle</div>
	// 	const pageTemplate: BundleSingle = await fetch(bundleSingleProductUrl)
	// 		.then(res => res.json())
	// 		.catch(err => console.log(err))
	// 	console.log(pageTemplate)
	// 	return <BundleSinglePage template={pageTemplate} data={product} />
	// }
	// if (!product) {
	// 	return <div>Product not found</div>
	// }
}
export default SingleProductPage
