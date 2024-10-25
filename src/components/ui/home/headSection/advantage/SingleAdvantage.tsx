import Description from '@/components/ui/headings/Description'
import { Advantage } from '@/types/homepage.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleAdvantage.module.scss'

const SingleAdvantage: FC<Advantage> = ({ icon, text }) => {
	return (
		<div className={styles.advantage}>
			{icon && typeof icon === 'string' && (
				<Image
					src={icon}
					alt='advantage'
					width={25}
					height={25}
					className={styles.icon}
					draggable={false}
				/>
			)}
			{text && <Description title={ReactHtmlParser(text)} />}
		</div>
	)
}

export default SingleAdvantage
