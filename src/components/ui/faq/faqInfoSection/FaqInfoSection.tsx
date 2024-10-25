'use client'

import { FAQAcf } from '@/types/faq.interface'
import clsx from 'clsx'
import { FC, useState } from 'react'
import SubHeading from '../../headings/SubHeading'
import styles from './FaqInfoSection.module.scss'
import SingleFaq from './singleFaq/SingleFaq'

interface IFaqInfoSection extends Pick<FAQAcf, 'faqs_fp'> {}

const FaqInfoSection: FC<IFaqInfoSection> = ({ faqs_fp }) => {
	// Хранит индекс открытого вопроса
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleFaq = (index: number) => {
		// Если блок уже открыт, то закроем его, иначе откроем текущий
		setOpenIndex(prevIndex => (prevIndex === index ? null : index))
	}

	return (
		<section className={styles.faqSection}>
			<div className={clsx('container', styles.wrapper)}>
				{faqs_fp.map((faq, index) => {
					// Разделяем вопросы пополам
					const middleIndex = Math.ceil(faq['question_-_answer'].length / 2)
					const leftColumn = faq['question_-_answer'].slice(0, middleIndex)
					const rightColumn = faq['question_-_answer'].slice(middleIndex)

					return (
						<div
							className={clsx(styles.item, styles[`faq-${index}`])}
							key={`faq-${index}`}
						>
							<SubHeading title={faq.title} />
							<div className={styles.wrapper}>
								{/* Левая колонка */}
								<div className={styles.left}>
									{leftColumn.map((item, leftIndex) => (
										<SingleFaq
											key={`left-${index}-${leftIndex}`}
											answer={item.answer}
											question={item.question}
											open={
												openIndex ===
												leftIndex + index * faq['question_-_answer'].length
											}
											setOpen={() =>
												toggleFaq(
													leftIndex + index * faq['question_-_answer'].length
												)
											}
										/>
									))}
								</div>

								{/* Правая колонка */}
								<div className={styles.right}>
									{rightColumn.map((item, rightIndex) => (
										<SingleFaq
											key={`right-${index}-${rightIndex}`}
											answer={item.answer}
											question={item.question}
											open={
												openIndex ===
												rightIndex +
													middleIndex +
													index * faq['question_-_answer'].length
											}
											setOpen={() =>
												toggleFaq(
													rightIndex +
														middleIndex +
														index * faq['question_-_answer'].length
												)
											}
										/>
									))}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default FaqInfoSection
