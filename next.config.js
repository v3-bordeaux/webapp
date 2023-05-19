/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/cycleo/:path*',
                destination: 'https://portail.cykleo.fr/:path*'
            }
        ]
    }
}

module.exports = nextConfig
