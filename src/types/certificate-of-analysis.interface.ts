export interface Test {
	name_test: string
	test_file: {
		title: string
		url: string
		target: string
	}
}

export interface Certification {
	title: string
	test: Test[]
}

export interface CertificateOfAnalysisACF {
	m_title_ser_p: string
	banner_image_sp: string
	banner_image_sp_mobile: string
	certifications_sp: Certification[]
	info_line_sp: { list: string }[]
	form_title: string
	form_bg: string
	form_description: string
}

export interface ICertificateOfAnalysis {
	content: {
		rendered: string
	}
	acf: CertificateOfAnalysisACF
}
