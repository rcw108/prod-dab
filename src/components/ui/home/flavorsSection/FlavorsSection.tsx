import { HomeACF } from '@/types/homepage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import SmallHeading from '../../headings/SmallHeading'
import SubHeading from '../../headings/SubHeading'
import styles from './FlavorsSection.module.scss'

interface Flavors
	extends Pick<
		HomeACF,
		| 'bg_fl'
		| 'img_fl'
		| 'title_fl'
		| 'text_fl'
		| 'link_fl'
		| 'title_review_fl'
		| 'text_review_fl'
		| 'name_review_fl'
		| 'star_img_fl'
	> {}

const FlavorsSection: FC<Flavors> = ({
	bg_fl,
	img_fl,
	link_fl,
	name_review_fl,
	star_img_fl,
	text_fl,
	text_review_fl,
	title_fl,
	title_review_fl
}) => {
	return (
		<section className={styles.flavors}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${bg_fl})` }}
				>
					<div className={styles.left}>
						<SubHeading
							className={styles.title}
							title={ReactHtmlParser(title_fl)}
						/>
						<Description
							className={styles.descr}
							title={ReactHtmlParser(text_fl)}
						/>
						<div className={styles.btns}>
							<Button
								className={styles.btn}
								link={link_fl.url}
								target={link_fl.target}
								text={link_fl.title}
							/>
						</div>
						<div className={styles.review}>
							<SmallHeading
								className={styles.reviewTitle}
								title={ReactHtmlParser(title_review_fl)}
							/>
							<Description
								className={styles.reviewDescr}
								title={ReactHtmlParser(text_review_fl)}
							/>
							<div className={styles.info}>
								<div className={styles.nameBlock}>
									<Description
										className={styles.name}
										title={ReactHtmlParser(name_review_fl)}
									/>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='2'
										viewBox='0 0 20 2'
										fill='none'
									>
										<rect y='0.5' width='20' height='1' fill='#0D0D0D' />
									</svg>
								</div>
								<Image
									src={star_img_fl}
									alt={title_review_fl}
									width={88}
									height={16}
								/>
							</div>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.img}>
							{img_fl && typeof img_fl === 'string' && (
								<Image
									src={img_fl}
									alt='flavors'
									fill
									draggable={false}
									unoptimized
								/>
							)}
						</div>
					</div>
				</div>

				<div
					className={clsx(styles.box, styles.boxMobile)}
					style={{ backgroundImage: `url(${bg_fl})` }}
				>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_fl)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_fl)}
					/>
					<div className={styles.img}>
						{img_fl && typeof img_fl === 'string' && (
							<Image
								src={img_fl}
								alt='flavors'
								fill
								draggable={false}
								unoptimized
							/>
						)}
					</div>
					<div className={styles.btns}>
						<Button
							className={styles.btn}
							link={link_fl.url}
							target={link_fl.target}
							text={link_fl.title}
						/>
					</div>
					<div className={styles.review}>
						<SmallHeading
							className={styles.reviewTitle}
							title={ReactHtmlParser(title_review_fl)}
						/>
						<Description
							className={styles.reviewDescr}
							title={ReactHtmlParser(text_review_fl)}
						/>
						<div className={styles.info}>
							<div className={styles.nameBlock}>
								<Description
									className={styles.name}
									title={ReactHtmlParser(name_review_fl)}
								/>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='2'
									viewBox='0 0 20 2'
									fill='none'
								>
									<rect y='0.5' width='20' height='1' fill='#0D0D0D' />
								</svg>
							</div>
							<Image
								src={star_img_fl}
								alt={title_review_fl}
								width={88}
								height={16}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FlavorsSection
