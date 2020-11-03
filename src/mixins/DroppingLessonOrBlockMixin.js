export default {
  props: {
    block: {
      type: Object,
      required: true
    },
    blockIndex: {
      type: Number,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    blockType: {
      type: String,
      required: true
    }
  },
  methods: {
    dropLessonOrBlock(transferData) {
      if (transferData.type === 'lesson') {
        this.dropLesson(transferData)
      }
      this.dropBlock(transferData)
    },
    dropLesson({ fromBlockIndex, fromLessonIndex }) {
      const fromLessons = this.form.days[fromBlockIndex].lessons
      this.$store.dispatch('dropLesson', {
        fromLessons,
        fromLessonIndex,
        toLessons: this.block.lessons,
        toLessonIndex: this.lessonIndex
      })
    },
    dropBlock({ fromBlockIndex }) {
      this.$store.dispatch('dropBlock', {
        fromBlockIndex,
        toBlockIndex: this.blockIndex,
        form: this.form
      })
    }
  }
}
