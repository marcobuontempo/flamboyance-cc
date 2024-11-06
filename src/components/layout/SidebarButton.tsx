import { MouseEvent, ReactNode, } from "react";
import { useLocation } from "react-router-dom";
import arrowIcon from "@assets/icons/arrow.svg";

interface Props {
  icon?: string;
  showContents: boolean;
  subMenuOpen: string | null;
  toggleSubMenu: any;
  path: string;
  className?: string;
  children: ReactNode;
}

export default function SidebarButton({ icon, showContents, subMenuOpen, toggleSubMenu, path, className, children, }: Props) {
  const location = useLocation();
  const isActive = location.pathname.split('/')[1] === path;

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleSubMenu(path);
  }

  return (
    <button
      className={
        (isActive)
          ? `sidebar-item sidebar-item-active ${className}`
          : `sidebar-item sidebar-item-inactive ${className}`
      }
      onClick={handleOnClick}
    >
      {
        icon
          ? <img src={icon} width={24} height={24} className={`w-6 min-w-6 ${showContents && 'mr-3'}`} alt={`${children} Icon`} />
          : <span className="w-6 min-w-6 mr-3 bg-red-500" />
      }
      <p className={`${showContents ? 'opacity-100' : 'opacity-0'} whitespace-nowrap overflow-hidden`}>{children}</p>
      {
        (showContents) &&
        <img src={arrowIcon} width={16} height={16} className={`${(subMenuOpen === path) ? 'opacity-100 rotate-180' : 'rotate-0'} absolute right-0 w-4 h-4 mr-2 duration-200`} alt='Toggle arrow' />
      }
    </button>
  )
};