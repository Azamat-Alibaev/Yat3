<template>
  <div class="lesson-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        class="field"
        :value="lesson.name"
        @keyup.enter="updateLessonProperty($event, 'name')"
        @change="updateLessonProperty($event, 'name')"
        placeholder="+"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLessonById']),
    lesson() {
      return this.getLessonById(this.$route.params.id)
    }
  },
  methods: {
    updateLessonProperty(e, key) {
      this.$store.commit('UPDATE_LESSON', {
        lesson: this.lesson,
        key,
        value: e.target.value
      })
    }
  }
}
</script>

<style lang="css" scoped>
@tailwind base

.lesson-view {
  @apply bg-teal pin py-20 w-full h-full    text-left rounded shadow;
}
.field {
  @apply p-2 w-full m-2  text-xl font-bold;
}
</style>
