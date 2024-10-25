import Button from '@/components/ui/button/Button'
import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { SimpleSingleACF } from '@/types/singleTemplates/simpleSingle.interface'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './QATest.module.scss'
import SingleQA from './singleQA/SingleQA'

interface QA
	extends Pick<
		SimpleSingleACF,
		| 'background_image_qual'
		| 'title_qual'
		| 'subtitle_qual'
		| 'content_qual'
		| 'button_qual'
	> {}

const QATest: FC<QA> = ({
	background_image_qual,
	button_qual,
	content_qual,
	subtitle_qual,
	title_qual
}) => {
	return (
		<section className={styles.qa}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${background_image_qual})` }}
				>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_qual)}
					/>
					<Description
						className={styles.subtitle}
						title={ReactHtmlParser(subtitle_qual)}
					/>
					<div className={styles.wrapper}>
						{content_qual.map((item, index) => {
							return <SingleQA {...item} key={index} />
						})}
					</div>
					{button_qual.url && (
						<div className={styles.btns}>
							<Button
								link={button_qual.url}
								text={button_qual.title}
								target={button_qual.target}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default QATest
