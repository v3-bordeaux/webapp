/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-righteous)'],
        sans: ['var(--font-lexend-deca)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'test': '#FFF7AD',
        'primary': {
          1: '#FFF7AD',
          2: '#FFF280',
        },
        'cta': {
          1: '#FCB64F',
          2: '#FBA11D',
        },
        'secondary': {
          1: '#A4FF8E',
        },
        'background': {
          1: '#FAFAFA',
          2: '#FDF3E6',
          3: '#FBE8D0',
        },
        'text': {
          1: '#1A1A1A',
          2: '#313131',
          3: '#595959',
        },
        'backdrop': {
          1: '#ECECEC',
          2: '#282828'
        }
      }
    },
  },
  plugins: [],
}
