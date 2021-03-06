// Scripts
const scripts = require.context('./src/', true, /\.js$/);
scripts.keys().forEach(scripts);

// Styles
require('material-design-icons/iconfont/material-icons.css');
require('@fortawesome/fontawesome-free/css/all.css');
require('./src/scss/main.scss');
require.context('./src/pug/', true, /\.scss$/);