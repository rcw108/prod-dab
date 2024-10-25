import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './ContactUsContent.module.scss'

const ContactUsContent: FC<{ content: { rendered: string } }> = ({
	content
}) => {
	return (
		<section className={styles.content}>
			<div className={styles.box}>{ReactHtmlParser(content.rendered)}</div>
		</section>
	)
}

export default ContactUsContent
