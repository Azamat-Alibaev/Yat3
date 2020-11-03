<template>
  <div>
    <FormBlock
      v-for="(day, $dayIndex) of form.days"
      :key="$dayIndex"
      :block="day"
      :blockIndex="$dayIndex"
      :form="form"
      :isEditable="isFormEditable"
      blockType="day"
      class=" flex"
    />
  </div>
</template>

<script>
import FormBlock from '@/components/FormBlock'
export default {
  components: {
    FormBlock
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    isFormEditable: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
