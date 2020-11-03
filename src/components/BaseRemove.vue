<template>
  <button
    class="font-bold rounded-full bg-gray-700 text-gray-500   outline-none hover:text-gray-300 "
    @click="remove(toRemoveType)"
  >
    -
  </button>
</template>

<script lang="js">
import Vue from "vue";

export default {
  props: {
    toRemoveType: {
      type: String,
      required: true
    },
    toRemoveIndex: {
      type: Number,
      required: true
    },
    toRemoveFrom: {
      type: Object
    }
  },
  methods: {
    remove(toRemoveType) {
      if (toRemoveType === "lesson") this.removeLesson();
      else if (toRemoveType === "form") this.removeForm();
    },
    removeLesson() {
      this.$store.dispatch("removeLesson", {
        lessonToRemoveIndex: this.toRemoveIndex,
        block: this.toRemoveFrom
      });
    },
    removeForm() {
      this.$store.dispatch("removeForm", {
        toRemoveIndex: this.toRemoveIndex,
        form: this.toRemoveFrom
      });
    }
  }
};
</script>

<style scoped></style>
