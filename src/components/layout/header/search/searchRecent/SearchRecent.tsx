'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useActions } from '@/hooks/useActions'
import { useCartContext } from '@/providers/CartContextProvider'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SearchRecent.module.scss'

const SearchRecent: FC<{ product: WooCommerceSingleProduct }> = ({
	product
}) => {
	const { addToCart } = useActions()

	const { openCart, setOpenCart } = useCartContext()

	const handleClickSimple = () => {
		setOpenCart(true)
		addToCart({
			name: product.name,
			id: product.id,
			price:
				product.sale_price !== '' ? product.sale_price : product.regular_price,
			count: 1,
			type: 'simple',
			paymentType: 'one-time',
			itemImage: product.images[0].src
		})
	}

	return (
		<div className={styles.item}>
			<div>
				{product.images[0] && (
					<Link href={`/products/${product.slug}`} className={styles.img}>
						<Image
							src={product.images[0].src}
							alt={product.name}
							width={211}
							height={211}
						/>
					</Link>
				)}
				<div className={styles.categories}>
					{product.categories.map((category, index) => (
						<>
							<SmallHeading
								className={styles.catItem}
								key={index + category.name + category.id + Math.random()}
								title={category.name}
							/>
							{index !== product.categories.length - 1 && <span>, </span>}
						</>
					))}
				</div>
				<Link href={`/products/${product.slug}`} className={styles.name}>
					{ReactHtmlParser(product.name)}
				</Link>
				<Description
					className={styles.price}
					title={ReactHtmlParser(product.price_html)}
				/>
			</div>
			{product.type !== 'simple' ? (
				<Link className={styles.btn} href={`/products/${product.slug}`}>
					Select options
				</Link>
			) : (
				<button onClick={handleClickSimple} className={styles.btn}>
					Add to cart
				</button>
			)}
		</div>
	)
}

export default SearchRecent
