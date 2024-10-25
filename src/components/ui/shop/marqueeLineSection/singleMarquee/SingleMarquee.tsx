import Description from '@/components/ui/headings/Description'
import { MarqueeHead } from '@/types/shopPage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleMarquee.module.scss'

const SingleMarquee: FC<MarqueeHead> = ({ icon, text }) => {
	return (
		<div className={clsx(styles.item)}>
			<div className={clsx(styles.icon)}>
				{icon && typeof icon === 'string' && (
					<Image draggable={false} src={icon} alt='advantage' fill />
				)}
			</div>
			<Description className={styles.text} title={ReactHtmlParser(text)} />
		</div>
	)
}

export default SingleMarquee
