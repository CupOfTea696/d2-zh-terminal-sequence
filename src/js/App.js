import Lazy from 'lazy.js'
import db from './db'

const configs = {}

class App {
  #vue = null

  get db () {
    return db
  }

  get vue () {
    return this.#vue
  }

  set vue (vue) {
    if (! this.#vue) {
      this.#vue = vue
    }
  }

  selectConfig (config) {
    const el = document.getElementById('config-' + config)
    const evt = new Event('input')

    el.checked = true
    el.dispatchEvent(evt)
  }

  startInput () {
    this.getInputs().t1Left.focus()
  }

  nextInput () {
    this.getInputStage().next.focus()
  }

  prevInput () {
    this.getInputStage().prev.focus()
  }

  async solve () {
    const { t1Left, t1Right, t3Left } = this.getInputs()
    const { t1, t3 } = this.vue

    // if not at least 2 values, abort early
    if (!t1.left && !t1.right || !t1.right && !t3.left || !t1.left && !t3.left) {
      return null
    }

    console.log(this.db[this.vue.config].filter(entry => {
      return (!t1.left || t1.left === entry.t1.left) &&
        (!t1.right || t1.right === entry.t1.right) &&
        (!t3.left || t3.left === entry.t3.left)
    }).pluck('solution').toArray())

    // const config = this.vue.config
    //
    // const solutions = this.db.terminals.with({
    //   config: 'config_id',
    //   solution: 'solution_id',
    // }).where({
    //   ...(t1Left) && {t1_left: t1Left},
    //   ...(t1Right) && {t1_right: t1Right},
    //   ...(t3Left) && {t3_left: t3Left},
    //   config,
    // })
    //
    // console.log(solutions)
    //
    // return solutions
  }

  async getData (config) {
    if (! configs[config]) {
      const response = await fetch(`/data/${config}.json`)

      if (! response.ok) {
        throw new Error(`Failed to get the ${config} config`)
      }

      configs[config] = await response.json()
    }

    return configs[config]
  }

  reset () {
    const { t1Left, t1Right, t3Left } = this.getInputs()

    t1Left.value = t1Right.value = t3Left.value = ''
    t1Left.focus()
  }

  getInputs () {
    return {
      t1Left: document.getElementById('t1-left'),
      t1Right: document.getElementById('t1-right'),
      t3Left: document.getElementById('t3-left'),
    }
  }

  getInputStage () {
    const el = document.activeElement
    const { t1Left, t1Right, t3Left } = this.getInputs()

    if (el === t1Left) {
      return {
        current: t1Left,
        next: t1Right,
        prev: t3Left,
      }
    }

    if (el === t1Right) {
      return {
        current: t1Right,
        next: t3Left,
        prev: t1Left,
      }
    }

    return {
      current: el === t3Left ? t3Left : null,
      next: t1Left,
      prev: el === t3Left ? t1Right : t1Left,
    }
  }
}

export default new App
