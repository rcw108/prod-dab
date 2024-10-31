/* eslint-disable @next/next/no-img-element */
'use client'

import FormSection from '@/components/ui/home/formSection/FormSection'
import ReviewsContent from '@/components/ui/reviews/reviewsContent/ReviewsContent'
import ShopContent from '@/components/ui/shop/shopContent/ShopContent'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { Category, Tag } from '@/store/products/product.interface'
import { IShopPage } from '@/types/shopPage.interface'
import { Vibe, WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import { FC, Suspense, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './Shop.module.scss'

interface IShop {
	products: WooCommerceSingleProduct[]
	data: IShopPage
	tags: Tag[]
	categories: Category[]
	vibes: Vibe[]
}

const Shop: FC<IShop> = ({ data, products, categories, tags, vibes }) => {
	const { pushAllProducts, pushCategories, pushTags } = useActions()
	const {
		products: allProducts,
		categories: allCategories,
		tags: allTags
	} = useProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [])

	usePushCookieUserCart()

	useEffect(() => {
		if (allCategories) return
		pushCategories(categories)
	}, [])

	useEffect(() => {
		if (allTags) return
		pushTags(tags)
	}, [])

	return (
		<main className='bg-black'>
			{/* <ShopHead
				bg_image_head={data.acf.bg_image_head}
				description_head={data.acf.description_head}
				marquee_head={data.acf.marquee_head}
				marquee_bg_head={data.acf.marquee_bg_head}
				rate_star_image={data.acf.rate_star_image}
				rate_stars_description={data.acf.rate_stars_description}
				title_head={data.acf.title_head}
			/> */}
			<div className={styles.newHead}>
				<Image
					className={styles.desk}
					src={data.acf.image_new_head}
					alt='shop'
					draggable={false}
					fill
				/>
				<Image
					className={styles.mob}
					src={data.acf.image_new_head_mobile}
					alt='shop'
					draggable={false}
					fill
				/>
			</div>
			<div className={styles.contentBlock}>
				{ReactHtmlParser(data.content.rendered)}
			</div>
			<div className={styles.shop}>
				<Suspense>
					<ShopContent
						categories={categories}
						tags={tags}
						products={products}
						vibes={vibes}
						bundle_section_image={data.acf.bundle_section_image}
						cartridges_section_image={data.acf.cartridges_section_image}
						disposables_section_image={data.acf.disposables_section_image}
						gummy_section_image={data.acf.gummy_section_image}
					/>
				</Suspense>
			</div>
			{/* <MarqueeLineSection
				marquee_line_bg={data.acf.marquee_line_bg}
				marquee_line_repeater={data.acf.marquee_line_repeater}
			/> */}
			{/* <ReviewsSectionShop
				title_review={data.acf.title_review}
				reviews_repeater={data.acf.reviews_repeater}
				subtitle_review={data.acf.subtitle_review}
			/> */}
			<ReviewsContent
				className='bg-black'
				classNameText='text-white'
				classNameTitle={styles.titleContentShop}
				classNamePag={styles.paginationShop}
			/>
			<FormSection
				background_image_form={data.acf.form_bg}
				form_description={data.acf.form_description}
				form_title={data.acf.form_title}
			/>
		</main>
	)
}

export default Shop
