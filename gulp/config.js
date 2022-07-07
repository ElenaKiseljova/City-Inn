const srcPath = 'source';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    pug: `${srcPath}/pug`,
    fonts: `${srcPath}/assets/fonts`,
    img: `${srcPath}/assets/img`,
    iconsMono: `${srcPath}/assets/img/icons/mono`,
    iconsMulti: `${srcPath}/assets/img/icons/multi`,
  },

  dest: {
    root: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    html: `${destPath}`,
    fonts: `${destPath}/fonts`,
    img: `${destPath}/img`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
