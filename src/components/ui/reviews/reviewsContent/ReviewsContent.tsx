'use client'

import { getReviews } from '@/components/screens/reviews/review.actions'
import { Stamped } from '@/types/stamped.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import Description from '../../headings/Description'
import SmallHeading from '../../headings/SmallHeading'
import SkeletonLoader from '../../SkeletonLoader'
import styles from './ReviewsContent.module.scss'

const ReviewsContent: FC<{
	className?: string
	classNameTitle?: string
	classNamePag?: string
	classNameText?: string
	contentBlockRef: React.RefObject<HTMLDivElement>
}> = ({
	className = 'bg-white',
	classNameTitle,
	classNameText,
	classNamePag,
	contentBlockRef
}) => {
	const [reviewsContent, setReviewsContent] = useState<Stamped | null>(null)
	const [page, setPage] = useState(1)
	const [disabled, setDisabled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [imageSrc, setImageSrc] = useState('')

	const openLightbox = (imageUrl: string) => {
		setImageSrc(imageUrl)
		setIsOpen(true)
	}

	useEffect(() => {
		setDisabled(true)
		const fetchNewReview = async () => {
			const reviews = await getReviews(page)

			if (reviews) {
				setReviewsContent(reviews)
			}
			setDisabled(false)
		}

		fetchNewReview()
	}, [page])
	useEffect(() => {
		setDisabled(true)
		const fetchNewReview = async () => {
			const reviews = await getReviews(page)

			if (reviews) {
				setReviewsContent(reviews)
			}
			setDisabled(false)
		}

		fetchNewReview()
	}, [])

	const handleClickPagination = (page: number) => {
		setPage(page)
	}

	useEffect(() => {
		if (contentBlockRef.current) {
			const yOffset = -148
			const elementPosition =
				contentBlockRef.current.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.pageYOffset + yOffset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			})
		}
	}, [reviewsContent])

	return (
		<section className={className} ref={contentBlockRef}>
			<div className='container'>
				<div className={styles.wrapper}>
					{reviewsContent ? (
						<>
							<div className={styles.titleTop}>
								<div className='flex gap-1'>
									{Array.from({ length: 5 }).map((_, index) => (
										<Image
											src='/star-review.svg'
											alt='star'
											draggable={false}
											width={17}
											height={23}
											key={index}
											className='mr-1'
										/>
									))}
								</div>
								<SmallHeading
									className={clsx(styles.based, classNameText)}
									title={`Based on ${reviewsContent.total} Reviews`}
								/>
							</div>

							<div className={styles.content}>
								{reviewsContent.results.map(item => (
									<div className={styles.item} key={item.review.id}>
										<div className={styles.box}>
											<div className={styles.left}>
												<Image
													src={item.review.productImageUrl}
													alt={item.review.title}
													draggable={false}
													width={100}
													height={100}
												/>
											</div>
											<div className={styles.right}>
												<div className={styles.rate}>
													<div className='flex gap-1'>
														{[...Array(item.review.rating)].map((_, i) => (
															<Image
																src='/star-review.svg'
																alt='star'
																draggable={false}
																width={17}
																height={23}
																priority
																key={`star-${item.orderId}-${i}`}
															/>
														))}
													</div>
													<div className={styles.date}>
														{`${new Date(item.review.dateCreated).getDate().toString().padStart(2, '0')}/${(
															new Date(item.review.dateCreated).getMonth() + 1
														)
															.toString()
															.padStart(
																2,
																'0'
															)}/${new Date(item.review.dateCreated).getFullYear()}`}
													</div>
												</div>
												<SmallHeading
													className={clsx(styles.titleContent, classNameTitle)}
													title={item.review.title}
												/>
												<div className={styles.body}>
													<Description
														className={classNameText}
														title={ReactHtmlParser(
															`&#x201C; ${item.review.body} &#x201D;`
														)}
													/>
												</div>
												<div className={styles.author}>
													<Description
														title={
															item.review.author.split(' ').length > 1
																? `${item.review.author.split(' ')[0]} ${item.review.author.split(' ')[1][0]}.`
																: item.review.author
														}
													/>
													{item.customer.isConfirmed && (
														<div className={styles.verify}>
															<Image
																src='/shield-check.svg'
																alt='verify'
																width={15}
																height={14}
																draggable={false}
															/>
															<Description
																className={styles.verify}
																title={'Verified Buyer'}
															/>
														</div>
													)}
												</div>
												<Description
													className={styles.product}
													title={item.review.productTitle}
												/>
												{item.review.imagesFileName && (
													<div className={styles.reviewImage}>
														<Image
															src={`https://s3-us-west-2.amazonaws.com/stamped.io/uploads/photos/thumb/${item.review.imagesFileName}`}
															alt={item.review.title}
															draggable={false}
															onClick={() =>
																openLightbox(
																	`https://s3-us-west-2.amazonaws.com/stamped.io/uploads/photos/thumb/${item.review.imagesFileName}`
																)
															}
															priority
															width={100}
															height={60}
														/>
														{isOpen && (
															<Lightbox
																mainSrc={imageSrc} // Основное изображение
																onCloseRequest={() => setIsOpen(false)} // Закрытие лайтбокса
															/>
														)}
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
							<div className={clsx(styles.pagination, classNamePag)}>
								{page - 1 >= 1 && (
									<button
										disabled={disabled}
										onClick={() => handleClickPagination(page - 1)}
									>
										{'<'}
									</button>
								)}
								{page > 2 && (
									<button
										disabled={disabled}
										onClick={() => handleClickPagination(1)}
									>
										1
									</button>
								)}
								{page - 1 >= 1 && (
									<button
										disabled={disabled}
										onClick={() => handleClickPagination(page - 1)}
									>
										{page - 1}
									</button>
								)}
								<button disabled={disabled} className={styles.current}>
									{page}
								</button>
								{page + 1 < reviewsContent.totalPages && (
									<button
										disabled={disabled}
										onClick={() => handleClickPagination(page + 1)}
									>
										{page + 1}
									</button>
								)}
								{page < reviewsContent.totalPages && (
									<button
										disabled={disabled}
										onClick={() =>
											handleClickPagination(reviewsContent.totalPages)
										}
									>
										{reviewsContent.totalPages}
									</button>
								)}
								{page < reviewsContent.totalPages && (
									<button
										disabled={disabled}
										onClick={() => handleClickPagination(page + 1)}
									>
										{'>'}
									</button>
								)}
							</div>
						</>
					) : (
						<>
							<div className={styles.titlePreloader}>
								<SkeletonLoader count={1} height={'40px'} width={'25%'} />
							</div>
							<div className={styles.contentPreloader}>
								<SkeletonLoader count={20} height={'200px'} width={'47%'} />
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default ReviewsContent
