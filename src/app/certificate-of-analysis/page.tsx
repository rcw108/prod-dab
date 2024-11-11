import CertificateOfAnalysisPage from '@/components/screens/certificateOfAnalysis/CertificateOfAnalysisPage'
import { testingPageUrl } from '@/configs/page.config'
import { ICertificateOfAnalysis } from '@/types/certificate-of-analysis.interface'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

const fetchCertificateOfAnalysisData = async () => {
	const response: ICertificateOfAnalysis = await fetch(testingPageUrl).then(
		res => res.json()
	)
	return response
}

const CertificateOfAnalysis: FC = async () => {
	const data = await fetchCertificateOfAnalysisData()

	return data && <CertificateOfAnalysisPage data={data} />
}

export default CertificateOfAnalysis
