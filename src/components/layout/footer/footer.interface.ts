import { Options } from '@/types/options.interface'

export interface IFooter
	extends Pick<
		Options,
		| 'copy_text_f'
		| 'img_banks_f'
		| 'logo_f'
		| 'menu_col2_f'
		| 'menu_col3_f'
		| 'menu_col4_f'
		| 'text_bot_f'
		| 'text_f'
		| 'title_bot_f'
		| 'title_col2_f'
		| 'title_col3_f'
		| 'title_col4_f'
	> {}
