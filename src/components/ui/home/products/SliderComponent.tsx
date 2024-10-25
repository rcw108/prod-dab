import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderButton from '../../button/sliderButton/SliderButton'
import ProductSliderCard from './productSliderCard/ProductSliderCard'

interface SliderComponentProps {
	list: WooCommerceSingleProduct[]
}

const SliderComponent: FC<SliderComponentProps> = ({ list }) => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<>
			<Swiper
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
				slidesPerView={4}
				centeredSlides
				autoplay
				initialSlide={2}
				loop
				spaceBetween={32}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 0
					},
					585: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 32
					}
				}}
			>
				{windowWidth >= 1024 && <SliderButton variant='left' />}
				{list
					.filter(product => product.catalog_visibility !== 'hidden')
					.slice(0, 6)
					.map(product => {
						return (
							<SwiperSlide key={product.id}>
								{({ isActive }) => {
									return (
										<ProductSliderCard
											slideState={isActive}
											product={product}
										/>
									)
								}}
							</SwiperSlide>
						)
					})}
				{windowWidth >= 1024 && <SliderButton variant='right' />}
			</Swiper>
		</>
	)
}

export default SliderComponent
