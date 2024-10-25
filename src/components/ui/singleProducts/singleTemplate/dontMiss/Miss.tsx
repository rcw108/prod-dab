'use client'

import Button from '@/components/ui/button/Button'
import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import SubHeading from '@/components/ui/headings/SubHeading'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import ProductSlider from '../../productSlider/ProductSlider'
import styles from './Miss.module.scss'
import { IMiss } from './miss.interface'

const Miss: FC<IMiss> = ({
	button_miss,
	current_price_miss,
	description_miss,
	image_gallery_miss,
	old_price_miss,
	rate_image,
	rate_text,
	save_miss,
	subscribe_text_miss,
	subtitle_miss,
	title_miss
}) => {
	return (
		<section className={styles.miss}>
			<div className='container'>
				<div className={styles.box}>
					<div className={styles.left}>
						<div className={styles.rate}>
							<Image src={rate_image} alt={rate_text} width={88} height={16} />
							<Description title={ReactHtmlParser(rate_text)} />
						</div>
						{}
						<SmallHeading
							className={styles.subHeading}
							title={ReactHtmlParser(subtitle_miss)}
						/>
						<SubHeading
							className={styles.title}
							title={ReactHtmlParser(title_miss)}
						/>
						<div className={styles.price}>
							<div className={styles.priceText}>
								<Description
									className={styles.bdi}
									title={ReactHtmlParser(old_price_miss)}
								/>
								<Description
									className={styles.ins}
									title={ReactHtmlParser(current_price_miss)}
								/>
								<Description
									className={styles.subText}
									title={ReactHtmlParser(subscribe_text_miss)}
								/>
							</div>
							<div className={styles.save}>
								<Description title={ReactHtmlParser(save_miss)} />
							</div>
						</div>
						<div className={styles.imgMobile}>
							<Image
								src={image_gallery_miss[0]}
								alt='img'
								fill
								unoptimized
								draggable={false}
							/>
						</div>
						<Description title={ReactHtmlParser(description_miss)} />
						<div className={styles.btns}>
							<Button
								link={button_miss.url}
								text={button_miss.title}
								target={button_miss.target}
							/>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.wrap}>
							{image_gallery_miss.length > 1 ? (
								<ProductSlider
									images={image_gallery_miss.map((image, index) => ({
										id: index,
										date_created: '',
										date_created_gmt: '',
										date_modified: '',
										date_modified_gmt: '',
										src: image,
										name: 'image',
										alt: 'image'
									}))}
								/>
							) : (
								<Image
									src={image_gallery_miss[0]}
									alt='img'
									fill
									unoptimized
									draggable={false}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Miss
