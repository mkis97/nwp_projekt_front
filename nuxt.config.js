import colors from 'vuetify/es5/util/colors'

const {env} = require('./env.js')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'VTG',
    env,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/icon.png'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700|Material+Icons'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vuetify',
    {src: "@/plugins/chart", ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'eng',
            name: 'ENG',
            file: 'eng.json'
          },
          {
            code: 'hrv',
            name: 'HRV',
            file: 'hrv.json'
          }],
        detectBrowserLanguage: {
          // If enabled, a cookie is set once a user has been redirected to his
          // preferred language to prevent subsequent redirections
          // Set to false to redirect every time
          useCookie: true,
          // Cookie name
          cookieKey: 'i18n_redirected',
          // Set to always redirect to value stored in the cookie, not just once
          alwaysRedirect: true,
          // If no locale for the browsers locale is a match, use this one as a fallback
          fallbackLocale: 'hrv'
        },
        lazy: true,
        langDir: 'locales/',
        strategy: 'prefix_and_default',
        defaultLocale: 'hrv',
        parsePages: false,
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: env.apiBaseUrl
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
