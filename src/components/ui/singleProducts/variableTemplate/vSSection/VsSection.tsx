import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import { VariableSingleACF } from '@/types/singleTemplates/variableSingle.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './VsSection.module.scss'

interface IVsSection
	extends Pick<
		VariableSingleACF,
		'vs_repeater' | 'text_vs' | 'title_vs' | 'dabpens_logo'
	> {}

const VsSection: FC<IVsSection> = ({
	text_vs,
	title_vs,
	vs_repeater,
	dabpens_logo
}) => {
	const firstColContent = vs_repeater.map(item => item.title)
	const secondColContent = vs_repeater.map(item => item.dabpens)
	const thirdColContent = vs_repeater.map(item => item.other)

	return (
		<section className={styles.vs}>
			<div className='container'>
				<div className={styles.box}>
					<div className={styles.overlay}></div>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_vs)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_vs)}
					/>
					<div className={styles.table}>
						<div className={styles.firstRow}>
							<div className={styles.firstCol}>
								<div className={styles.space}></div>
								<div className={styles.firstBox}>
									<div className={styles.fOverlay}></div>
									{firstColContent.map((item, index) => (
										<h6 className={styles.tableTitle} key={index}>
											{item}
										</h6>
									))}
								</div>
							</div>
							<div className={styles.secCol}>
								<div className={styles.space}>
									<Image
										src={dabpens_logo}
										alt='dabpens'
										width={98}
										height={30}
									/>
								</div>
								{secondColContent.map((item, index) => (
									<div className={styles.secItem} key={`${item}+${index}`}>
										<Image src={item} alt='dabpens' width={38} height={38} />
									</div>
								))}
							</div>
							<div className={styles.thCol}>
								<div className={styles.space}>OTHERS</div>
								<div className={styles.thBox}>
									<div className={styles.thOverlay}></div>
									{thirdColContent.map((item, index) => (
										<div className={styles.thItem} key={`${item}-${index}`}>
											<Image src={item} alt='other' width={29} height={29} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default VsSection
