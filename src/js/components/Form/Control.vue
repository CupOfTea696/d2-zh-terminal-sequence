<template>
    <div class="col form-group">
        <label :for="name"><slot></slot></label>
        <input :value="value" @input="input"
               :id="name" :name="name" :type="type" class="form-control" :class="mousetrap ? 'mousetrap' : ''"
               :placeholder="placeholder"
               :readonly="readonly"
               :autofocus="autofocus"
               :min="min"
               :max="max">
    </div>
</template>

<script>
  export default {
    name: 'Control',
    props: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      value: [String, Number, Boolean, Array, Object, Date],
      placeholder: String,
      readonly: Boolean,
      autofocus: Boolean,
      min: Number,
      max: Number,

      mousetrap: Boolean,
    },
    methods: {
      input (e) {
        this.$emit('input', this.getValue(e.target.value))
      },
      getValue (value) {
        switch (this.type) {
          case 'number':
            value = Number(value)
            break
          case 'date':
            value = new Date(value)
            break
        }

        return value
      },
    }
  }
</script>
