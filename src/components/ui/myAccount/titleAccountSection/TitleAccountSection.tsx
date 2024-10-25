'use client'

import clsx from 'clsx'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import Heading from '../../headings/Heading'
import styles from './TitleAccountSection.module.scss'

interface ITitleAccountSection {
	title: string
	background_image: string
	background_image_mobile: string
	className?: string
	content?: string
}

const TitleAccountSection: FC<ITitleAccountSection> = ({
	background_image,
	title,
	className,
	background_image_mobile,
	content
}) => {
	return (
		<>
			<section
				className={styles.title}
				style={{ backgroundImage: `url(${background_image})` }}
			>
				<div className={styles.wrapper}>
					<Heading
						className={clsx(styles.title, className)}
						title={ReactHtmlParser(title)}
					/>
					{content && (
						<Description className='my-5' title={ReactHtmlParser(content)} />
					)}
				</div>
			</section>
			<section
				className={clsx(styles.title, styles.mobile)}
				style={{ backgroundImage: `url(${background_image_mobile})` }}
			>
				<div className={styles.wrapper}>
					<Heading
						className={clsx(styles.title, className)}
						title={ReactHtmlParser(title)}
					/>
				</div>
			</section>
		</>
	)
}

export default TitleAccountSection
