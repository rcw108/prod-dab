import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import ProductList from '../products/ProductList'
import styles from './PeekSection.module.scss'

interface Peek {
	title: string
	description: string
	tabFirst: string
	tabSecond: string
	products: WooCommerceSingleProduct[]
	popularCategories: string[]
}

const PeekSection: FC<Peek> = ({
	description,
	tabFirst,
	tabSecond,
	title,
	products,
	popularCategories
}) => {
	return (
		<section className={styles.peek}>
			<div className={styles.top}>
				<SubHeading className='text-center' title={ReactHtmlParser(title)} />
				<Description className='text-center' title={description} />
			</div>
			<ProductList products={products} popularCategories={popularCategories} />
		</section>
	)
}

export default PeekSection
