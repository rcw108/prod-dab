'use client'
/* eslint-disable @next/next/no-img-element */
import SmallHeading from '@/components/ui/headings/SmallHeading'
import SingleMarquee from '@/components/ui/shop/marqueeLineSection/singleMarquee/SingleMarquee'
import { HomeACF } from '@/types/homepage.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import ReactHtmlParser from 'react-html-parser'
import styles from './NewHeadSection.module.scss'

interface INewHeadSection
	extends Pick<
		HomeACF,
		| 'hero_section_img'
		| 'hero_section_img_mobile'
		| 'hero_section_link'
		| 'move_line_content'
	> {}

const NewHeadSection: FC<INewHeadSection> = ({
	hero_section_img,
	hero_section_link,
	move_line_content,
	hero_section_img_mobile
}) => {
	return (
		<section className={styles.newHero}>
			<Link href={hero_section_link.url} className={styles.img}>
				<img src={hero_section_img} className={styles.desktop} alt='hero' />
				<img
					src={hero_section_img_mobile}
					className={styles.mobile}
					alt='hero'
				/>
			</Link>
			<div className={styles.line}>
				{move_line_content &&
					move_line_content.map(item => (
						<div className={styles.item} key={123 + item.icon}>
							{item.icon && typeof item.icon === 'string' && (
								<>
									<Image
										className={styles.image}
										src={item.icon}
										priority
										alt='advantage'
										width={40}
										height={40}
									/>
								</>
							)}
							<SmallHeading
								className={styles.title}
								title={ReactHtmlParser(item.text)}
							/>
						</div>
					))}
			</div>
			<div className={styles.mobileLine}>
				{move_line_content && (
					<Marquee speed={50}>
						{[...move_line_content, ...move_line_content].map((item, index) => (
							<SingleMarquee {...item} key={index} />
						))}
					</Marquee>
				)}
			</div>
		</section>
	)
}

export default NewHeadSection
