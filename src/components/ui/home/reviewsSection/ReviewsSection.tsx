'use client'

import { HomeACF } from '@/types/homepage.interface'
import { FC, useCallback, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import SlickButton from '../../button/slickButtom/SlickButton'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import ReviewCard from './reviewCard/ReviewCard'
import styles from './ReviewsSection.module.scss'

interface Review extends Pick<HomeACF, 'title_r' | 'text_r' | 'reviews_r'> {}

const ReviewsSection: FC<Review> = ({ reviews_r, text_r, title_r }) => {
	let sliderRef = useRef<Slider | null>(null)

	const goToSlide = useCallback((index: number) => {
		if (sliderRef.current) {
			sliderRef.current.slickGoTo(index)
		}
	}, [])

	return (
		<section className={styles.reviews}>
			<div className={styles.box}>
				<SubHeading className={styles.title} title={ReactHtmlParser(title_r)} />
				<Description className={styles.descr} title={ReactHtmlParser(text_r)} />

				<div className={styles.slider}>
					<Slider
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
						{reviews_r &&
							reviews_r.map((item, index) => (
								<ReviewCard {...item} key={index} />
							))}
					</Slider>
				</div>
			</div>
		</section>
	)
}

export default ReviewsSection
