'use client'
import Cookies from 'js-cookie'
import { FC, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from '../HeadCheckout.module.scss'

const Timer: FC<{
	checkout_timer: string
	checkout_after_timer_text: string
}> = ({ checkout_timer, checkout_after_timer_text }) => {
	const [timeLeft, setTimeLeft] = useState<number | null>(null)

	useEffect(() => {
		const startTime = Cookies.get('checkoutTimerStart')
		if (!startTime) {
			const now = new Date().getTime()
			Cookies.set('checkoutTimerStart', now.toString(), {
				sameSite: 'None',
				secure: true
			})
			setTimeLeft(+checkout_timer * 60)
		} else {
			const elapsed = (new Date().getTime() - parseInt(startTime)) / 1000
			const remaining = Math.max(0, +checkout_timer * 60 - elapsed)
			setTimeLeft(Math.round(remaining))
		}

		const timer = setInterval(() => {
			setTimeLeft(prevTime => {
				if (prevTime === null) return null
				if (prevTime <= 0) {
					clearInterval(timer)
					return 0
				}
				return prevTime - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [checkout_timer])

	const formatTime = (
		seconds: number
	): { minutes: number; seconds: number } => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return { minutes, seconds: remainingSeconds }
	}

	return (
		<div className={styles.timer}>
			{timeLeft !== null && timeLeft > 0 ? (
				<>
					<div className={styles.time}>
						<p>
							Your order is reserved for:{' '}
							<span>{formatTime(timeLeft).minutes} minutes </span>
							<span>{formatTime(timeLeft).seconds} seconds</span>
						</p>
					</div>
				</>
			) : (
				<div className={styles.text}>
					{ReactHtmlParser(checkout_after_timer_text)}
				</div>
			)}
		</div>
	)
}

export default Timer
