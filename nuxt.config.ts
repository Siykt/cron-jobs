// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  app: {
    head: {
      title: 'AntPro Cron Jobs',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  supabase: {
    redirectOptions: {
      login: '/sign-in',
      callback: '/confirm',
      exclude: [],
    },
  },
  appConfig: {
    USERNAME: 'AntPro',
    WEBSITE_URL: 'http://localhost:3001',
  },
  modules: ['@unocss/nuxt', '@nuxtjs/eslint-module', '@nuxtjs/supabase'],
  alias: {
    lodash: 'lodash-es',
  },
  eslint: {
    lintOnStart: false,
  },
  runtimeConfig: {
    QSTASH_AUTHORIZATION: '',
    RECEIVE_EMAIL: '',
    SMTP: {
      Host: '',
      Port: '',
      TLS: '',
      User: '',
      Pass: '',
      From: '',
    },
  },
})
