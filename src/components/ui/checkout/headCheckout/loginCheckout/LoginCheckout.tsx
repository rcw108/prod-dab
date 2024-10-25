'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import {
	authCustomer,
	validateToken
} from '@/components/ui/myAccount/customersActions'
import { useActions } from '@/hooks/useActions'
import { ValidUser } from '@/types/myAccount.interface'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, FormEvent, useState } from 'react'
import styles from '../HeadCheckout.module.scss'

const LoginCheckout: FC = () => {
	const [loginUser, setLoginUser] = useState<string>('')
	const [passwordUser, setPasswordUser] = useState<string>('')

	const { setUser } = useActions()

	const [remember, setRemember] = useState(false)

	const [errorLogin, setErrorLogin] = useState<string>()

	const [openLogin, setOpenLogin] = useState(false)

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const data = {
			login: loginUser,
			password: passwordUser
		}
		try {
			const response = await authCustomer(data)
			if (response.status === false) {
				setErrorLogin('An error occurred. Please check login and password')
			}
			const userData: ValidUser = await validateToken(response.data.jwt)

			if (userData.user) {
				const data = {
					user: userData.user,
					jwt: userData.jwt[0]
				}
				setUser(data)
			} else {
				setErrorLogin('An error occurred. Please check login and password')
			}
		} catch (error: any) {
			setErrorLogin('An error occurred. Please check login and password')
		}
	}

	return (
		<>
			<div className={styles.return}>
				<SmallHeading className={styles.title} title={'Returning customer?'} />
				<div onClick={() => setOpenLogin(!openLogin)}>
					<Description
						className={styles.action}
						title={'Click here to login'}
					/>
				</div>
			</div>
			<div
				className={clsx(styles.boxOpen, {
					[styles.open]: openLogin
				})}
			>
				<div
					className={clsx(styles.openLogin, {
						[styles.open]: openLogin
					})}
				>
					<SmallHeading
						className={styles.loginTitle}
						title={
							'If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.'
						}
					/>
					<form onSubmit={handleFormSubmit}>
						<label className={styles.req}>
							<p>Username or email</p>
							<input
								value={loginUser}
								onChange={e => setLoginUser(e.target.value)}
								type='text'
							/>
						</label>
						<label className={styles.req}>
							<p>Password</p>
							<input
								value={passwordUser}
								onChange={e => setPasswordUser(e.target.value)}
								type='password'
							/>
						</label>
						<label
							className={clsx(styles.check, {
								[styles.checked]: remember
							})}
						>
							<input
								type='checkbox'
								checked={remember}
								onChange={() => setRemember(!remember)}
							/>
							<p>Remember me</p>
						</label>
						<button className={styles.login}>Login</button>
						<Link className={styles.lost} href={'/my-account/lost-password'}>
							Lost your password?
						</Link>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginCheckout
