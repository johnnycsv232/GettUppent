/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        domains: ['firebasestorage.googleapis.com'],
    },

    experimental: {
        serverComponentsExternalPackages: ['firebase-admin'],
    },

    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push({
                'firebase-admin': 'commonjs firebase-admin',
                'undici': 'commonjs undici',
            });
        }
        return config;
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
            // Allow Tally embeds
            {
                source: '/pilot-intake',
                headers: [
                    { key: 'X-Frame-Options', value: 'ALLOWALL' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
