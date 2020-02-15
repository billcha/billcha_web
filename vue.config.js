const ansiRegex = require('ansi-regex')
module.exports = {
  transpileDependencies: [ansiRegex],
  pluginOptions: {
    i18n: {
      locale: 'ko-kr',
      fallbackLocale: 'ko-kr',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
