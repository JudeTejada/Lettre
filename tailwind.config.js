module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', 'src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Charter']
      },
      colors: {
        primary: {
          black: ' #242424',
          gray: '#767676',
          white: '#fff',
          bg: '#f1f1f1'
        }
      }
    }
  },
  plugins: []
};
