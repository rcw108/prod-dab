'use client'

import { ResetServices } from '@/services/reset.service'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Description from '../../headings/Description'
import styles from './LostPassword.module.scss'

interface ILostPassword {
	usernameOrEmail: string
}

const LostPassword: FC = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors }
	} = useForm<ILostPassword>({
		mode: 'onChange'
	})

	const [lostResponse, setLostResponse] = useState<string>('')
	const router = useRouter()

	const onSubmitFunc = async (data: ILostPassword) => {
		const response = await ResetServices.sendLinkToResetPassword(
			data.usernameOrEmail
		)

		if (response.message === 'Password reset email sent') {
			setLostResponse('Password reset email sent')
			router.push('/my-account/')
		} else {
			setLostResponse(response.message)
		}
	}

	return (
		<section className={styles.lost}>
			<Description
				className={styles.descr}
				title={
					'Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.'
				}
			/>
			{lostResponse && <h6 className={styles.res}>{lostResponse}</h6>}
			<form onSubmit={handleSubmit(onSubmitFunc)}>
				<label className={styles.req}>
					<p>Username or email</p>
					<input
						type='text'
						{...register('usernameOrEmail', {
							required: 'This field is required'
						})}
					/>
					{errors.usernameOrEmail && (
						<h6 className={styles.error}>{errors.usernameOrEmail.message}</h6>
					)}
				</label>
				<button type='submit'>Reset password</button>
			</form>
		</section>
	)
}

export default LostPassword
