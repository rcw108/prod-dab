import Description from '@/components/ui/headings/Description'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './NotFoundItem.module.scss'
const NotFoundItem: FC<{ product: WooCommerceSingleProduct }> = ({
	product
}) => {
	return (
		<div className={styles.item}>
			{product.images[0] && (
				<div className={styles.img}>
					<Image src={product.images[0].src} alt={product.name} fill />
				</div>
			)}
			<div className={styles.cat}>
				{product.categories.map((category, index) => (
					<p key={index}>
						{category.name}
						{product.categories.length > 1 ? ', ' : null}
					</p>
				))}
			</div>
			<h6 className={styles.name}>{product.name}</h6>
			<div className={styles.rate}>
				<div className={styles.stars}>
					{product.rating_count === 0
						? [...Array(5)].map((_, index) => (
								<Image
									key={index}
									src='/empty-star.svg'
									alt='star'
									width={15}
									height={15}
								/>
							))
						: [...Array(5)].map((_, index) => (
								<Image
									key={index}
									src='/star.svg'
									alt='star'
									width={15}
									height={15}
								/>
							))}
				</div>
				<span>{product.rating_count} reviews</span>
			</div>
			<Description
				className={styles.price}
				title={ReactHtmlParser(product.price_html)}
			/>
			<Link href={`/products/${product.slug}`} className={styles.link}>
				Select Options
			</Link>
		</div>
	)
}

export default NotFoundItem
