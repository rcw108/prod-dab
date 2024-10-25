export interface IBLog {
	title:
		| string
		| {
				rendered: string
		  }
	content:
		| string
		| {
				rendered: string
		  }
	slug: string
	date: string
	featured_image: string
	featured_image_url?: string
	excerpt: {
		rendered: string
	}
}

export interface IBlogPage {
	acf: {
		form_title: string
		form_bg: string
		form_description: string
	}
}
