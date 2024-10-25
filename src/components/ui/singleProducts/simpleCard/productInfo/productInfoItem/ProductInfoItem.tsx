'use client'

import Description from '@/components/ui/headings/Description'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, PropsWithChildren, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './ProductInfoItem.module.scss'
const ProductInfoItem: FC<
	PropsWithChildren<{ title: string; text: string }>
> = ({ title, text, children }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={clsx(styles.item, { [styles.open]: open })}>
			<div className={styles.top} onClick={() => setOpen(prev => !prev)}>
				<h5 className={styles.title}>{title}</h5>
				<Image src='/select.svg' alt='open/close' width={15} height={21} />
			</div>
			<div className={styles.content}>
				<div style={{ minHeight: 0 }}>
					<Description title={ReactHtmlParser(text)} />
					{children && <div className={styles.addBox}>{children}</div>}
				</div>
			</div>
		</div>
	)
}

export default ProductInfoItem
