// Scripts
require.context('./src/', true, /\.js$/)

// Styles
require('./src/scss/main.scss')
require.context('./src/pug/', true, /\.scss$/)
