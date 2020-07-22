<template>
    <form class="v-form">
        <slot></slot>
    </form>
</template>

<script>
  export default {
    name: 'Form',
    provide () {
      return {
        form: this,
      }
    },
  }
</script>
