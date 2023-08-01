import { languages, EN } from '../language'
import { UP, DOWN, LEFT, RIGHT, ENTER, ESCAPE } from './constants'

export function useLanguage (lang) {
  if (!lang) return languages[EN]

  const key = String(lang).toLowerCase()

  if (Object.hasOwn(languages, key)) return languages[key]

  return languages[EN]
}

export function useDebounce (time = 3000) {
  let timer

  return callback => {
    clearTimeout(timer)
    timer = setTimeout(callback, time)
  }
}

export function isMultiple (attrs) {
  if (!attrs) return false
  if (!Object.hasOwn(attrs, 'multiple')) return false
  if (typeof attrs.multiple === 'boolean') return attrs.multiple
  if (attrs.multiple === '') return true
  return false
}

export function isHighlightOperation (keyCode) {
  return [UP, DOWN].includes(keyCode)
}

export function isPagingOperation (keyCode) {
  return [LEFT, RIGHT].includes(keyCode)
}

export function isSelectOperation (keyCode) {
  return ENTER === keyCode
}

export function isEscapeOperation (keyCode) {
  return ESCAPE === keyCode
}
