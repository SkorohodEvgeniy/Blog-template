const { src, dest, watch, parallel, series } = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default; 
const autoprefixer = require('gulp-autoprefixer'); 
const image     = require('gulp-imagemin'); 
const webp        = require('gulp-webp'); 
const avif = require('gulp-avif');
const del          = require('del'); 

const browsersync = () => {
    browserSync.init({
        server : {
            baseDir: 'app/'
        }
    });
}


const images = () => {
    return src('app/images/**/**.{jpg,jpeg,png,svg}')
      .pipe(gulpif(isProd, image([
        image.mozjpeg({
          quality: 80,
          progressive: true
        }),
        image.optipng({
          optimizationLevel: 2
        }),
      ])))
      .pipe(dest('app/images'))
}
  
const webpImages = () => {
    return src('app/images/**/**.{jpg,jpeg,png}')
      .pipe(webp())
      .pipe(dest('app/images'))
}
  
const avifImages = () => {
    return src('app/images/**/**.{jpg,jpeg,png}')
      .pipe(avif())
      .pipe(dest('app/images'))
}
  



const cleanDist = () => {
    return del('dist')
}

const scripts = () => {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe( browserSync.stream() )
}

const styles = () => {
    return src('app/scss/style.scss')
        .pipe( scss({outputStyle: 'compressed'}) )
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            grid: 'autoplace'
        }))
        .pipe( dest('app/') )
        .pipe( browserSync.stream() )
}

const build = () => {
    return src([
        'app/style.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html',
        'app/images/**/*'
    ], {base: 'app'})
    
    .pipe(dest( 'dist'))
}

const watching = () => {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.webpImages = webpImages;
exports.avifImages = avifImages;


exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, webpImages, avifImages, browsersync, watching);