import logo from '@/assets/home/main-logo.png'

import { useTranslation } from "react-i18next"
import { Nav } from "@douyinfe/semi-ui"
import type { NavItems, OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation"
import { IconHome } from '@douyinfe/semi-icons'

export default function ASide() {
  const { t } = useTranslation()
  const navItems: NavItems = [
    { 
      itemKey: 'dashboard', 
      text: t('components.aside.dashboard'), 
      icon: <IconHome />, 
      style: { 
        height: '60px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      } 
    }
  ]

  const handleSelect = (item: OnSelectedData) => {
    console.log(item)
  }

  const handleClick = (data: unknown) => {
    console.log(data)
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-[var(--aside-bg)]">
      <div className="w-[200px]">
        <img src={logo} alt="logo" className="w-full h-full object-contain" />
      </div>
      <div 
        className="w-[200px] h-[2px] bg-gradient-to-r from-[#F1F6FF] via-[#3063DB] to-[#F1F6FF] to-50% to-100%"
      />
      <Nav
        className="!w-full flex-grow-1 !px-0 !bg-[var(--aside-bg)]"
        items={navItems}
        onSelect={handleSelect}
        onClick={handleClick}
      >

      </Nav>
    </div>
  )
}