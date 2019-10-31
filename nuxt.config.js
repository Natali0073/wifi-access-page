module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wifi-access-page',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/axios',
    '@nuxt/http',
  ],

  markdownit: {
    injected: true,
  },

  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

