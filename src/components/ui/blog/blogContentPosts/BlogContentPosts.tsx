'use client'

import { IBLog } from '@/types/blog.interface'
import Link from 'next/link'
import { FC } from 'react'
import styles from './BlogContentPosts.module.scss'
import BlogCard from './blogCard/BlogCard'
const BlogContentPosts: FC<{ data: IBLog[] }> = ({ data }) => {
	return (
		<section className='bg-white'>
			<div className='container'>
				<div className={styles.wrap}>
					<div className={styles.bred}>
						<Link href='/'>Home</Link>
						<span>/</span>
						<span className={styles.current}>BLog</span>
					</div>
					<div className={styles.box}>
						{data.map((item, index) => (
							<BlogCard key={`${item.slug}-index`} data={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default BlogContentPosts
