import { ElementType, ReactNode } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

interface SidebarLinkProps extends NavLinkProps {
  icon?: ElementType;
  showContents?: boolean;
  isSubMenuLink?: boolean;
  toggleSubMenu?: any;
  children: ReactNode;
}


export default function SidebarLink({ icon: Icon, showContents = true, isSubMenuLink, toggleSubMenu, to, className, children, ...props }: SidebarLinkProps) {
  const contents = (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive)
          ? `sidebar-item ${isSubMenuLink ? 'sidebar-sub-item-active' : 'sidebar-item-active'} ${className}`
          : `sidebar-item ${isSubMenuLink ? 'sidebar-sub-item-inactive' : ''} ${className}`
      }
      onClick={
        (!isSubMenuLink || window.innerWidth <= 768)
          ? () => toggleSubMenu(null)
          : undefined
      }
      {...props}
    >
      {
        Icon
          ? <Icon width={24} height={24} className={`w-6 min-w-6 ${showContents && 'md:mr-3'}`} />
          : <span className="hidden md:block w-6 min-w-6 md:mr-3" />
      }
      <p className={`${showContents ? 'opacity-100' : 'opacity-0'} ${!isSubMenuLink && 'hidden md:block'} whitespace-nowrap overflow-hidden w-full md:w-auto text-center md:text-left`}>{children}</p>
    </NavLink>
  );

  return isSubMenuLink
    ? <li className='w-full md:w-auto'>{contents}</li>
    : contents;
};