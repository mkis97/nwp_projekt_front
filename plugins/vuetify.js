import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      treeShake: true,
      customVariables: ['~/assets/variables.scss'],
      dark: false,
      themes: {
        light: {
          primary: '#2e8eb3',
          accent: '#343475',
          secondary: '#c48041',
          error: '#a83636',
          success: '#84c961',
        },
      },
    },
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
