import { HomeACF } from '@/types/homepage.interface'

export interface IBestProduct
	extends Pick<
		HomeACF,
		| 'running_bg'
		| 'running_text'
		| 'bg_bp'
		| 'img_bp'
		| 'star_img_bp'
		| 'star_text_bp'
		| 'title_bp'
		| 'text_bp'
		| 'link_bp'
	> {}
