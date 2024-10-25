import Image from 'next/image'
import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import Heading from '../../headings/Heading'
import MarqueeItem from '../../home/headSection/marqueeItem/MarqueeItem'
import styles from './ShopHead.module.scss'
import { IShopHead } from './shopHead.interface'

const ShopHead: FC<IShopHead> = ({
	bg_image_head,
	description_head,
	marquee_bg_head,
	marquee_head,
	rate_star_image,
	rate_stars_description,
	title_head
}) => {
	return (
		<section className={styles.shopHead}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${bg_image_head})` }}
				>
					<div className={styles.top}>
						<div className={styles.rate}>
							<Image src={rate_star_image} alt='star' width={88} height={16} />
							<Description
								className={styles.descr}
								title={ReactHtmlParser(rate_stars_description)}
							/>
						</div>
						<Heading
							className={styles.title}
							title={ReactHtmlParser(title_head)}
						/>
						<Description
							className={styles.subtitle}
							title={ReactHtmlParser(description_head)}
						/>
					</div>
					<div
						className={styles.marquee}
						style={{ backgroundImage: `url(${marquee_bg_head})` }}
					>
						{marquee_head && (
							<Marquee speed={50}>
								{marquee_head.map((item, index) => {
									return (
										<MarqueeItem
											classNameText={styles.text}
											key={index}
											{...item}
										/>
									)
								})}
							</Marquee>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShopHead
