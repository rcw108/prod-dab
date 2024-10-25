import { optionsPageUrl } from '@/configs/page.config'
import { Options } from '@/types/options.interface'
import axios from 'axios'

export const OptionService = {
	getOptions: async () => {
		return await axios
			.get<Options>(`${optionsPageUrl}?acf_format=standard`)
			.then(res => res.data)
	}
}
