export function setInputFocus (element) {
  if (!element) return
  element.focus({ preventScroll: true })
}

export function isPromise (p) {
  return p && Object.prototype.toString.call(p) === '[object Promise]'
}

export function isEmptyArray (array) {
  if (!Array.isArray(array)) return true
  return !array.length
}
