import gulp from 'gulp';
import config from '../config';

const fontsBuild = () => (
  gulp.src(`${config.src.fonts}/**/*`)
    .pipe(gulp.dest(config.dest.fonts))
);

export const assetsBuild = (cb) => {
  fontsBuild();

  cb();
};

export const assetsWatch = () => {
  gulp.watch(`${config.src.fonts}/**/*`, fontsBuild);
};
