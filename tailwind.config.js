module.exports = {
  important: true,
  theme: {
    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      md:
        ' 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg:
        ' 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl:
        ' 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
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
      ],
      display: [
        'Rubik',
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
    textColor: ['hover', 'active', 'disabled']
  },
  plugins: []
}
