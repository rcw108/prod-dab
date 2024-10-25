'use client'

import SmallHeading from '@/components/ui/headings/SmallHeading'
import FormSection from '@/components/ui/home/formSection/FormSection'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { NotFoundPage } from '@/types/errorPage.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './NotFound.module.scss'
import NotFoundItem from './notFoundItem/NotFoundItem'

const NotFound: FC<{
	data: NotFoundPage
	products: WooCommerceSingleProduct[]
}> = ({ data, products }) => {
	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	const sortedProducts = products.sort((a, b) => b.total_sales - a.total_sales)

	return (
		<main className='bg-white pt-10'>
			<div className='container'>
				<div className={styles.bread}>
					<Link href='/'>Home</Link>
					<span> / </span>
					<h6>Error 404</h6>
				</div>
				<div className={styles.top}>
					{ReactHtmlParser(data.content.rendered)}
				</div>
				<div className={styles.products}>
					<SmallHeading className={styles.title} title={'Popular Products'} />
					<div className={styles.wrap}>
						{sortedProducts.slice(0, 8).map((product, index) => (
							<NotFoundItem key={index} product={product} />
						))}
					</div>
				</div>
			</div>
			<FormSection
				background_image_form={data.acf.background_image_form}
				form_description={data.acf.form_description}
				form_title={data.acf.form_title}
				className={styles.form}
			/>
		</main>
	)
}

export default NotFound
