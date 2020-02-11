module.exports = {
  important: true,
  theme: {
    boxShadow: {
      outline: '0 0 0 3px rgba(107, 70, 193, 0.5)'
    },
    container: {
      center: true,
      padding: '2rem'
    },
    fontFamily: {
      body: [
        'Nunito',
        'Roboto',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"'
      ]
    }
  },
  variants: {
    backgroundColor: ['hover', 'active', 'disabled'],
    borderColor: ['hover', 'active', 'disabled'],
    textColor: ['hover', 'active', 'disabled']
  },
  plugins: []
}
