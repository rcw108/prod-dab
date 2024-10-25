'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Description from '../../headings/Description'
import styles from './HeadAccountSection.module.scss'
interface IHeadAccountSection {
	contentLines: {
		icon: string | false
		text: string
	}[]
}
const settings = {
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1
}

const HeadAccountSection: FC<IHeadAccountSection> = ({ contentLines }) => {
	return (
		<section className={styles.headAC}>
			<div className={styles.wrapper}>
				{contentLines.map((item, index) => (
					<div className={styles.item} key={item.text}>
						{item.icon && typeof item.icon === 'string' && (
							<Image src={item.icon} alt='advantage' width={15} height={15} />
						)}
						<Description
							className={styles.text}
							title={ReactHtmlParser(item.text)}
						/>
					</div>
				))}
			</div>
			<Slider
				{...settings}
				className={clsx(
					styles.wrapper,
					styles.wrapperMobile,
					'headAccountSectionSlider'
				)}
			>
				{contentLines.map((item, index) => (
					<div className={styles.item} key={item.text}>
						{item.icon && typeof item.icon === 'string' && (
							<Image src={item.icon} alt='advantage' width={15} height={15} />
						)}
						<Description
							className={styles.text}
							title={ReactHtmlParser(item.text)}
						/>
					</div>
				))}
			</Slider>
		</section>
	)
}

export default HeadAccountSection
