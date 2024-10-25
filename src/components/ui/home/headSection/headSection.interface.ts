import { HomeACF } from '@/types/homepage.interface'

export interface HeadSectionData
	extends Pick<
		HomeACF,
		| 'hero_section_title'
		| 'background_image'
		| 'start_image'
		| 'start_text'
		| 'advantages'
		| 'button_link'
		| 'right_image'
		| 'move_line_background_image'
		| 'move_line_content'
	> {}
