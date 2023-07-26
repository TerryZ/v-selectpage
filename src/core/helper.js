import { languages, EN } from '../language'
import { UP, DOWN, LEFT, RIGHT, ENTER } from './constants'

export function useLanguage (lang) {
  if (!lang) return languages[EN]

  const key = String(lang).toLowerCase()

  if (Object.hasOwn(languages, key)) return languages[key]

  return languages[EN]
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
