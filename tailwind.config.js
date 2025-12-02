/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0A0A0A',
        gold: { 
          DEFAULT: '#BF953F', 
          light: '#FCF6BA', 
          dark: '#AA771C' 
        },
        ink: '#0B0B0D',
        brandGold: '#D9AE43',
        brandPink: '#FF3C93',
        brand: {
          gold: '#D4AF37',
          'gold-light': '#FCF6BA',
          'gold-dark': '#AA771C',
          pink: '#FF3C93',
          ink: '#0B0B0D',
          charcoal: '#1A1A1D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        heading: ['Oswald', 'Impact', 'sans-serif'],
        display: ['Oswald', 'Impact', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(212, 175, 55, 0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        'gold-gradient-text': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'pink-gradient': 'linear-gradient(135deg, #FF3C93, #FF6B9D, #FF3C93)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.25)',
        'pink': '0 0 20px rgba(255, 60, 147, 0.15)',
      },
    },
  },
  plugins: [],
}
