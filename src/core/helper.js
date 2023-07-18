import { languages, EN } from '../language'

export function useLanguage (lang) {
  console.log(lang)
  if (!lang) return languages[EN]

  const key = String(lang).toLowerCase()

  if (Object.hasOwn(languages, key)) return languages[key]

  return languages[EN]
}
