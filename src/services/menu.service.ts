import { menuUrl } from '@/configs/layout.config'
import { Menu } from '@/types/menu.interface'
import axios from 'axios'

export const MenuService = {
	getMenu: () => {
		return axios.get<Menu[]>(menuUrl).then(res => res.data)
	}
}
