'use client'

import { useUser } from '@/hooks/useUser'
import { CheckoutACF } from '@/types/checkoutLayout.interface'
import Image from 'next/image'
import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import MarqueeItem from '../../home/headSection/marqueeItem/MarqueeItem'
import CheckoutForms from './checkoutForms/CheckoutForms'
import styles from './HeadCheckout.module.scss'
import LoginCheckout from './loginCheckout/LoginCheckout'
import Timer from './timer/Timer'

interface IHeadCheckout
	extends Pick<
		CheckoutACF,
		| 'rating_image'
		| 'marquee_line_repeater'
		| 'rating_text'
		| 'checkout_timer'
		| 'checkout_after_timer_text'
		| 'credit_card_image'
		| 'order_advantages'
	> {}

const HeadCheckout: FC<IHeadCheckout> = ({
	checkout_after_timer_text,
	checkout_timer,
	marquee_line_repeater,
	rating_image,
	rating_text,
	credit_card_image,
	order_advantages
}) => {
	const user = useUser()

	return (
		<section className={styles.head}>
			<div className={styles.top}>
				{marquee_line_repeater && (
					<Marquee speed={50}>
						{[...marquee_line_repeater, ...marquee_line_repeater].map(
							(item, index) => {
								return <MarqueeItem key={index} {...item} />
							}
						)}
					</Marquee>
				)}
			</div>
			<div className={styles.rate}>
				<Image src={rating_image} alt='rating' width={88} height={16} />
				{rating_text && <Description title={ReactHtmlParser(rating_text)} />}
			</div>
			<Timer
				checkout_after_timer_text={checkout_after_timer_text}
				checkout_timer={checkout_timer}
			/>
			{!user && <LoginCheckout />}
			<div className={styles.wrapper}>
				<CheckoutForms
					credit_card_image={credit_card_image}
					order_advantages={order_advantages}
				/>
			</div>
		</section>
	)
}

export default HeadCheckout
