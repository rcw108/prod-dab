import { OptionService } from '@/services/options.service'
import { useQuery } from '@tanstack/react-query'

export const useAgePopup = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['age-popup'],
		queryFn: OptionService.getOptions
	})

	return {
		data,
		isLoading
	}
}
