import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom"
import HorizontalRule from "@components/common/HorizontalRule"
import homeIcon from '@assets/icons/home.svg';
import liveDataIcon from '@assets/icons/live-data.svg';
import analyticsIcon from '@assets/icons/analytics.svg';
import walletIcon from '@assets/icons/wallet.svg';
import settingsIcon from '@assets/icons/settings.svg';


interface NavbarLinkProps extends NavLinkProps {
  image: string;
  children: ReactNode;
}
function NavbarLink({ image, children, ...props }: NavbarLinkProps) {
  return (
    <NavLink className='flex justify-left items-center py-3 font-semibold' {...props}>
      <img src={image} width={24} height={24} className="w-6 h-6 mr-3" alt={`${children} Icon`} />
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  return (
    <nav className="flex flex-col justify-between w-[272px] h-[960px] px-6 py-3 rounded-2xl border-2 border-white backdrop-blur drop-shadow">
      <div>
        <div className='flex justify-left items-center py-3 font-semibold'>
          <img src='/images/logo.svg' width={24} height={24} className="w-6 h-6 mr-3" alt='Logo' />
          <p>Menu</p>
        </div>
        <HorizontalRule />
        <ul>
          <li>
            <NavbarLink to='/' image={homeIcon}>
              Home
            </NavbarLink>
          </li>
          <li>
            <NavbarLink to='/' image={liveDataIcon}>
              Live Data
            </NavbarLink>
          </li>
          <li>
            <NavbarLink to='/' image={analyticsIcon}>
              Analytics
            </NavbarLink>
          </li>
        </ul>
        <HorizontalRule />
        <NavbarLink to='/' image={walletIcon}>
          Wallet
        </NavbarLink>
        <HorizontalRule />
        <NavbarLink to='/' image={settingsIcon}>
          Settings
        </NavbarLink>
      </div>
      
      <div className="text-center font-medium"><span>2024</span> <span>&copy;</span> <span>flamboyance.cc</span></div>
    </nav>
  )
}