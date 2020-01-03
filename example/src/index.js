import Vue from 'vue'
import './example.scss'
import Hello from './hello.md'

new Vue({
  el: '#app',

  components: {
    Hello,
  },

  data: {
    pageTitle: 'vue-markdown-loader demo',
  },
})
