import BlogContentPosts from '@/components/ui/blog/blogContentPosts/BlogContentPosts'
import FormSection from '@/components/ui/home/formSection/FormSection'
import { IBLog, IBlogPage } from '@/types/blog.interface'
import { FC } from 'react'

const Blog: FC<{ data: IBLog[]; fields: IBlogPage }> = ({ data, fields }) => {
	return (
		<main>
			<BlogContentPosts data={data} />
			<FormSection
				background_image_form={fields.acf.form_bg}
				form_description={fields.acf.form_description}
				form_title={fields.acf.form_title}
				className='pt-10'
			/>
		</main>
	)
}

export default Blog
