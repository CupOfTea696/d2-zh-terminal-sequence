<template>
    <control :value="value" @input="input" :name="name" type="number"
             :placeholder="placeholder"
             :min="min"
             :max="max"
             :readonly="readonly"
             :autofocus="autofocus"
             :mousetrap="mousetrap">
        <slot></slot>
    </control>
</template>

<script>
  import Control from './Control'

  export default {
    name: 'Number',
    props: {
      name: {
        type: String,
        required: true,
      },
      value: Number,
      min: Number,
      max: Number,
      placeholder: String,
      readonly: Boolean,
      autofocus: Boolean,
      mousetrap: Boolean,
    },
    components: {
      Control,
    },
    methods: {
      input (e) {
        this.$emit('input', e)
      },
    },
  }
</script>
