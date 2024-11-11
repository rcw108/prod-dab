import Home from '@/components/screens/home/Home'
import { homePageUrl } from '@/configs/page.config'
import { IHome } from '@/types/homepage.interface'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

const getHomeData = async () => {
	const data: IHome = await fetch(`${homePageUrl}?acf_format=standard`, {
		next: { revalidate: 3600 }
	}).then(res => res.json())
	return data
}

const HomePage: FC = async () => {
	const data = await getHomeData()

	return <>{data && <Home data={data} />}</>
}

export default HomePage
