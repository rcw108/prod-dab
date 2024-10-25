'use client'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { sortByRatingCount } from '@/utils/sortByRatingCount'
import { sortProductsByCategories } from '@/utils/sortProductsByCategory'
import clsx from 'clsx'
import { FC, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './ProductList.module.scss'
import SliderComponent from './SliderComponent'
import { useProductList } from './useProductList'

interface ProductListProps {
	products: WooCommerceSingleProduct[]
	popularCategories: string[]
}

const ProductList: FC<ProductListProps> = ({ products, popularCategories }) => {
	const {
		activeTab,
		firstCategoryList,
		handleTabClick,
		secondCategoryList,
		setFirstCategoryList,
		setSecondCategoryList
	} = useProductList()

	useEffect(() => {
		setFirstCategoryList(
			sortByRatingCount(
				sortProductsByCategories(popularCategories[0], products)
			)
		)
		setSecondCategoryList(
			sortByRatingCount(
				sortProductsByCategories(popularCategories[1], products)
			)
		)
	}, [])
	return (
		<>
			<div className={styles.tabs}>
				<div className={styles.box}>
					<div
						onClick={handleTabClick}
						className={clsx(styles.tab, {
							[styles.activeTab]: activeTab === 'first'
						})}
					>
						<h6>{popularCategories[0]}</h6>
					</div>
					<div
						onClick={handleTabClick}
						className={clsx(styles.tab, {
							[styles.activeTab]: activeTab === 'second'
						})}
					>
						<h6>{popularCategories[1]}</h6>
					</div>
				</div>
			</div>
			<div
				className={clsx(styles.firstCategoryTab, {
					[styles.active]: activeTab === 'first'
				})}
			>
				{firstCategoryList && firstCategoryList.length > 0 && (
					<SliderComponent list={firstCategoryList} />
				)}
			</div>
			<div
				className={clsx(styles.secondCategoryTab, {
					[styles.active]: activeTab === 'second'
				})}
			>
				{secondCategoryList && secondCategoryList.length > 0 && (
					<SliderComponent list={secondCategoryList} />
				)}
			</div>
		</>
	)
}

export default ProductList
