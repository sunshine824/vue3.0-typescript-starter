<template>
  <qrcode-vue :value="value"
              :size="size"
              level="H" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import QrcodeVue from 'qrcode.vue'

export default defineComponent({
  components: {
    QrcodeVue
  },
  props: {
    value: {
      type: String,
      require: true,
      default: ''
    },
    size: {
      type: Number,
      default: 100
    }
  },
  setup(props) {
    const state = reactive({
      value: props.value,
      size: props.size
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
