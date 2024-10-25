export interface ContactUsACF {
	title_cp: string
	banner_cp: string
	banner_cp_mobile: string
	list_cp: {
		list: string
	}[]
	form_title: string
	form_bg: string
	form_description: string
}

export interface IContactUs {
	content: {
		rendered: string
	}
	acf: ContactUsACF
}
