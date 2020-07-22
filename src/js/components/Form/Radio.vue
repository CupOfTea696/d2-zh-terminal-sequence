<template>
    <div class="col form-group">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'Radio',
    props: {
      name: String,
      value: [String, Number, Boolean],
    },
    provide () {
      return {
        name: this.name,
        selected: this.value,
        emit: this.input,
      }
    },
    methods: {
      input (value) {
        this.$emit('input', value)
      }
    }
  }
</script>
