import Vue from 'vue'
import $app from './App'
import VueApp from './views/App'
import Mousetrap from 'mousetrap'

const $vue = new Vue({
  el: '#app',
  render: h => h(VueApp)
})

Mousetrap.bind('a', () => {
  $app.selectConfig('arc')
})
Mousetrap.bind('s', () => {
  $app.selectConfig('solar')
})
Mousetrap.bind('v', () => {
  $app.selectConfig('void')
})
Mousetrap.bind('/', () => {
  $app.startInput()
})
Mousetrap.bind(['right', 'return'], () => {
  $app.nextInput()
})
Mousetrap.bind('left', () => {
  $app.prevInput()
})
Mousetrap.bind('n', () => {
  $app.reset()
})

window.App = $app
