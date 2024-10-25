import Description from '@/components/ui/headings/Description'
import Heading from '@/components/ui/headings/Heading'
import { IBLog } from '@/types/blog.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './BlogPage.module.scss'
const BlogPage: FC<{ data: IBLog }> = ({ data }) => {
	return (
		<main className={styles.blog}>
			<section className={styles.singleBlog}>
				<div className='container'>
					<div className={styles.bread}>
						<Link href='/'>
							Home <span>/</span>
						</Link>
						<Link href='/blog'>
							BLog <span>/</span>
						</Link>
						<span className={styles.pageName}>
							{typeof data.title === 'string'
								? data.title
								: data.title.rendered}
						</span>
					</div>
					<div className={styles.feature}>
						<Image
							fill
							src={data.featured_image}
							alt={
								typeof data.title === 'string'
									? data.title
									: data.title.rendered
							}
						/>
					</div>
					<Heading
						className={styles.title}
						title={
							typeof data.title === 'string' ? data.title : data.title.rendered
						}
					/>
					<Description
						className={styles.date}
						title={new Date(data.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					/>
					<div className={styles.content}>
						{ReactHtmlParser(
							typeof data.content === 'string'
								? data.content
								: data.content.rendered
						)}
					</div>
				</div>
			</section>
		</main>
	)
}

export default BlogPage
