/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        localStorageKey: 'v3-',
    },
    async rewrites() {
        return [
            {
                source: '/cykleo/:path*',
                destination: 'https://portail.cykleo.fr/:path*'
            }
        ]
    }
}

module.exports = nextConfig
