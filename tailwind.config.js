// tailwind config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f77f00',
          50: '#fffaec',
          100: '#fff5d3',
          200: '#ffe6a5',
          300: '#ffd36d',
          400: '#ffb432',
          500: '#ff9b0a',
          600: '#f77f00',
          700: '#cc6002',
          800: '#a14a0b',
          900: '#823e0c',
          950: '#461d04'
        },
        secondary: {
          DEFAULT: '#0077f7',
          '50': '#edfaff',
          '100': '#d6f2ff',
          '200': '#b5eaff',
          '300': '#83dfff',
          '400': '#48cbff',
          '500': '#1eacff',
          '600': '#068fff',
          '700': '#0077f7',
          '800': '#085ec5',
          '900': '#0d519b',
          '950': '#0e315d',
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        }

      }
    }
  },
  plugins: []
}
