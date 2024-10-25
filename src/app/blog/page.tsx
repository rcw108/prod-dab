import Blog from '@/components/screens/blog/Blog'
import { blogFieldsUrl, blogPagesUrl } from '@/configs/page.config'
import { IBLog, IBlogPage } from '@/types/blog.interface'
import { FC } from 'react'

const getBlogPosts = async () => {
	const blogPosts: IBLog[] = await fetch(blogPagesUrl).then(res => res.json())
	return blogPosts
}

const blogAcf = async () => {
	const blogFields: IBlogPage = await fetch(blogFieldsUrl).then(res =>
		res.json()
	)

	return blogFields
}

const page: FC = async () => {
	const data = await getBlogPosts()

	const fields = await blogAcf()

	return data && fields && <Blog data={data} fields={fields} />
}

export default page
