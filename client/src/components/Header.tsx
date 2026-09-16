import ThemeToggle from './ThemeToggle'

import { useTranslation } from 'react-i18next'
import {
  Input
} from "@douyinfe/semi-ui"
import {
  IconLanguage,
  IconSearch,
  IconBell
} from "@douyinfe/semi-icons"

interface HeaderProps {
  currentRouteName: string
}

export default function Header({
  currentRouteName,
}: HeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="w-full h-full bg-[var(--header-bg)]">
      <nav className="flex items-center justify-between h-full px-4">
        <h4>{currentRouteName}</h4>
        <div className="flex items-center space-x-4">
          <Input placeholder={t("components.header.search_placeholder")} prefix={<IconSearch />} />
          <IconLanguage size="large"/>
          <ThemeToggle />
          <IconBell size="large"/>
        </div>
      </nav>
    </div>
  )
}
