'use client'

import { Category, Tag } from '@/store/products/product.interface'
import { ShopACF } from '@/types/shopPage.interface'
import { Vibe, WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import FilterHeader from './filterHeader/FilterHeader'
import FilterItem from './filterItem/FilterItem'
import styles from './ShopContent.module.scss'
import SingleProductCard from './singleProductCard/SingleProductCard'
import { useShopContent } from './useShopContent'

interface IShopContent
	extends Pick<
		ShopACF,
		| 'bundle_section_image'
		| 'disposables_section_image'
		| 'cartridges_section_image'
		| 'gummy_section_image'
	> {
	products: WooCommerceSingleProduct[]
	categories: Category[]
	tags: Tag[]
	vibes: Vibe[]
}

const ShopContent: FC<IShopContent> = ({
	products,
	tags,
	categories,
	bundle_section_image,
	cartridges_section_image,
	disposables_section_image,
	gummy_section_image,
	vibes
}) => {
	const {
		sortedProducts,
		setProducts,
		setSortedProducts,
		categiriesTab,
		categoriesActive,
		setCategiriesTab,
		setTagTab,
		tagActive,
		tagTab,
		handleCategories,
		handleTags,
		loading,
		setLoading,
		disposablesProducts,
		bundleProducts,
		cartridgesProducts,
		gummyProducts,
		vibeActive,
		vibeTab,
		setVibeTab,
		handleVibe
	} = useShopContent()

	const [bundleLoad, setBundleLoad] = useState<number>(7)
	const [gummyLoad, setGummyLoad] = useState<number>(7)
	const [cartridgeLoad, setCartridgeLoad] = useState<number>(7)
	const [disposiblesLoad, setDisposiblesLoad] = useState<number>(7)

	useEffect(() => {
		setLoading(true)
		setProducts(products)
		setSortedProducts(products)
		setLoading(false)
	}, [products, setProducts])

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth
			if (width < 768) {
				setBundleLoad(3)
				setGummyLoad(3)
				setCartridgeLoad(5)
				setDisposiblesLoad(3)
			} else if (width < 1200) {
				setBundleLoad(5)
				setGummyLoad(5)
				setCartridgeLoad(7)
				setDisposiblesLoad(5)
			} else {
				setBundleLoad(7)
				setGummyLoad(7)
				setCartridgeLoad(9)
				setDisposiblesLoad(7)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const handleLoadMore = (
		setLoad: React.Dispatch<React.SetStateAction<number>>,
		currentLoad: number
	) => {
		const width = window.innerWidth
		let resizeAdditionLoadProductNumber = 0

		if (width < 1200) {
			resizeAdditionLoadProductNumber = 6
		} else if (width < 768) {
			resizeAdditionLoadProductNumber = 4
		} else {
			resizeAdditionLoadProductNumber = 8
		}

		setLoad(currentLoad + resizeAdditionLoadProductNumber)
	}

	return (
		<section className={clsx(styles.shop, { [styles.loading]: loading })}>
			<div className='container'>
				<div className={styles.wrapper}>
					<div className={styles.center}>
						<div className={styles.filters}>
							<div className={styles.categories}>
								<FilterHeader
									title='Categories'
									className={styles.catTop}
									handler={setCategiriesTab}
									handlerValue={categiriesTab}
								/>
								<FilterItem
									itemsArray={categories}
									handler={handleCategories}
									active={categoriesActive}
									tab={categiriesTab}
								/>
							</div>
							<div className={styles.tags}>
								<FilterHeader
									title='Tags'
									className={styles.tagTop}
									handler={setTagTab}
									handlerValue={tagTab}
								/>
								<FilterItem
									itemsArray={tags}
									handler={handleTags}
									active={tagActive}
									tab={tagTab}
								/>
							</div>
							<div className={styles.vibe}>
								<FilterHeader
									title='Vibe'
									className={styles.vibeTop}
									handler={setVibeTab}
									handlerValue={vibeTab}
								/>
								<FilterItem
									itemsArray={vibes}
									handler={handleVibe}
									active={vibeActive}
									tab={vibeTab}
								/>
							</div>
						</div>
						<div className={styles.content} id='products'>
							{loading ? (
								<div className={styles.skeleton}>
									{<SkeletonLoader count={12} width={300} height={300} />}
								</div>
							) : sortedProducts.length > 0 ? (
								<>
									{bundleProducts.length > 0 && (
										<>
											<div className={styles.bundle}>
												<div className='relative w-full h-full'>
													<Image
														className={styles.shopImg}
														src={bundle_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{bundleProducts.slice(0, bundleLoad).map(product => {
													if (product.status === 'private') return null
													if (product.catalog_visibility === 'hidden')
														return null

													return (
														<SingleProductCard
															key={product.id * 11}
															{...product}
														/>
													)
												})}
											</div>
											{bundleLoad < bundleProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]: bundleLoad < bundleProducts.length
													})}
													onClick={() =>
														handleLoadMore(setBundleLoad, bundleLoad)
													}
												>
													Load More
												</button>
											)}
										</>
									)}
									{gummyProducts.length > 0 && (
										<>
											<div className={styles.gummy}>
												<div className='relative w-full h-full'>
													<Image
														className={styles.shopImg}
														src={gummy_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{gummyProducts.slice(0, gummyLoad).map(product => {
													if (product.status === 'private') return null
													if (product.catalog_visibility === 'hidden')
														return null

													return (
														<SingleProductCard
															key={product.id * 12}
															{...product}
														/>
													)
												})}
											</div>
											{gummyLoad < gummyProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]: gummyLoad < gummyProducts.length
													})}
													onClick={() =>
														handleLoadMore(setGummyLoad, gummyLoad)
													}
												>
													Load More
												</button>
											)}
										</>
									)}
									{cartridgesProducts.length > 0 && (
										<>
											<div className={styles.cartrigdes}>
												<div className='relative w-full h-full'>
													<Image
														className={styles.shopImg}
														src={cartridges_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{cartridgesProducts
													.slice(0, cartridgeLoad)
													.map(product => {
														if (product.status === 'private') return null
														if (product.catalog_visibility === 'hidden')
															return null

														return (
															<SingleProductCard
																key={product.id * 13}
																{...product}
															/>
														)
													})}
											</div>
											{cartridgeLoad < cartridgesProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]:
															cartridgeLoad < cartridgesProducts.length
													})}
													onClick={() =>
														handleLoadMore(setCartridgeLoad, cartridgeLoad)
													}
												>
													Load More
												</button>
											)}
										</>
									)}
									{disposablesProducts.length > 0 && (
										<>
											<div className={styles.disp}>
												<div className='relative w-full h-full'>
													<Image
														className={styles.shopImg}
														src={disposables_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{disposablesProducts
													.slice(0, disposiblesLoad)
													.map(product => {
														if (product.status === 'private') return null
														if (product.catalog_visibility === 'hidden')
															return null

														return (
															<SingleProductCard
																key={product.id * 14}
																{...product}
															/>
														)
													})}
											</div>
											{disposiblesLoad < disposablesProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]:
															disposiblesLoad < disposablesProducts.length
													})}
													onClick={() =>
														handleLoadMore(setDisposiblesLoad, disposiblesLoad)
													}
												>
													Load More
												</button>
											)}
										</>
									)}
								</>
							) : (
								<div>No products</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShopContent
