import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './ProductSliderCard.module.scss'
const ProductSliderCard: FC<{
	product: WooCommerceSingleProduct
	slideState: boolean
}> = ({ product, slideState }) => {
	return (
		<div className={clsx(styles.card, { [styles.slide]: slideState })}>
			<div className={styles.img}>
				<Image
					src={product.images[0].src}
					alt={product.name}
					width={383}
					height={383}
					draggable={false}
				/>
			</div>

			<div className={styles.info}>
				<div className={styles.stars}>
					{[...Array(Math.round(+product.average_rating))].map((_, index) => (
						<div className={styles.starItem} key={index}>
							<Image src={'/star.svg'} alt={'star'} fill draggable={false} />
						</div>
					))}
				</div>
				<Link href={`/products/${product.slug}`}>
					<SubHeading title={product.name} className={styles.title} />
				</Link>
				<div className={styles.description}>
					<Description
						className={styles.price}
						title={ReactHtmlParser(product.price_html)}
					/>
				</div>
				{slideState && (
					<div className={styles.btns}>
						<Link className={styles.btn} href={`/products/${product.slug}`}>
							SHOP NOW{' '}
							<Image
								src={'/right.svg'}
								alt={'arrow'}
								width={25}
								height={25}
								draggable={false}
							/>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductSliderCard
