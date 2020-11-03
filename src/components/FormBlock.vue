<template>
  <BaseDrop @drop="dropLessonOrBlock">
    <BaseDrag
      :transferData="{
        type: 'block',
        fromBlockIndex: blockIndex
      }"
    >
      <div class="bg-gray-700  relative m-1 p-1 rounded-lg ">
        <div
          class="px-1  items-center mb-2 font-bold m-1 p-1 rounded-full  text-gray-400"
        >
          {{ block.name }}
          <button
            v-if="isFormEditable"
            class="absolute
            handler-btn-colors
             top-0 left-0 px-1 font-bold bg-transparent"
            @click.prevent="remove"
          >
            -
          </button>
        </div>
        <div class="list-reset flex flex-col ">
          <BlockLesson
            v-for="(lesson, $lessonIndex) of block.lessons"
            :key="$lessonIndex"
            :lesson="lesson"
            :lessonIndex="$lessonIndex"
            :form="form"
            :block="block"
            :blockIndex="blockIndex"
            :blockType="blockType"
            :isEditable="isEditable"
          />
          <div class="mt-8">
            <input
              v-if="isFormEditable"
              type="text"
              class="absolute w-full text-right px-2 font-bold right-0 bottom-0 shadow-none  bg-transparent"
              placeholder="+"
              @keyup.enter="createLesson($event, block.lessons)"
            />
          </div>
        </div>
      </div>
    </BaseDrag>
  </BaseDrop>
</template>

<script>
import { mapState } from 'vuex'
import BlockLesson from '@/components/BlockLesson.vue'
import BaseDrop from '@/components/BaseDrop.vue'
import BaseDrag from '@/components/BaseDrag.vue'
import DroppingLessonOrBlockMixin from '@/mixins/DroppingLessonOrBlockMixin'

export default {
  props: {
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['isFormEditable'])
  },
  components: {
    BlockLesson,
    BaseDrop,
    BaseDrag
  },
  mixins: [DroppingLessonOrBlockMixin],
  methods: {
    createLesson(e, lessons) {
      this.$store.dispatch('createLesson', { lessons, name: e.target.value })
      e.target.value = ''
    },
    remove() {
      this.$store.dispatch('removeBlock', {
        form: this.form,
        blockToRemoveIndex: this.blockIndex
      })
    },
    pickUpLesson(e, fromLessonIndex, fromBlockIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-lesson-index', fromLessonIndex)
      e.dataTransfer.setData('from-block-index', fromBlockIndex)
      e.dataTransfer.setData('type', 'lesson')
    }
  }
}
</script>
<style lang="css">
.handler-btn-colors {
  @apply text-gray-600;
}
.handler-btn-colors:hover {
  @apply text-gray-200;
}
</style>
