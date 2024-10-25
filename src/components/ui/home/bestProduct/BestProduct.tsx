import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import ReactHtmlParser from 'react-html-parser'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import MarqueeItem from '../headSection/marqueeItem/MarqueeItem'
import { IBestProduct } from './bestProduct.interface'
import styles from './BestProduct.module.scss'

const BestProduct: FC<IBestProduct> = ({
	bg_bp,
	img_bp,
	link_bp,
	running_bg,
	running_text,
	star_img_bp,
	star_text_bp,
	text_bp,
	title_bp
}) => {
	return (
		<section className={styles.best}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${bg_bp})` }}
				>
					<div
						className={styles.marquee}
						style={{ backgroundImage: `url(${running_bg})` }}
					>
						<Marquee speed={50}>
							{[...running_text, ...running_text].map((item, index) => {
								return (
									<MarqueeItem
										className={styles.marqueeItem}
										classNameImage={styles.marqueeItemImage}
										key={index}
										text={item.text}
										icon={'/fire.svg'}
									/>
								)
							})}
						</Marquee>
					</div>
					<div className={styles.wrapper}>
						<div className={styles.left}>
							<div className={styles.img}>
								<Image src={img_bp} alt={title_bp} fill draggable={false} />
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.rate}>
								<Image
									src={star_img_bp}
									alt={star_text_bp}
									width={88}
									height={16}
									unoptimized
								/>
								<Description
									className={styles.starText}
									title={ReactHtmlParser(star_text_bp)}
								/>
							</div>
							<SubHeading
								className={styles.title}
								title={ReactHtmlParser(title_bp)}
							/>
							<Description
								className={styles.descr}
								title={ReactHtmlParser(text_bp)}
							/>
							<div className={styles.btns}>
								<Button
									link={link_bp.url}
									target={link_bp.target}
									text={link_bp.title}
								/>
							</div>
						</div>
					</div>

					<div className={clsx(styles.wrapper, styles.wrapperMobile)}>
						<div className={styles.rate}>
							<Image
								src={star_img_bp}
								alt={star_text_bp}
								width={88}
								height={16}
								unoptimized
							/>
							<Description
								className={styles.starText}
								title={ReactHtmlParser(star_text_bp)}
							/>
						</div>
						<SubHeading
							className={styles.title}
							title={ReactHtmlParser(title_bp)}
						/>
						<div className={styles.img}>
							<Image src={img_bp} alt={title_bp} fill draggable={false} />
						</div>
						<Description
							className={styles.descr}
							title={ReactHtmlParser(text_bp)}
						/>
						<div className={styles.btns}>
							<Button
								link={link_bp.url}
								target={link_bp.target}
								text={link_bp.title}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BestProduct
