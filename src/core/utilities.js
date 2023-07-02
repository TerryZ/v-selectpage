export function setInputFocus (element) {
  if (!element) return
  element.focus({ preventScroll: true })
}
