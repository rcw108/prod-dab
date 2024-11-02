/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'wordpress-981839-4997700.cloudwaysapps.com',
				port: '',
				pathname: '/wp-content/uploads/**'
			},
			{
				protocol: 'https',
				hostname: 'wordpress-981839-4976343.cloudwaysapps.com',
				port: '',
				pathname: '/wp-content/uploads/**'
			},
			{
				protocol: 'https',
				hostname: 'rcw108.com',
				port: '',
				pathname: '/work/woo/wp-content/uploads/**'
			},
			{
				protocol: 'https',
				hostname: 'dabpens.com',
				port: '',
				pathname: '/wp-content/uploads/**'
			},
			{
				protocol: 'https',
				hostname: 's3.us-west-2.amazonaws.com',
				port: '',
				pathname: '/stamped.io/uploads/productImages/**'
			},
			{
				protocol: 'https',
				hostname: 's3-us-west-2.amazonaws.com',
				port: '',
				pathname: '/stamped.io/uploads/photos/thumb/**'
			}
		]
	}
}

export default nextConfig
