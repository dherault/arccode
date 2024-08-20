import { DateTime } from 'luxon'

function getTimezoneOffsetAtHour(hour: number) {
  for (const timezone of (Intl as any).supportedValuesOf('timeZone')) {
    const d = DateTime.local({ zone: timezone })

    if (d.hour === hour) return -d.offset
  }

  return null
}

export default getTimezoneOffsetAtHour
