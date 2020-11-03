import defaultSchoolTimetable from '@/default-timetable'
import { saveStatePlugin, uid } from '../utils'

export const schooltimetable =
  JSON.parse(localStorage.getItem('schooltimetable')) || defaultSchoolTimetable
