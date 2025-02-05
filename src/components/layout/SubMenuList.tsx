import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLUListElement> {
  isSubMenuOpen: boolean;
}

export default function SubMenuList({ isSubMenuOpen, children }: Props) {
  return (
    <ul
      className={isSubMenuOpen ? 'flex md:block flex-col justify-evenly items-center md:w-auto md:h-full fixed md:static top-0 bottom-0 left-0 right-0 mb-[90px] mt-[64px] md:m-auto bg-black md:bg-transparent' : 'hidden md:block w-0 md:w-auto h-0 opacity-0 overflow-hidden'}
      aria-expanded={isSubMenuOpen}
    >
      {children}
    </ul>
  )
}