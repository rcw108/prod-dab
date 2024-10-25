import { SimpleSingleACF } from '@/types/singleTemplates/simpleSingle.interface'

export interface IMiss
	extends Pick<
		SimpleSingleACF,
		| 'rate_image'
		| 'rate_text'
		| 'subtitle_miss'
		| 'save_miss'
		| 'title_miss'
		| 'button_miss'
		| 'old_price_miss'
		| 'description_miss'
		| 'current_price_miss'
		| 'image_gallery_miss'
		| 'subscribe_text_miss'
	> {}
