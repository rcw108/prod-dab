import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Button.module.scss'

interface IButton {
	link: string
	className?: string
	text: string
	target?: string
}

const Button: FC<IButton> = ({ link, className, text, target }) => {
	return (
		<Link
			target={target}
			href={link}
			className={clsx(styles.button, className)}
		>
			{text}
		</Link>
	)
}

export default Button
