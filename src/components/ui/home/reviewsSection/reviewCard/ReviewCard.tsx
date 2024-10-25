import Description from '@/components/ui/headings/Description'
import { SingleReview } from '@/types/homepage.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './ReviewCard.module.scss'
const ReviewCard: FC<SingleReview> = ({ name, text }) => {
	return (
		<div className={styles.review}>
			<div className={styles.quote}></div>
			<div className={styles.rate}>
				{[...Array(5)].map((_, i) => (
					<Image key={i} src='/star.svg' alt='star' width={20} height={20} />
				))}
			</div>
			<Description className={styles.text} title={ReactHtmlParser(text)} />
			<h6 className={styles.name}>{name}</h6>
		</div>
	)
}

export default ReviewCard
