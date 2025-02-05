import { ElementType, MouseEvent, ReactNode, } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowIcon from "@assets/icons/arrow.svg?react";

interface Props {
  icon?: ElementType;
  showContents: boolean;
  subMenuOpen: string | null;
  toggleSubMenu: any;
  path: string;
  className?: string;
  children: ReactNode;
}

export default function SidebarButton({ icon: Icon, showContents, subMenuOpen, toggleSubMenu, path, className, children, }: Props) {
  const location = useLocation();
  const isActive = location.pathname.split('/')[1] === path;
  const navigate = useNavigate();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (showContents) {
      toggleSubMenu(path);
    } else {
      navigate(`/${path}`);
    }
  }

  return (
    <button
      className={
        (isActive)
          ? `sidebar-item sidebar-item-active ${className}`
          : `sidebar-item sidebar-item-inactive ${className}`
      }
      onClick={handleOnClick}
      aria-label={showContents ? `Open ${path} sub-menu` : `Navigate to ${path} page`}
    >
      {
        Icon
          ? <Icon width={24} height={24} className={`w-6 min-w-6 ${showContents && 'md:mr-3'}`} />
          : <span className="w-6 min-w-6 md:mr-3" />
      }
      <p className={`${showContents ? 'opacity-100' : 'opacity-0'} hidden md:block whitespace-nowrap overflow-hidden`}>{children}</p>
      {
        (showContents) &&
        <ArrowIcon width={16} height={16} className={`${(subMenuOpen === path) ? 'opacity-100 rotate-180' : 'rotate-0'} hidden md:block absolute right-0 w-4 h-4 mr-2 duration-200`} />
      }
    </button>
  )
};