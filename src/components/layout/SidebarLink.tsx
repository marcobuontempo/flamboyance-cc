import { ReactNode } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

interface Props extends NavLinkProps {
  icon?: string;
  showContents?: boolean;
  isSubMenuLink?: boolean;
  toggleSubMenu: any;
  children: ReactNode;
}

export default function SidebarLink({ icon, showContents = true, isSubMenuLink, toggleSubMenu, to, className, children, ...props }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive)
          ? `sidebar-item ${isSubMenuLink ? 'sidebar-sub-item-active' : 'sidebar-item-active'} ${className}`
          : `sidebar-item ${isSubMenuLink ? 'sidebar-sub-item-inactive' : ''} ${className}`
      }
      onClick={
        (!isSubMenuLink)
          ? () => toggleSubMenu(null)
          : undefined
      }
      {...props}
    >
      {
        icon
          ? <img src={icon} width={24} height={24} className={`w-6 min-w-6 ${showContents && 'mr-3'}`} alt={`${children} Icon`} />
          : <span className="w-6 min-w-6 mr-3 bg-red-500" />
      }
      <p className={`${showContents ? 'opacity-100' : 'opacity-0'} whitespace-nowrap overflow-hidden`}>{children}</p>
    </NavLink>
  )
};