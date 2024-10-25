import Description from '@/components/ui/headings/Description'
import { MoveLineContent } from '@/types/homepage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './MarqueeItem.module.scss'

interface MarqueeItem extends MoveLineContent {
	className?: string
	classNameImage?: string
	classNameText?: string
}

const MarqueeItem: FC<MarqueeItem> = ({
	icon,
	text,
	className,
	classNameImage,
	classNameText
}) => {
	return (
		<div className={clsx(styles.item, className)}>
			<div className={clsx(styles.icon, classNameImage)}>
				{icon && typeof icon === 'string' && (
					<Image draggable={false} src={icon} alt='advantage' fill />
				)}
			</div>
			<Description className={classNameText} title={ReactHtmlParser(text)} />
		</div>
	)
}

export default MarqueeItem
