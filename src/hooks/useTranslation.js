import { useRecoilValue } from "recoil"
import { selectedLanguage } from "../recoil/state"
import { translations } from "../translations"

export function useTranslation() {
  const language = useRecoilValue(selectedLanguage)

  const t = (key) => {
    // Get translations for the selected language
    const currentTranslations = translations[language] || translations.es

    // Return the translation or the key if not found
    return currentTranslations[key] || key
  }

  return { t }
}
