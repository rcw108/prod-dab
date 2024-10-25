import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { BlockDifference } from '@/types/homepage.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleDifference.module.scss'
const SingleDifference: FC<BlockDifference> = ({ img, text, title }) => {
	return (
		<div className={styles.single}>
			<div className={styles.img}>
				<Image
					src={img}
					alt={title}
					width={160}
					height={160}
					draggable={false}
				/>
			</div>
			<SmallHeading className={styles.title} title={ReactHtmlParser(title)} />
			<Description className={styles.descr} title={ReactHtmlParser(text)} />
		</div>
	)
}

export default SingleDifference
