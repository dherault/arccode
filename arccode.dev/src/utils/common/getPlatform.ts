const macos = /(macintosh|macintel|macppc|mac68k|macos)/i
const windows = /(win32|win64|windows|wince)/i
const ios = /(iphone|ipad|ipod)/i
const android = /android/
const linux = /linux/

function getPlatform() {
  const userAgent = window.navigator.userAgent.toLowerCase()

  if (macos.test(userAgent)) return 'macos'
  if (ios.test(userAgent)) return 'ios'
  if (windows.test(userAgent)) return 'windows'
  if (android.test(userAgent)) return 'android'
  if (linux.test(userAgent)) return 'linux'

  return 'unknown'
}

export default getPlatform
