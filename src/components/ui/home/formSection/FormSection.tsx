'use client'

import { HomeACF } from '@/types/homepage.interface'
import clsx from 'clsx'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import styles from './FormSection.module.scss'
import { useFormSection } from './useFormSection'

interface IFormSection
	extends Pick<
		HomeACF,
		'background_image_form' | 'form_description' | 'form_title'
	> {
	className?: string
}

const FormSection: FC<IFormSection> = ({
	background_image_form,
	form_description,
	form_title,
	className
}) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm({ mode: 'onChange' })

	const { isError, isLoading, onSubmit, setIsError, success, setSuccess } =
		useFormSection()

	const formSubmit = async () => {
		const res = await onSubmit('VuHzSL', getValues('email'))
		if (res.success === true) setSuccess(true)
	}

	return (
		<section className={clsx(styles.form, className)}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${background_image_form})` }}
				>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(form_title)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(form_description)}
					/>
					<div>
						{isError ? (
							<div>
								Something went wrong. Please try again.
								<button
									onClick={() => setIsError(false)}
									className={styles.btn}
								>
									Try again
								</button>
							</div>
						) : success ? (
							<div className={styles.success}>
								<h4>Thanks for subscribing!</h4>
								<Description
									className={styles.successDescr}
									title={'Check your email for a confirmation message.'}
								/>
							</div>
						) : (
							<form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
								<input
									className={styles.email}
									type='email'
									placeholder='Email'
									{...register('email', { required: true })}
								/>
								{errors.email && (
									<span className={styles.error}>This field is required</span>
								)}

								<button
									disabled={isLoading}
									style={{ backgroundColor: isLoading ? '#ad4902' : '#f87212' }}
									className={styles.btn}
									type='submit'
								>
									Subscribe
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default FormSection
