import Home from '@/components/screens/home/Home'
import { getAllProducts } from '@/components/ui/home/products/productActions'
import { homePageUrl } from '@/configs/page.config'
import { IHome } from '@/types/homepage.interface'
import { FC } from 'react'

export const revalidate = 1800

const getHomeData = async () => {
	const data: IHome = await fetch(`${homePageUrl}?acf_format=standard`).then(
		res => res.json()
	)
	return data
}

const HomePage: FC = async () => {
	const data = await getHomeData()

	const { products } = await getAllProducts()

	return <>{data && products && <Home products={products} data={data} />}</>
}

export default HomePage
