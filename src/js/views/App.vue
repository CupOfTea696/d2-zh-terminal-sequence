<template>
    <div class="min-vh-100 pt-5 bg-dark text-light">
        <div class="container-md">
            <form>
                <form-row>
                    <radio name="config" v-model="config">
                        <radio-option class="arc" value="arc"><kbd>A</kbd> Arc</radio-option>
                        <radio-option class="solar" value="solar"><kbd>S</kbd> Solar</radio-option>
                        <radio-option class="void" value="void"><kbd>V</kbd> Void</radio-option>
                    </radio>
                    <number v-model="t1.left" :min="1" :max="12" mousetrap placeholder="0" name="t1-left" autofocus><kbd>/</kbd> Terminal 1 - Left</number>
                    <number v-model="t1.right" :min="1" :max="12" mousetrap placeholder="0" name="t1-right">Terminal 1 - Right</number>
                    <number v-model="t3.left" :min="1" :max="12" mousetrap placeholder="0" name="t3-left">Terminal 3 - Left</number>
                </form-row>
            </form>
        </div>
    </div>
</template>

<script>
  // import Form from '../components/Form'
  import App from '../App'
  import debounce from 'debounce'
  import FormRow from '../components/Form/Row'
  import Radio from '../components/Form/Radio'
  import RadioOption from '../components/Form/RadioOption'
  import Number from '../components/Form/Number'

  export default {
    name: 'App',
    components: {
      // Form,
      FormRow,
      Radio,
      RadioOption,
      Number,
    },
    data () {
      return {
        config: 'arc',
        t1: {
          left: null,
          right: null,
        },
        t3: {
          left: null,
        },
      }
    },
    watch: {
      config: function () {
        this.dAppReset()
      },
      't1.left': function () {
        this.dAppSolve()
      },
      't1.right': function () {
        this.dAppSolve()
      },
      't3.left': function () {
        this.dAppSolve()
      }
    },
    created() {
      App.vue = this

      this.dAppReset = debounce(() => App.reset(), 400)
      this.dAppSolve = debounce(() => App.solve(), 400)
    }
  }
</script>
