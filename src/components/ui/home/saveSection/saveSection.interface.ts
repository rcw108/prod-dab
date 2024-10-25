import { HomeACF } from '@/types/homepage.interface'

export interface SaveSectionProps
	extends Pick<
		HomeACF,
		| 'bg_img_left_sv'
		| 'bg_img_right_sv'
		| 'star_img_sv'
		| 'star_text_sv'
		| 'sub_title_sv'
		| 'title_sv'
		| 'text_sv'
		| 'bg_img_mobile'
	> {}
