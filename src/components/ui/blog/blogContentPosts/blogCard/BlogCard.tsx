'use client'

import Description from '@/components/ui/headings/Description'
import { IBLog } from '@/types/blog.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './BlogCard.module.scss'
const BlogCard: FC<{ data: IBLog }> = ({ data }) => {
	return (
		<div className={styles.item}>
			<div className={styles.img}>
				{data.featured_image_url && (
					<Link href={`/blog/${data.slug}`}>
						<Image
							src={data.featured_image_url}
							alt={'123'}
							fill
							draggable={false}
							priority={true}
						/>
					</Link>
				)}
			</div>
			<Link className={styles.title} href={`/blog/${data.slug}`}>
				{typeof data.title === 'string' ? data.title : data.title.rendered}
			</Link>
			<Description
				className={styles.date}
				title={new Date(data.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			/>
			<Description
				className={styles.content}
				title={ReactHtmlParser(data.excerpt.rendered)}
			/>
		</div>
	)
}

export default BlogCard
