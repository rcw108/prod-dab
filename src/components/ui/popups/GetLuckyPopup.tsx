/* eslint-disable @next/next/no-img-element */
'use client'

import Cookies from 'js-cookie'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { useFormSection } from '../home/formSection/useFormSection'
import styles from './Popups.module.scss'

const GetLuckyPopup: FC = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [isClient, setIsClient] = useState(false)
	const popupDelay = 35000 // 5 seconds
	const cookieName = 'getLuckyPopupUsed'
	const cookieExpiryDays = 30

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{ email: string }>({
		mode: 'onChange'
	})

	const { isError, isLoading, onSubmit, setIsError, success, setSuccess } =
		useFormSection()

	useEffect(() => {
		setIsClient(true)
		const hasUsedPopup = Cookies.get(cookieName)
		const popupViewed = Cookies.get('viewed')

		if (!hasUsedPopup) {
			const timer = setTimeout(() => {
				setIsVisible(true)
			}, popupDelay)
			return () => clearTimeout(timer)
		}
		if (popupViewed && hasUsedPopup) {
			setIsVisible(false)
		}
	}, [])

	const closePopup = () => {
		setIsVisible(false)
	}

	const formSubmit = async (data: { email: string }) => {
		const res = await onSubmit('UgFxtg', data.email)
		if (res.success === true) {
			setSuccess(true)
			Cookies.set(cookieName, 'true', { expires: cookieExpiryDays })
			Cookies.set('viewed', 'true', { expires: cookieExpiryDays })
		}
	}

	if (!isClient) return null

	if (!isVisible)
		return (
			<div className={styles.luckyOpenPopup} onClick={() => setIsVisible(true)}>
				<span>GET LUCKY!</span>
			</div>
		)

	return ReactDOM.createPortal(
		<>
			<div className={styles.luckyOverlay}>
				<div className={styles.luckyContent}>
					<div className={styles.luckyWrapper}>
						{isError ? (
							<div>Error</div>
						) : isLoading ? (
							<div>Loading...</div>
						) : success ? (
							<div className={styles.luckySuccess}>
								<h3>CONGRATS!</h3>
								<h4>Check your email inbox to claim the winnings.</h4>
								<h5>
									If you can&apos;t find our email, check Promotions and/or SPAM
									folders.
								</h5>
								<button>Continue shopping</button>
							</div>
						) : (
							<>
								<div className={styles.luckyImg}>
									<img
										src={'/lucky-wheel.gif'}
										alt='wheel'
										width={300}
										height={300}
									/>
								</div>
								<h2>Get Lucky!</h2>
								<p className={styles.descr}>
									Enter your email for the chance to win big!
								</p>
								<form onSubmit={handleSubmit(formSubmit)}>
									<label>
										<input
											placeholder='Email'
											type='email'
											{...register('email', {
												required: 'Email is required',
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													message: 'Invalid email address'
												}
											})}
										/>
										{errors.email && (
											<p className={styles.luckyError}>
												{errors?.email?.message}
											</p>
										)}
									</label>
									<button className={styles.luckySubmit}>Try your luck</button>
									<button className={styles.luckyLater} onClick={closePopup}>
										save for later
									</button>
								</form>
							</>
						)}
						<button className={styles.luckyClose} onClick={closePopup}>
							<Image
								src={'/lucky-close.svg'}
								alt='close'
								width={40}
								height={40}
							/>
						</button>
					</div>
				</div>
			</div>
		</>,
		document.body
	)
}

export default GetLuckyPopup
