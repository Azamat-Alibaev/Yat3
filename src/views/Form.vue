<template>
  <div
    class="top-0 rounded-lg  
   my-2 mr-3 p-4 "
  >
    <div class=" flex flex-wrap">
      <div v-if="form.name" class="h-8 w-full">
        <div
          draggable
          class="header bg-gray-700 text-gray-200 w-56 rounded-full"
        >
          {{ form.name }}
        </div>
      </div>
      <div class="flex flex-wrap   items-start bg-gray-800 text-gray-200 ">
        <div v-if="isFormEditable" class=" bg-gray-800">
          <input
            type="text"
            class="bg-transparent   text-gray-300 "
            placeholder="+"
            @keyup.enter="createBlock($event)"
          />
        </div>
      </div>
    </div>
    <FormBlocks
      :form="form"
      :isFormEditable="isFormEditable"
      class="flex flex-wrap"
    ></FormBlocks>
    <ToggleEditability
      class=" text-left    bg-gray-800 text-gray-300"
      editableStateString="isFormEditable"
    ></ToggleEditability>
    <Foo> </Foo>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FormBlocks from '@/components/FormBlocks.vue'
import ToggleEditability from '../components/ToggleEditability'
import Foo from '@/components/Foo.vue'

export default {
  props: {
    formProp: {
      type: Object,
      default: null
    }
  },
  components: {
    ToggleEditability,
    Foo,
    FormBlocks
  },
  computed: {
    ...mapState(['isFormEditable']),
    ...mapGetters(['getFormById']),
    form() {
      const form =
        this.formProp !== null
          ? this.formProp
          : this.getFormById(this.$route.params.id)
      return form
    }
  },
  methods: {
    createBlock(e) {
      this.$store.dispatch('createBlock', {
        form: this.form,
        newBlockName: e.target.value
      })
      e.target.value = ''
    },
    toggleIsEditable() {
      this.$store.commit('TOGGLE_EDITABILITY', {
        key: 'isFormEditable',
        value: !this.isFormEditable
      })
    }
  }
}
</script>

<style lang="scss">
.isEditableTrigger {
  @apply relative text-right p-2;
  right: 0;
}
.isEditableButton {
  @apply border shadow rounded;
}
.inputDisabled {
  background: #ffffff;
}
</style>
