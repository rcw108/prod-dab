import clsx from 'clsx'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import styles from './Headings.module.scss'
interface ISmallHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const SmallHeading: FC<ISmallHeading> = ({ title, className }) => {
	if (typeof title === 'string') {
		return <h3 className={className}>{title}</h3>
	} else {
		return <div className={clsx(styles.h3, className)}>{title}</div>
	}
}

export default SmallHeading
