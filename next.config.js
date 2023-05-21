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
            },
            {
                source: '/tbm/carto/:path*',
                destination: 'https://carto.infotbm.com/api/:path*',
            },
            {
                source: '/tbm/ws/:path*',
                destination: 'https://ws.infotbm.com/ws/1.0/:path*',
            },
        ]
    }
}

module.exports = nextConfig
