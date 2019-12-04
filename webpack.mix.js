const mix = require('laravel-mix');
mix.sass('assets/scss/style.scss', 'dist/css/')
.js('assets/js/main.js', 'dist/js/main.js')
.browserSync({
  proxy: 'wp.localhost',
  files: ['*.php', '*.twig', '*.js', 'dist/', 'inc/'],
  open: 'ui',
  ghostMode: false, // mirror clicks, scrolls & form inputs on all connected devices
})
.options({
  processCssUrls: false,
})
.sourceMaps(false, 'eval-source-map');
