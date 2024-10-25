import BlogPage from '@/components/screens/blog/BlogPage'
import { blogPagesUrl } from '@/configs/page.config'
import { IBLog } from '@/types/blog.interface'
import { FC } from 'react'

const getSinglePost = async (slug: string) => {
	const data: IBLog = await fetch(
		`${blogPagesUrl}/${slug}?acf_format=standard`
	).then(res => res.json())

	return data
}

const page: FC<{ params: { slug: string } }> = async ({ params }) => {
	const data = await getSinglePost(params.slug)

	return data && <BlogPage data={data} />
}

export default page
