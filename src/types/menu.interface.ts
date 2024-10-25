export interface MenuField {
	title: string
	url: string
}

export interface Menu {
	id: number
	name: string
	fields: MenuField[]
}
