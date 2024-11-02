import { HomeACF } from '@/types/homepage.interface'
import clsx from 'clsx'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import SkeletonLoader from '../../SkeletonLoader'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import styles from './Steps.module.scss'
import SingleStep from './singleStep/SingleStep'

interface ISteps
	extends Pick<
		HomeACF,
		'st_bg' | 'title_st' | 'text_st' | 'steps_st' | 'link_st'
	> {
	className?: string
	classNameTitle?: string
	classNameDescr?: string
	classNameStep?: string
}

const Steps: FC<ISteps> = ({
	link_st,
	st_bg,
	steps_st,
	text_st,
	title_st,
	className,
	classNameTitle,
	classNameDescr,
	classNameStep
}) => {
	if (!link_st || !steps_st || !text_st || !title_st) {
		return (
			<div className={styles.skeletonSteps}>
				<div className='container'>
					<div className={styles.skeletonBox}>
						<SkeletonLoader height={40} width={600} />
						<SkeletonLoader height={30} width={600} />
						<div className={styles.skeletonInfo}>
							{Array(3)
								.fill(0)
								.map((_, index) => (
									<div className={styles.skeletonStep} key={index}>
										<SkeletonLoader height={400} width={'100%'} />
									</div>
								))}
						</div>
						<div className={styles.skeletonBtns}>
							<SkeletonLoader height={40} width={300} />
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<section className={clsx(styles.steps, className)}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${st_bg})` }}
				>
					<SubHeading
						title={ReactHtmlParser(title_st)}
						className={clsx(styles.title, classNameTitle)}
					/>
					<Description
						className={clsx(styles.text, classNameDescr)}
						title={ReactHtmlParser(text_st)}
					/>
					{steps_st && (
						<div className={styles.info}>
							{steps_st.map((step, index) => (
								<SingleStep className={classNameStep} key={index} {...step} />
							))}
						</div>
					)}
					{link_st.title !== '' && (
						<div className={styles.btns}>
							<Button
								link={link_st.url}
								target={link_st.target}
								text={link_st.title}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default Steps
