import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import ReviewShopCard from '@/components/ui/shop/reviewSectionShop/reviewShopCard/ReviewShopCard'
import { ContentQuality } from '@/types/singleTemplates/simpleSingle.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleQA.module.scss'
const SingleQA: FC<ContentQuality> = ({
	image,
	position,
	review_author,
	review_stars,
	review_text,
	text,
	title
}) => {
	return (
		<div
			className={clsx(styles.single, {
				[styles.left]: position === 'left',
				[styles.right]: position === 'right'
			})}
		>
			<div className={styles.leftContent}>
				<SmallHeading className={styles.title} title={ReactHtmlParser(title)} />
				<Description className={styles.text} title={ReactHtmlParser(text)} />
				{review_text && review_author && review_stars && (
					<ReviewShopCard
						author={review_author}
						start_image={review_stars}
						text={review_text}
						className={styles.reviewCard}
					/>
				)}
			</div>
			<div className={styles.rightContent}>
				<div className={styles.img}>
					<Image src={image} alt={title} fill />
				</div>
			</div>
		</div>
	)
}

export default SingleQA
