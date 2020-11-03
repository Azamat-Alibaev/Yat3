<template>
  <div class="top-0  rounded-lg  my-2 mr-3 p-2">
    <div class="flex flex-wrap ">
      <Form
        v-for="(form, formIndex) of forms"
        :formProp="form"
        :key="formIndex"
        :form="form"
      >
      </Form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Form from '@/views/Form.vue'

export default {
  components: {
    Form
  },
  computed: {
    ...mapState(['schoolTimetable']),
    forms() {
      return this.schoolTimetable.forms
    }
  }
}
</script>
<style lang="css" scoped></style>
