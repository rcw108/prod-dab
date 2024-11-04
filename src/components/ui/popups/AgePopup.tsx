'use client'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactHtmlParser from 'react-html-parser'
import styles from './Popups.module.scss'
import { useAgePopup } from './useAgePopup'

const AgePopup: FC = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [isClient, setIsClient] = useState(false)
	const cookieName = 'ageVerify'
	const cookieExpiryDays = 30

	const { data, isLoading } = useAgePopup()

	useEffect(() => {
		setIsClient(true)
		const hasUsedPopup = Cookies.get(cookieName)

		if (hasUsedPopup) {
			setIsVisible(true)
		}
	}, [])

	const approveAge = () => {
		Cookies.set(cookieName, 'true', { expires: cookieExpiryDays })
		setIsVisible(true)
	}

	if (!isClient || isVisible) return null

	return (
		data &&
		ReactDOM.createPortal(
			<>
				<div className={styles.age}>
					<div className={styles.overlay}></div>
					<div className={styles.popupAge}>
						<div className={styles.box}>
							<div className={styles.logoAge}>
								<Image src={data.logotype_age} alt='logotype' fill />
							</div>
							<h3>{data.title_age}</h3>
							<div className={styles.descr}>
								{ReactHtmlParser(data.text_age)}
							</div>
							<div className={styles.btns}>
								<button className={styles.btn} onClick={approveAge}>
									{"I'm 21 or older"}
								</button>
							</div>
							<div className={styles.faq}>{ReactHtmlParser(data.faq_age)}</div>
						</div>
						<div className={styles.verifyLogo}>
							<Image
								src={data.checker_logo}
								alt='checker'
								width={40}
								height={40}
							/>{' '}
							<span>Age</span>
							<strong>Checker</strong>
							<span>.Net</span>
						</div>
					</div>
				</div>
			</>,
			document.body
		)
	)
}

export default AgePopup
