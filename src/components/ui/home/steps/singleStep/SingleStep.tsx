import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { Step } from '@/types/homepage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleStep.module.scss'
interface ISingleStep extends Step {
	className?: string
}

const SingleStep: FC<ISingleStep> = ({ img, text, title, className }) => {
	return (
		<div className={styles.singleStep}>
			<div className={styles.img}>
				{img && typeof img === 'string' && (
					<Image
						draggable={false}
						src={img}
						alt={title}
						width={280}
						height={280}
					/>
				)}
			</div>
			<SmallHeading
				className={clsx(styles.title, className)}
				title={ReactHtmlParser(title)}
			/>
			<Description
				className={clsx(styles.descr, className)}
				title={ReactHtmlParser(text)}
			/>
		</div>
	)
}

export default SingleStep
