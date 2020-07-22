<template>
    <div class="form-check">
        <input class="form-check-input" type="radio" :name="name" :id="id" :value="value" :checked="checked" @input="input">
        <label class="form-check-label" :for="id">
            <slot></slot>
        </label>
    </div>
</template>

<script>
  export default {
    name: 'RadioOption',
    props: {
      value: String,
    },
    inject: ['name', 'selected', 'emit'],
    computed: {
      id () {
        return this.name + '-' + this.value
      },
      checked () {
        return this.value === this.selected
      },
    },
    methods: {
      input (e) {
        this.emit(e.target.value)
      },
    },
  }
</script>
