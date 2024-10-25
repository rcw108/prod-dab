'use client'

import { ShopACF } from '@/types/shopPage.interface'
import clsx from 'clsx'
import { FC, useCallback, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import SlickButton from '../../button/slickButtom/SlickButton'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import stylesReviewSection from '../../home/reviewsSection/ReviewsSection.module.scss'
import SkeletonLoader from '../../SkeletonLoader'
import styles from './ReviewSectionShop.module.scss'
import ReviewShopCard from './reviewShopCard/ReviewShopCard'

interface Review
	extends Pick<
		ShopACF,
		'title_review' | 'subtitle_review' | 'reviews_repeater'
	> {}

const ReviewsSectionShop: FC<Review> = ({
	title_review,
	subtitle_review,
	reviews_repeater
}) => {
	let sliderRef = useRef<Slider | null>(null)

	const goToSlide = useCallback((index: number) => {
		if (sliderRef.current) {
			sliderRef.current.slickGoTo(index)
		}
	}, [])

	if (sliderRef === null)
		return <SkeletonLoader count={1} width={'100%'} height={300} />

	return (
		<section className={clsx(stylesReviewSection.reviews, styles.section)}>
			<div className={stylesReviewSection.box}>
				<SubHeading
					className={stylesReviewSection.title}
					title={ReactHtmlParser(title_review)}
				/>
				<Description
					className={stylesReviewSection.descr}
					title={ReactHtmlParser(subtitle_review)}
				/>

				<div className={stylesReviewSection.slider}>
					<Slider
						responsive={[
							{
								breakpoint: 1024,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
									infinite: true,
									dots: true
								}
							},
							{
								breakpoint: 600,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
									initialSlide: 1
								}
							},
							{
								breakpoint: 320,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1
								}
							}
						]}
						ref={slider => {
							sliderRef.current = slider
						}}
						centerMode={true}
						dots={true}
						infinite={true}
						slidesToShow={3}
						nextArrow={<SlickButton variant='right' />}
						prevArrow={<SlickButton variant='left' />}
						appendDots={dots => (
							<div>
								<ul className='slick-ul' style={{ margin: '0px' }}>
									{dots}
								</ul>
							</div>
						)}
						customPaging={i => (
							<div
								style={{ height: '100%' }}
								onClick={() => goToSlide(i)}
							></div>
						)}
					>
						{reviews_repeater &&
							reviews_repeater.map((item, index) => (
								<ReviewShopCard {...item} key={index} />
							))}
					</Slider>
				</div>
			</div>
		</section>
	)
}

export default ReviewsSectionShop
