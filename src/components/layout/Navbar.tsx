import { MouseEvent, ReactNode, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom"
import HorizontalRule from "@components/common/HorizontalRule"
import homeIcon from '@assets/icons/home.svg';
import liveDataIcon from '@assets/icons/live-data.svg';
import analyticsIcon from '@assets/icons/analytics.svg';
import walletIcon from '@assets/icons/wallet.svg';
import settingsIcon from '@assets/icons/settings.svg';
import arrowIcon from '@assets/icons/arrow.svg';

const DEFAULT_LINK_STYLE = 'flex justify-left items-center py-3 px-6 font-medium';

interface NavbarLinkProps extends NavLinkProps {
  isNavbarOpen: boolean;
  image: string;
  children: ReactNode;
}
function NavbarLink({ isNavbarOpen, image, children, ...props }: NavbarLinkProps) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        (isActive || isPending)
          ? `${DEFAULT_LINK_STYLE} bg-white/30`
          : `${DEFAULT_LINK_STYLE} hover:bg-white/10`
      }
      {...props}
    >
      <img src={image} width={24} height={24} className={`w-6 min-w-6 ${isNavbarOpen && 'mr-3'}`} alt={`${children} Icon`} />
      {
        isNavbarOpen
        && <p className={`${isNavbarOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap overflow-hidden`}>{children}</p>
      }
    </NavLink>
  )
}

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNavbarOpen(!isNavbarOpen);
  }

  return (
    <nav className={`${isNavbarOpen ? "w-[272px]" : "w-[76px]"} sticky flex flex-col justify-between h-[960px] mr-8 pb-6 rounded-2xl border-2 border-white backdrop-blur drop-shadow bg-black-primary text-white overflow-hidden transition-all duration-300`}>
      {/* HEADER (w/ toggle) */}
      <div>
        <button
          className={`${DEFAULT_LINK_STYLE} w-full pt-6 relative hover:bg-pink-primary/25`}
          aria-label="Open navigation menu"
          onClick={toggleMenu}
        >
          <img src='/images/logo.svg' width={24} height={24} className={`w-6 min-w-6 ${isNavbarOpen && 'mr-3'}`} alt='Logo' />
          <p className={`${isNavbarOpen ? 'opacity-100' : 'opacity-0'}`}>Menu</p>
          <img src={arrowIcon} width={16} height={16} className={`absolute right-0 w-4 h-4 mr-2 -rotate-90 ${isNavbarOpen ? 'opacity-100' : 'opacity-0'}`} alt='Toggle arrow' />
        </button>

        <HorizontalRule className="mx-6" />

        <ul>
          <li>
            <NavbarLink isNavbarOpen={isNavbarOpen} to='/' image={homeIcon}>
              Home
            </NavbarLink>
          </li>
          <li>
            <NavbarLink isNavbarOpen={isNavbarOpen} to='/live-data' image={liveDataIcon}>
              Live Data
            </NavbarLink>
          </li>
          <li>
            <NavbarLink isNavbarOpen={isNavbarOpen} to='/analytics' image={analyticsIcon}>
              Analytics
            </NavbarLink>
          </li>
        </ul>

        <HorizontalRule className="mx-6" />

        <NavbarLink isNavbarOpen={isNavbarOpen} to='/wallet' image={walletIcon}>
          Wallet
        </NavbarLink>

        <HorizontalRule className="mx-6" />

        <NavbarLink isNavbarOpen={isNavbarOpen} to='/settings' image={settingsIcon}>
          Settings
        </NavbarLink>
      </div>

      {/* FOOTER */}
      <div className="text-center text-white/15 whitespace-nowrap">{
        isNavbarOpen
          ? <>2024 &copy; flamboyance.cc</>
          : <>&copy;</>
      }
      </div>

    </nav>
  )
}