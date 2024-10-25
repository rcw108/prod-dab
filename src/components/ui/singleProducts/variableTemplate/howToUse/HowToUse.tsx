import Button from '@/components/ui/button/Button'
import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import SubHeading from '@/components/ui/headings/SubHeading'
import { VariableSingleACF } from '@/types/singleTemplates/variableSingle.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './HowToUse.module.scss'

interface IHowToUse
	extends Pick<
		VariableSingleACF,
		'how_repeater' | 'text_how' | 'title_how' | 'button_how'
	> {}

const HowToUse: FC<IHowToUse> = ({
	button_how,
	how_repeater,
	text_how,
	title_how
}) => {
	return (
		<section className={styles.how}>
			<div className='container'>
				<div className={styles.box}>
					<div className={styles.overlay}></div>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_how)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_how)}
					/>
					<div className={styles.wrap}>
						{how_repeater &&
							how_repeater.map((item, index) => (
								<div className={styles.item} key={index}>
									<Image
										src={item.icon}
										alt={item.text}
										width={200}
										height={130}
									/>
									<SmallHeading
										className={styles.itemTitle}
										title={ReactHtmlParser(item.title)}
									/>
									<Description
										className={styles.itemText}
										title={ReactHtmlParser(item.text)}
									/>
								</div>
							))}
					</div>
					{button_how.url && (
						<div className={styles.btns}>
							<Button
								link={button_how.url}
								text={button_how.title}
								target={button_how.target}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default HowToUse
