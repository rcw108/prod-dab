'use client'

import { useActions } from '@/hooks/useActions'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { HomeACF } from '@/types/homepage.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SmallHeading from '../../headings/SmallHeading'
import SubHeading from '../../headings/SubHeading'
import styles from './NewPeekSection.module.scss'
import NewPeekSkeleton from './NewPeekSkeleton'

interface INewPeekSection extends Pick<HomeACF, 'title_pr' | 'text_pr'> {}

const NewPeekSection: FC<INewPeekSection> = ({ text_pr, title_pr }) => {
	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	const { products, isLoading } = useGetAllSingleProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	const bundleProducts = allProducts?.filter(
		product => product.type === 'bundle'
	)

	return (
		<>
			{isLoading ? (
				<NewPeekSkeleton isLoading={isLoading} />
			) : (
				<section className={styles.peek}>
					<div className='container'>
						<SubHeading
							className='text-center mb-5'
							title={ReactHtmlParser(title_pr)}
						/>
						<Description
							className='text-center'
							title={ReactHtmlParser(text_pr)}
						/>
						<div className={styles.box}>
							{bundleProducts?.slice(1, 5).map(product => (
								<div className={styles.item} key={product.id}>
									<Link href={`/products/${product.slug}`}>
										<div className={styles.img}>
											<Image
												src={product.images[0].src}
												alt={product.images[0].name}
												fill
												draggable={false}
												unoptimized
											/>
										</div>
										<div className={styles.rate}>
											{[...Array(5)].map((_, i) => (
												<Image
													key={`star-${i}`}
													src='/star.svg'
													alt='star'
													width={20}
													height={20}
												/>
											))}
										</div>
										<SmallHeading
											className={styles.titleProduct}
											title={ReactHtmlParser(product.name)}
										/>
										<div className={styles.price}>
											<Description
												title={ReactHtmlParser(product.price_html)}
											/>
											<div className={styles.save}>
												Save $
												<span>
													{(+product.regular_price - +product.price).toFixed(2)}
												</span>
											</div>
										</div>
									</Link>
									<Link
										className={styles.btn}
										href={`/products/${product.slug}`}
									>
										Build Your Bundle
									</Link>
								</div>
							))}
						</div>
						<div className={styles.linkWrap}>
							<Link className={styles.link} href={`/shop?category=Bundle`}>
								View All Bundles
							</Link>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default NewPeekSection
