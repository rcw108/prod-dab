import { HomeACF } from '@/types/homepage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import styles from './Puff.module.scss'

interface IPuff
	extends Pick<
		HomeACF,
		'img_hf' | 'title_hf' | 'star_img_hf' | 'star_text_' | 'text_hf'
	> {}

const Puff: FC<IPuff> = ({
	img_hf,
	star_img_hf,
	star_text_,
	text_hf,
	title_hf
}) => {
	return (
		<section className={styles.puff}>
			<div className='container'>
				<div className={styles.box}>
					<div className={styles.left}>
						<div className={styles.rate}>
							{star_img_hf && typeof star_img_hf === 'string' && (
								<Image
									src={star_img_hf}
									alt={star_text_}
									width={88}
									height={16}
								/>
							)}
							<Description
								className={styles.starText}
								title={ReactHtmlParser(star_text_)}
							/>
						</div>
						<SubHeading
							className={styles.title}
							title={ReactHtmlParser(title_hf)}
						/>
						<Description
							className={styles.descr}
							title={ReactHtmlParser(text_hf)}
						/>
					</div>
					<div className={styles.right}>
						<div className={styles.img}>
							<Image
								src={img_hf}
								alt={title_hf}
								fill
								draggable={false}
								unoptimized
							/>
						</div>
					</div>
				</div>

				<div className={clsx(styles.box, styles.mobileBox)}>
					<div className={styles.rate}>
						{star_img_hf && typeof star_img_hf === 'string' && (
							<Image
								src={star_img_hf}
								alt={star_text_}
								width={88}
								height={16}
							/>
						)}
						<Description
							className={styles.starText}
							title={ReactHtmlParser(star_text_)}
						/>
					</div>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_hf)}
					/>
					<div className={styles.img}>
						<Image
							src={img_hf}
							alt={title_hf}
							fill
							draggable={false}
							unoptimized
						/>
					</div>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_hf)}
					/>
				</div>
			</div>
		</section>
	)
}

export default Puff
