import { uid } from './utils'

export function getDays() {
    const days: { name: string, lessons: string[], id: string }[] = [
        { name: 'Monday', lessons: [], id: uid() },
        { name: 'Tuesday', lessons: [], id: uid() },
        { name: 'Wednesday', lessons: [], id: uid() },
        { name: 'Thursday', lessons: [], id: uid() },
        { name: 'Friday', lessons: [], id: uid() },
        { name: 'Unassociated', lessons: [], id: uid() }
    ]
    return days
}
