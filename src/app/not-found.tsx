import NotFound from '@/components/screens/notFound/NotFound'
import { getAllProducts } from '@/components/ui/home/products/productActions'
import { errorPageUrl } from '@/configs/page.config'
import { NotFoundPage as INotFoundPage } from '@/types/errorPage.interface'
import { FC } from 'react'

const fetchPageContent = async () => {
	const res: INotFoundPage = await fetch(errorPageUrl).then(res => res.json())
	return res
}

const NotFoundPage: FC = async () => {
	const data = await fetchPageContent()

	const { products } = await getAllProducts()

	return data && products && <NotFound data={data} products={products} />
}

export default NotFoundPage
