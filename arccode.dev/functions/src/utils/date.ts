import { DateTime } from 'luxon'

export function findLastFridayOfTheMonth() {
  let now = DateTime.now().endOf('month')

  while (now.weekday !== 5) {
    now = now.minus({ days: 1 })
  }

  return now
}

export function findThisWeekFriday() {
  return DateTime.now().startOf('week').set({ weekday: 5 })
}
