import type { ReactNode } from 'react'
import { LocaleProvider } from '@douyinfe/semi-ui'
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN'
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US'
import { useTranslation } from 'react-i18next'

const SEMI_LOCALES = {
  zh: zh_CN,
  en: en_US,
  eo: en_US,
} as const

function getSemiLocale(language: string) {
  if (language in SEMI_LOCALES) {
    return SEMI_LOCALES[language as keyof typeof SEMI_LOCALES]
  }

  return en_US
}

export function SemiProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? i18n.language).split('-')[0]

  return (
    <LocaleProvider locale={getSemiLocale(language)}>{children}</LocaleProvider>
  )
}
