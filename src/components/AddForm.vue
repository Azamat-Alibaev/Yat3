<template>
  <div class="m-2 w-full h-8">
    <input
      class="bg-transparent p-1 mx-4 w-40 r-align"
      type="text"
      placeholder="+ Add Form"
      @keyup.enter="addForm"
    />
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['schooltimetable'])
  },
  methods: {
    addForm(e) {
      const newFormName  = e.target.value
      this.$store.dispatch('creatForm', { newFormName })
      e.target.value = ''
    }
  }
}
</script>

<style scoped>
.r-align {
  float: right;
  overflow: auto;
}
</style>
