import Description from '@/components/ui/headings/Description'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './AdditionalInfo.module.scss'
const AdditionalInfo: FC<{ title: string; text: string }> = ({
	text,
	title
}) => {
	return (
		<div className={styles.tableItem}>
			<h5 className={styles.title}>{title}</h5>
			<Description className={styles.descr} title={ReactHtmlParser(text)} />
		</div>
	)
}

export default AdditionalInfo
