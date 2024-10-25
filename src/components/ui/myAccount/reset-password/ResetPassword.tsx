'use client'

import { ResetServices } from '@/services/reset.service'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Description from '../../headings/Description'
import styles from './resetPassword.module.scss'

interface IReset {
	newPassword: string
}

const ResetPassword: FC = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors }
	} = useForm<IReset>({
		mode: 'onChange'
	})

	const [resetResponse, setResetResponse] = useState<string>('')

	const searchParams = useSearchParams()
	const key = searchParams.get('key')
	const login = searchParams.get('login')

	const router = useRouter()

	if (!key && !login) {
		return (
			<section className={styles.lost}>
				<Description className={styles.descr} title={'Your link no valid'} />
				<Link className='underline' href={'/my-account.lost-password'}>
					Lost Password
				</Link>
			</section>
		)
	}

	const onSubmitFunc = async (data: IReset) => {
		if (key && login) {
			const response = await ResetServices.changePasswordAfterValidate(
				login,
				key,
				data.newPassword
			)
			setResetResponse(response.message)
			if (response.message === 'Password successfully reset') {
				router.push('/my-account/')
			}
		}
	}

	return (
		<section className={styles.lost}>
			<Description className={styles.descr} title={'Enter new password'} />
			{resetResponse && <h6 className={'text-white'}>{resetResponse}</h6>}
			<form onSubmit={handleSubmit(onSubmitFunc)}>
				<label className={styles.req}>
					<p>New Password</p>
					<input
						type='text'
						{...register('newPassword', {
							required: 'This field is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters long'
							},
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message:
									'Password must contain at least one letter and one number'
							}
						})}
					/>
					{errors.newPassword && (
						<h6 className={styles.error}>{errors.newPassword.message}</h6>
					)}
				</label>
				<button type='submit'>Reset password</button>
			</form>
		</section>
	)
}

export default ResetPassword
