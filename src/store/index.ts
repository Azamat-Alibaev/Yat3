import { createStore, Mutation } from "vuex";
import Vue from 'vue'
import defaultSchoolTimetable from '@/default-timetable'
import { getDays } from '@/DefaultDays'
import { saveStatePlugin, uid } from '../utils'

const schoolTimetableJson = localStorage.getItem('schoolTimetable')

const schoolTimetable =
    schoolTimetableJson !== null
        ? JSON.parse(schoolTimetableJson)
        : defaultSchoolTimetable

export default createStore({
    plugins: [saveStatePlugin],
    state: {
        schoolTimetable,
        isFormEditable: false,
        globalTimetableIsEditable: false
    },
    getters: {
        getEditableStateByName: state => (editableStateString: string) => {
            if (editableStateString === 'isFormEditable') return state.isFormEditable
            else if (editableStateString === 'globalTimetableIsEditable') {
                return state.globalTimetableIsEditable
            }
        },
        getFormById: state => (id: number) => {
            return state.schoolTimetable.forms.find((form: { id: number, name: string, days: { name: string, lessons: string[], id: number }[] }) => form.id === id)
        },
        getLessonById(state) {
            return (id: string) => {
                for (const form of state.schoolTimetable.forms) {
                    for (const day of form.days) {
                        for (const lesson of day.lessons) {
                            if (lesson.id === id) {
                                return lesson
                            }
                        }
                    }
                }
            }
        }
    },
    mutations: {
        UPDATE_FORM_NAME(state, formWithNewName) {
            state.schoolTimetable.forms.filter(
                (form: { id: string, name: string, days: { name: string, lessons: string[], id: string } }) => form.id === formWithNewName.id
            ).name = formWithNewName.name
        },
        CREATE_LESSON(state, { lessons, name }) {
            lessons.push({
                name,
                id: uid()
            })
        },
        REMOVE_LESSON(state, { block, lessonToRemoveIndex }) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const lessonToDelete = block.lessons.splice(lessonToRemoveIndex, 1)[1]
        },
        UPDATE_LESSON(state, { lesson, key, value }: { lesson: string[], key: number, value: string }) {
            //Vue.set(lesson, key, value)
            lesson[key] = value
        },
        CREATE_BLOCK(state, { form, newBlockName }: { form: { id: string, name: string, days: { name: string, lessons: string[], id: string }[] }, newBlockName: string }) {
            form.days.push({
                name: newBlockName,
                lessons: [],
                id: uid()
            })
        },
        REMOVE_BLOCK(state, { form, blockToRemoveIndex }) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const blockToDelete = form.days.splice(blockToRemoveIndex, 1)[1]
        },
        CREATE_FORM(state, { newFormName }) {
            state.schoolTimetable.forms.push({
                id: uid(),
                name: newFormName,
                days: getDays()
            })
        },
        REMOVE_FORM(state, { toRemoveIndex }) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const formToDelete = state.schoolTimetable.forms.splice(
                toRemoveIndex,
                1
            )[1]
        },
        TOGGLE_EDITABILITY(state, { key, value }: { key: string, value: boolean }) {
            (key === 'isFormEditable') ? state.isFormEditable = value :
                (key === 'globalTimetableIsEditable') ? state.globalTimetableIsEditable = value : null
            //state[key] = value
        },
        DROP_LESSON(
            state,
            { fromLessons, toLessons, fromLessonIndex, toLessonIndex }
        ) {
            const lessonToMove = fromLessons.splice(fromLessonIndex, 1)[0]
            toLessons.splice(toLessonIndex, 0, lessonToMove)
        },
        DROP_BLOCK(state, { fromBlockIndex, toBlockIndex, form }) {
            const blockToMove = form.days.splice(fromBlockIndex, 1)[0]
            form.days.splice(toBlockIndex, 0, blockToMove)
        }
    },
    actions: {
        persistSchoolTimetable({ state }) {
            localStorage.setItem(
                'schoolTimetable',
                JSON.stringify(state.schoolTimetable)
            )
        },
        updateFormName({ commit, dispatch }, formWithNewName) {
            commit('UPDATE_FORM_NAME', formWithNewName)
            dispatch('persistSchoolTimetable')
        },
        createLesson({ commit, dispatch }, { lessons, name }) {
            commit('CREATE_LESSON', { lessons, name })
            dispatch('persistSchoolTimetable')
        },
        removeLesson({ commit, dispatch }, { block, lessonToRemoveIndex }) {
            commit('REMOVE_LESSON', { block, lessonToRemoveIndex })
            dispatch('persistSchoolTimetable')
        },
        updateLesson({ commit, dispatch }, { lesson, key, value }) {
            commit('UPDATE_LESSON', { lesson, key, value })
            dispatch('persistSchoolTimetable')
        },
        createBlock({ commit, dispatch }, { form, newBlockName }) {
            commit('CREATE_BLOCK', { form, newBlockName })
            dispatch('persistSchoolTimetable')
        },
        removeBlock({ commit, dispatch }, { form, blockToRemoveIndex }) {
            commit('REMOVE_BLOCK', { form, blockToRemoveIndex })
            dispatch('persistSchoolTimetable')
        },
        creatForm({ commit, dispatch }, { newFormName }) {
            commit('CREATE_FORM', { newFormName })
            dispatch('persistSchoolTimetable')
        },
        removeForm({ commit, dispatch }, { toRemoveIndex }) {
            commit('REMOVE_FORM', { toRemoveIndex })
            dispatch('persistSchoolTimetable')
        },
        dropBlock({ commit, dispatch }, { fromBlockIndex, toBlockIndex, form }) {
            commit('DROP_BLOCK', {
                fromBlockIndex,
                toBlockIndex,
                form
            })
            dispatch('persistSchoolTimetable')
        },
        dropLesson(
            { commit, dispatch },
            { fromLessons, toLessons, fromLessonIndex, toLessonIndex }
        ) {
            commit('DROP_LESSON', {
                fromLessons,
                toLessons,
                fromLessonIndex,
                toLessonIndex
            })
            dispatch('persistSchoolTimetable')
        }
    },
    modules: {}
});
