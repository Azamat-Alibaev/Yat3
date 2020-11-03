<template>
  <div class="rounded-full m-1 py-1 pl-1 relative bg-gray-800">
    <div
      @click.self="goToForm(form)"
      class="items-center  shadow  w-24 flex   no-underline relative bg-gray-700 rounded-full"
      :style="computedStyle"
    >
      <input
        class="m-1 py-1   pr-4 bg-gray-800 text-gray-200 w-9/12 px-2 rounded-full"
        v-model="form.name"
        type="text"
        @blur="updateValue"
        @keyup.enter="updateValue"
        :disabled="!isEditable"
        placeholder="Form"
        data-testid="formName"
        value
      />
      <BaseRemove
        v-if="isEditable"
        :toRemoveIndex="formIndex"
        toRemoveType="form"
        class="absolute  right-0 mr-3 pl-1 h-1 top-0 "
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import BaseRemove from '@/components/BaseRemove.vue'
export default {
  components: {
    BaseRemove
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    formIndex: {
      type: Number,
      required: true
    },
    indent: {
      type: Number,
      required: true
    },
    isEditable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    goToForm(form) {
      this.$router.push({ name: 'form', params: { id: form.id } })
    },
    updateValue() {
      this.$store.dispatch('updateFormName', this.form)
    }
  },
  computed: {
    computedStyle() {
      return `left: ${this.indent}vw`
    },
    ...mapState(['schoolTimetable']),
    ...mapActions(['updateFormName']),
    ...mapGetters(['getFormById']),

    clickedForm() {
      return this.getFormById(this.form.id)
    }
  }
}
</script>

<style lang="css">
.clearfix {
  overflow: auto;
}
</style>
