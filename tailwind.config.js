/** Configuración de Tailwind CSS — tokens de marca de Beth & Ed Cake's */
module.exports = {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      colors: {
        rosa: {
          50: '#FDF4F7', 100: '#FAE6EC', 200: '#F4CBD9', 300: '#EDABBF',
          400: '#E4829F', 500: '#E23E6B', 600: '#D02A5C', 700: '#B21F4B', 800: '#8E1B3D'
        },
        tinta: {
          50: '#FBF8F7', 100: '#F3EDEB', 200: '#E6DAD6', 300: '#D9CAC5',
          400: '#B8A7A1', 500: '#A79690', 600: '#7A6862', 700: '#5E504C', 900: '#4A3733'
        },
        crema: { 100: '#FBF3E2', 200: '#F5E5C2' }
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive']
      },
      boxShadow: {
        suave: '0 2px 10px rgba(74,55,51,0.05)',
        tarjeta: '0 12px 30px -14px rgba(74,55,51,0.22)',
        elevar: '0 22px 45px -22px rgba(178,31,75,0.38)'
      },
      borderRadius: { '4xl': '2rem' }
    }
  },
  plugins: []
};
