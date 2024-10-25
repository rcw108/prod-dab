'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './Footer.module.scss'
import MenuCol from './menuCol/MenuCol'
import { useFooter } from './useFooter'
const Footer: FC = () => {
	const { data, isLoading } = useFooter()

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.firstCol}>
						{isLoading ? (
							<SkeletonLoader count={1} width={'100%'} height={237} />
						) : data ? (
							<div>
								<Image
									className={styles.firstColLogo}
									src={data.options.logo_f}
									alt='logo'
									width={83}
									height={20}
								/>
								<Description
									className={styles.firstColText}
									title={ReactHtmlParser(data.options.text_f)}
								/>
								<Image
									className={styles.firstColBanks}
									src={data.options.img_banks_f}
									alt='banks'
									width={404}
									height={22}
								/>
								<Description
									className={styles.firstColCopy}
									title={ReactHtmlParser(data.options.copy_text_f)}
								/>
							</div>
						) : null}
					</div>
					<div className={styles.secondCol}>
						{isLoading ? (
							<SkeletonLoader count={1} width={'100%'} height={237} />
						) : data ? (
							<div>
								<SmallHeading
									className={styles.colTitle}
									title={ReactHtmlParser(data.options.title_col2_f)}
								/>
								<MenuCol
									menuColId={data.options.menu_col2_f}
									menus={data.menus}
									isLoading={isLoading}
								/>
							</div>
						) : null}
					</div>
					<div className={styles.thirdCol}>
						{isLoading ? (
							<SkeletonLoader count={1} width={'100%'} height={237} />
						) : data ? (
							<div>
								<SmallHeading
									className={styles.colTitle}
									title={ReactHtmlParser(data.options.title_col3_f)}
								/>
								<MenuCol
									menuColId={data.options.menu_col3_f}
									menus={data.menus}
									isLoading={isLoading}
								/>
							</div>
						) : null}
					</div>
					<div className={styles.fourthCol}>
						{isLoading ? (
							<SkeletonLoader count={1} width={'100%'} height={237} />
						) : data ? (
							<div>
								<SmallHeading
									className={styles.colTitle}
									title={ReactHtmlParser(data.options.title_col4_f)}
								/>
								<MenuCol
									menuColId={data.options.menu_col4_f}
									menus={data.menus}
									isLoading={isLoading}
								/>
							</div>
						) : null}
					</div>
				</div>
				<div className={styles.bottom}>
					{isLoading ? (
						<SkeletonLoader count={1} width={'100%'} height={150} />
					) : data ? (
						<div>
							<SmallHeading
								className={styles.bottomTitle}
								title={ReactHtmlParser(data.options.title_bot_f)}
							/>
							<Description
								className={styles.bottomText}
								title={ReactHtmlParser(data.options.text_bot_f)}
							/>
						</div>
					) : null}
				</div>
			</div>
		</footer>
	)
}

export default Footer
