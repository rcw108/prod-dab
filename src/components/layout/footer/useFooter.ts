import { MenuService } from '@/services/menu.service'
import { OptionService } from '@/services/options.service'
import { useQuery } from '@tanstack/react-query'

export const useFooter = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['footer'],
		queryFn: async () => {
			const options = await OptionService.getOptions()
			const menus = await MenuService.getMenu()

			return {
				options,
				menus
			}
		}
	})

	return {
		data,
		isLoading
	}
}
