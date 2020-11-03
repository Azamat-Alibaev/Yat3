<template>
  <div class="p-1 mt-5">
    <button
      class="rounded-full bg-gray-700 text-gray-500 font-bold py-2 px-4 hover:bg-gray-400 hover:text-gray-800 "
      @click="toggleEditability"
    >
      <div v-if="editableState" data-testid="unLockedButton">
        <p>{{ "editing" }}</p>
      </div>
      <div v-if="!editableState" data-testid="lockedButton">
        <p>{{ "watching" }}</p>
      </div>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    editableStateString: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getEditableStateByName"]),
    editableState() {
      return this.getEditableStateByName(this.editableStateString);
    }
  },
  methods: {
    toggleEditability() {
      this.$store.commit("TOGGLE_EDITABILITY", {
        key: this.editableStateString,
        value: !this.editableState
      });
    }
  }
};
</script>

<style lang="css" scoped>
button:focus {
  outline: none;
}
button {
  @apply p-2 m-2;
}
</style>
