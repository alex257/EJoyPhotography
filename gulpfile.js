const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  gulpCopy = require("gulp-copy"),
  terser = require("gulp-terser");

function style() {
  return (
    gulp
      // .src("src/scss/**/*.scss", {
      .src("src/scss/*.scss", {
        sourcemaps: true,
      })

      .pipe(sass().on("error", sass.logError))

      .pipe(
        autoprefixer({
          cascade: false,
        })
      )

      .pipe(gulp.dest("dist/css"))

      .pipe(browserSync.stream())
  );
}

function js() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write())

    .pipe(gulp.dest("dist/js"));
}

function copyHtml() {
  return gulp
    .src("src/*.html")
    .pipe(browserSync.stream())
    .pipe(gulp.dest("dist"));
}

function copyImages() {
  return gulp.src("src/img/*.{gif,jpg,png,svg}").pipe(gulp.dest("dist/img"));
}

/*function copyIcons() {
  return gulp.src("src/icons/*.{gif,jpg,png,svg}").pipe(gulp.dest("dist/icons"));
}*/

function copyFonts() {
  return gulp.src("src/fonts/*.{txt,ttf}").pipe(gulp.dest("dist/fonts"));
}

function js() {
  return gulp
    .src("src/js/*.js")
    .pipe(browserSync.stream())
    .pipe(gulp.dest("dist/js/"));
}

function watch() {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch("src/scss/**/*.scss", style);
  gulp.watch("src/*.html", copyHtml);
  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/img/*.{gif,jpg,png,svg}", copyImages);
  gulp.watch("src/fonts/*.{txt,ttf}", copyFonts);
  //gulp.watch("src/icons/*.{gif,jpg,png,svg}", copyIcons);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.copyHtml = copyHtml;
exports.copyImages = copyImages;
//exports.copyIcons = copyIcons;
exports.copyFonts = copyFonts;
exports.js = js;
exports.watch = watch;
exports.default = build;

var build = gulp.parallel(style, copyHtml, copyImages, copyFonts, js, watch);
gulp.task(build);
gulp.task("default", build);
