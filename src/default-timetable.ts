import { uid } from './utils'
import { getDays } from './DefaultDays'

export default {
  forms: [
    {
      id: uid(),
      name: '',
      days: getDays()
    }
  ]
}
