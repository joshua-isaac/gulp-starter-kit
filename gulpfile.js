// import modules
const gulp = require('gulp'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

// set up javascript files to concat, set up array with script you want to load from first to last
const jsConcat = [
  'src/scripts/vendors/bootstrap.min.js',
  'src/scripts/vendors/vendor.js',
  'src/scripts/app.js'
]

// set up paths
const paths = {

  // main styles
  mainStyles: {
    src: 'src/styles/main.scss'
  },

  // styles
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/css',
    map: 'maps/'
  },

  // scripts
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/js'
  },

  // html
  html: {
    src: 'build/**/*.html'
  },

  // js
  js: {
    src: '/build/**/*.js'
  }

}

function style() {
  return gulp
    // input source
    .src(paths.mainStyles.src)
    // pipe tools
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('/maps/'))
    // set destination
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// create scripts function
function scripts() {
  return gulp
    // input source
    .src(jsConcat)
    // pipe tools
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    // set destination
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

// create reload function
function reload() {
  browserSync.reload();
}

// create watch function
function watch() {
  // initialize browser sync
  browserSync.init({
    // tell browser sync which directory to serve
    server: {
      baseDir: './build'
    }
  });

  // watch for changes in src/styles/**/*.scss, if change is made, run style task
  gulp.watch(paths.styles.src, style);

  // watch for changes in src/scripts/**/*.js, if change is made, run scripts task
  gulp.watch(paths.scripts.src, scripts);

  // watch for changes in build/**/*.html, if change is made, reload browser
  gulp.watch(paths.html.src).on('change', reload);

  // watch for changes in build/**/*.js, if change is made, reload browser
  gulp.watch(paths.js.src).on('change', reload);
}

// expose tasks to terminal by exporting them

// gulp watch
exports.watch = watch
// gulp style
exports.style = style
//gulp scripts
exports.scripts = scripts

// specify is tasks run together or individually by gulp.series or gulp.parallel
const build = gulp.parallel(style, scripts, watch);

gulp.task('default', build);