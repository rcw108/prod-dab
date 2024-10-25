'use client'

import Description from '@/components/ui/headings/Description'
import clsx from 'clsx'
import { FC, useState } from 'react'
import {
	FieldValues,
	RegisterOptions,
	UseFormRegisterReturn
} from 'react-hook-form'
import styles from './AuthFormInput.module.scss'
interface IAuthFormInput {
	register: (
		name: string,
		options?: RegisterOptions<FieldValues, string> | undefined
	) => UseFormRegisterReturn<string>
	require?: boolean
	type?: string
	className?: string
	title: string
	name: string
	password?: boolean
}

const AuthFormInput: FC<IAuthFormInput> = ({
	name,
	register,
	title,
	className,
	require = true,
	type,
	password
}) => {
	const [show, setShow] = useState(false)

	return (
		<label
			className={clsx(styles.authInput, className, {
				[styles.password]: password
			})}
		>
			<Description className={styles.title} title={title} />

			<div className={styles.box}>
				{password ? (
					<div className={styles.show} onClick={() => setShow(!show)}></div>
				) : null}
				<input
					type={show ? 'text' : type}
					{...(register(name),
					{ required: require, minLength: 5, maxLength: 20 })}
				/>
			</div>
		</label>
	)
}

export default AuthFormInput
