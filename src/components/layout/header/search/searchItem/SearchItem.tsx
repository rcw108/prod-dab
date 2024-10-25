import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SearchItem.module.scss'
const SearchItem: FC<{ item: WooCommerceSingleProduct }> = ({ item }) => {
	return (
		<Link href={`/products/${item.slug}`} className={styles.item}>
			{item.images[0] ? (
				<div className={styles.img}>
					<Image src={item.images[0].src} alt={item.name} fill />
				</div>
			) : (
				<SkeletonLoader count={1} width={60} height={60} />
			)}
			<div className={styles.info}>
				<SmallHeading
					className={styles.title}
					title={ReactHtmlParser(item.name)}
				/>
				<Description
					className={styles.descr}
					title={ReactHtmlParser(item.price_html)}
				/>
			</div>
		</Link>
	)
}

export default SearchItem
