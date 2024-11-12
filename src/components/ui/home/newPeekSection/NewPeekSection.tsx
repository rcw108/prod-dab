'use client'

import { HomeACF, PageLink } from '@/types/homepage.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SmallHeading from '../../headings/SmallHeading'
import SubHeading from '../../headings/SubHeading'
import styles from './NewPeekSection.module.scss'
import NewPeekSkeleton from './NewPeekSkeleton'
import { useNewPeek } from './useNewPeek'

interface INewPeekSection extends Pick<HomeACF, 'title_pr' | 'text_pr'> {
	productsToRender: number[]
	linkContent: PageLink
}

const NewPeekSection: FC<INewPeekSection> = ({
	text_pr,
	title_pr,
	productsToRender,
	linkContent
}) => {
	const { data, isLoading } = useNewPeek(productsToRender.join(','))

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
							{data &&
								data.map(product => (
									<div className={styles.item} key={product.id}>
										<Link href={`/products/${product.slug}`}>
											<div className={styles.img}>
												<Image
													src={product.images[0]}
													alt={product.name}
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
														{(+product.regular_price - +product.price).toFixed(
															2
														)}
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
							<Link className={styles.link} href={linkContent.url}>
								{linkContent.title}
							</Link>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default NewPeekSection
