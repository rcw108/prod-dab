'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useActions } from '@/hooks/useActions'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SelectUnlock.module.scss'

const SelectUnlock: FC<{
	products: WooCommerceSingleProduct[]
}> = ({ products }) => {
	const [selectProduct, setSelectProduct] = useState<WooCommerceSingleProduct>(
		products[0]
	)

	const { addToCart } = useActions()

	const handleAddProduct = () => {
		addToCart({
			id: selectProduct.id,
			count: 1,
			price: selectProduct.price,
			paymentType: 'one-time',
			type: 'simple',
			name: selectProduct.name,
			itemImage: selectProduct.images[0].src
		})
	}

	return (
		<div className={styles.select}>
			<div className='flex items-center'>
				<div className={styles.img}>
					<Image
						src={selectProduct.images[0].src}
						alt={selectProduct.name}
						width={51}
						height={51}
						draggable={false}
					/>
				</div>
				<div className={styles.info}>
					<SmallHeading className={styles.name} title={selectProduct.name} />
					<Description
						className={styles.price}
						title={ReactHtmlParser(selectProduct.price_html)}
					/>
					<select>
						{products.map(product => (
							<option
								key={product.id + 123}
								value={product.id}
								onClick={() => setSelectProduct(product)}
							>
								{product.name}
							</option>
						))}
					</select>
				</div>
			</div>
			{selectProduct.type === 'simple' ? (
				<div onClick={handleAddProduct} className={styles.btn}>
					+ Add
				</div>
			) : (
				<Link href={`/products/${selectProduct.slug}`} className={styles.btn}>
					+ Add
				</Link>
			)}
		</div>
	)
}

export default SelectUnlock
