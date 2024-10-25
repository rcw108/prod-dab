import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'primary-bg': '#0D0D0D',
				'text-white': '#fff',
				'text-black': '#0A0A0A',
				'green-accent': '#00E131',
				'black-sm': '#0D0D0D99',
				'orange-color': '#F87212'
			},
			fontFamily: {
				oswald: ['var(--font-oswald)'],
				'sofia-sans': ['var(--font-sofia-sans)'],
				mont: ['var(--font-mont)'],
				second: ['var(--font-second)'],
				rockstar: ['var(--font-rockstar)']
			}
		}
	},
	plugins: []
}
export default config
