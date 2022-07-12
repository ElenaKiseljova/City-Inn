import gulp from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';
import config from '../config';

const copyImages = () => (
  gulp.src(`${config.src.img}/**/*`)
    .pipe(changed(config.dest.img))
    .pipe(gulpif(config.isProd, imagemin([
      imageminJpegRecompress({ quality: 75, progressive: true }),
      imageminPngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),
    ], {
      verbose: true,
    })))
    .pipe(debug({ title: 'images:' }))
    .pipe(gulp.dest(config.dest.img))
);

const convertImagesToWebp = () => (
  gulp.src(`${config.src.img}/**/*.{jpg,jpeg,png}`)
    .pipe(changed(config.dest.img, { extension: '.webp' }))
    .pipe(imagemin([
      imageminWebp({ quality: 80 }),
    ]))
    .pipe(rename({
      extname: '.webp',
    }))
    .pipe(gulp.dest(config.dest.img))
);

export const imagesBuild = gulp.series(copyImages, convertImagesToWebp);

export const imagesWatch = () => gulp.watch(`${config.src.img}/**/*`, imagesBuild); // { ignoreInitial: false },
