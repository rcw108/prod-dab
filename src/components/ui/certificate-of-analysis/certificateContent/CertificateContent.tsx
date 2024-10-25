'use client'

import { CertificateOfAnalysisACF } from '@/types/certificate-of-analysis.interface'
import Link from 'next/link'
import { FC } from 'react'
import SubHeading from '../../headings/SubHeading'
import styles from './CertificateContent.module.scss'

interface ICertificateContent
	extends Pick<CertificateOfAnalysisACF, 'certifications_sp'> {}

const CertificateContent: FC<ICertificateContent> = ({ certifications_sp }) => {
	return (
		<section className={styles.cerf}>
			<div className={styles.wrap}>
				{certifications_sp &&
					certifications_sp.map((item, index) => {
						return (
							<div className={styles.box} key={`cerf-${index}`}>
								{item.title !== '' && (
									<SubHeading className={styles.wrapText} title={item.title} />
								)}
								<div className={styles.items}>
									{item.test.map((item, index) => (
										<div className={styles.item} key={`cerf-${index}-2`}>
											<h6>{item.name_test}</h6>
											<div className={styles.divider}></div>
											{item.test_file.title && (
												<Link
													className={styles.link}
													key={`cerf-${index}`}
													href={item.test_file.url}
													target={item.test_file.target || '_blank'}
													rel='noreferrer'
												>
													{item.test_file.title}
												</Link>
											)}
										</div>
									))}
								</div>
							</div>
						)
					})}
			</div>
		</section>
	)
}

export default CertificateContent
