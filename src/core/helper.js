import { languages, EN } from '../language'

export function useLanguage (lang) {
  if (!lang) return languages[EN]

  const key = String(lang).toLowerCase()

  if (key in languages) return languages[key]

  return languages[EN]
}
