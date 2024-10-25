import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import SubHeading from '@/components/ui/headings/SubHeading'
import { VariableSingleACF } from '@/types/singleTemplates/variableSingle.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './Vibe.module.scss'

interface IVibe
	extends Pick<
		VariableSingleACF,
		'vibe_repeater' | 'text_vibe' | 'title_vibe'
	> {}

const Vibe: FC<IVibe> = ({ text_vibe, title_vibe, vibe_repeater }) => {
	return (
		<section className={styles.vibe}>
			<div className='container'>
				<div className={styles.box}>
					<div className={styles.overlay}></div>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_vibe)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_vibe)}
					/>
					<div className={styles.wrap}>
						{vibe_repeater &&
							vibe_repeater.map((item, index) => (
								<div className={styles.item} key={index}>
									<Image
										src={item.icon}
										alt={item.text}
										width={100}
										height={100}
									/>
									<SmallHeading
										className={styles.text}
										title={ReactHtmlParser(item.text)}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Vibe
