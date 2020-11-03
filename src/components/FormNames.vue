<template>
  <div>
    <FormWithTimeRow
      v-for="(form, formIndex) in schoolTimetable.forms"
      :key="formIndex"
      :form="form"
      :formIndex="formIndex"
      :indent="getIndent(formIndex)"
      :isEditable="globalTimetableIsEditable"
    >
    </FormWithTimeRow>
    <AddForm />
    <ToggleEditability
      :editableStateString="editableStateString"
      class="text-left"
    ></ToggleEditability>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import FormWithTimeRow from '@/components/FormWithTimeRow.vue'
import AddForm from '@/components/AddForm.vue'
import ToggleEditability from '@/components/ToggleEditability.vue'

export default {
  components: {
    FormWithTimeRow,
    AddForm,
    ToggleEditability
  },
  data() {
    const editableStateString = 'globalTimetableIsEditable'
    return { editableStateString }
  },
  computed: {
    ...mapState(['globalTimetableIsEditable', 'schoolTimetable'])
  },
  methods: {
    getIndent(formIndex: number): number {
      let indent = 0
      indent = (formIndex % 10) * 9
      return indent
    }
  }
}
</script>

<style scoped>
input {
  @apply rounded-full;
  margin-left: auto;
}
</style>
