import { MenuService } from '@/services/menu.service'
import { useQuery } from '@tanstack/react-query'

export const useFooter = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['footer'],
		queryFn: async () => {
			const menus = await MenuService.getMenu()

			return {
				menus
			}
		}
	})

	return {
		data,
		isLoading
	}
}
