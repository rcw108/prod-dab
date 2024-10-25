import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleFaq.module.scss'

interface ISingleFAq {
	question: string
	answer: string
	open: boolean
	setOpen: () => void
}

const SingleFaq: FC<ISingleFAq> = ({ answer, question, open, setOpen }) => {
	return (
		<div className={styles.item} onClick={setOpen}>
			<div className={styles.top}>
				<SmallHeading
					className='text-black'
					title={ReactHtmlParser(question)}
				/>
				<Image
					src='/caret-right-solid.svg'
					alt='caret'
					width={7}
					height={18}
					style={{ transition: 'all 0.3s ease-in-out' }}
					className={clsx({ [styles.rotate]: open })}
				/>
			</div>
			<div className={clsx(styles.content, { [styles.active]: open })}>
				<div style={{ minHeight: 0 }}>
					<Description className='text-black' title={ReactHtmlParser(answer)} />
				</div>
			</div>
		</div>
	)
}

export default SingleFaq
