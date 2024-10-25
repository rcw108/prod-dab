import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useActions } from '@/hooks/useActions'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './RelatedProduct.module.scss'

const RelatedProduct: FC<{ product: WooCommerceSingleProduct }> = ({
	product
}) => {
	const { addToCart } = useActions()

	const handleAddProduct = () => {
		addToCart({
			id: product.id,
			count: 1,
			price: product.price,
			paymentType: 'one-time',
			type: 'simple',
			name: product.name,
			itemImage: product.images[0].src
		})
	}

	return (
		<div className={styles.select}>
			<div className='flex items-center'>
				<div className={styles.img}>
					<Image
						src={product.images[0].src}
						alt={product.name}
						width={51}
						height={51}
						draggable={false}
					/>
				</div>
				<div className={styles.info}>
					<SmallHeading className={styles.name} title={product.name} />
					<Description
						className={styles.price}
						title={ReactHtmlParser(`$${product.price}`)}
					/>
				</div>
			</div>
			<div onClick={handleAddProduct} className={styles.btn}>
				+ Add
			</div>
		</div>
	)
}

export default RelatedProduct
