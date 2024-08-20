function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export default getTimezone
