import { MouseEvent, MouseEventHandler, ReactNode, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom"
import HorizontalRule from "@components/common/HorizontalRule"
import homeIcon from '@assets/icons/home.svg';
import liveDataIcon from '@assets/icons/live-data.svg';
import analyticsIcon from '@assets/icons/analytics.svg';
import walletIcon from '@assets/icons/wallet.svg';
import settingsIcon from '@assets/icons/settings.svg';
import arrowIcon from '@assets/icons/arrow.svg';

const DEFAULT_NAVLINK_STYLE = 'flex justify-left items-center py-3 px-6 font-semibold';

interface NavbarLinkProps extends NavLinkProps {
  isNavbarOpen: boolean;
  icon?: string;
  isSubMenuLink?: boolean;
  hasSubMenu?: boolean;
  hasSubMenuOpen?: boolean;
  className?: string;
  children: ReactNode;
}
function NavbarLink({ isNavbarOpen, icon, isSubMenuLink, hasSubMenu, hasSubMenuOpen, className, children, ...props }: NavbarLinkProps) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        (isActive || isPending)
          ? `${DEFAULT_NAVLINK_STYLE} ${className} ${isSubMenuLink ? 'bg-none hover:bg-white/10' : 'bg-white/30'}`
          : `${DEFAULT_NAVLINK_STYLE} ${className} ${isSubMenuLink ? 'font-normal text-white/50' : ''} hover:bg-white/10`
      }
      aria-expanded={hasSubMenuOpen}
      {...props}
    >
      {
        icon
          ? <img src={icon} width={24} height={24} className={`w-6 min-w-6 ${isNavbarOpen && 'mr-3'}`} alt={`${children} Icon`} />
          : <span className="w-6 min-w-6 mr-3 bg-red-500" />
      }
      <p className={`${isNavbarOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap overflow-hidden`}>{children}</p>
      {
        (hasSubMenu && isNavbarOpen) &&
        <img src={arrowIcon} width={16} height={16} className={`${hasSubMenuOpen ? 'opacity-100 rotate-180' : 'rotate-0'} absolute right-0 w-4 h-4 mr-2 duration-200`} alt='Toggle arrow' />
      }
    </NavLink>
  )
}

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNavbarOpen(!isNavbarOpen);
    if (isNavbarOpen) {
      setSubMenuOpen(null);
    }
  }

  const toggleSubMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.id;
    if (isNavbarOpen) {
      setSubMenuOpen(id === subMenuOpen ? null : id)
    }
  }

  return (
    <nav className={`${isNavbarOpen ? "w-[272px]" : "w-[76px]"} sticky flex flex-col justify-between h-[960px] mr-8 pb-6 rounded-2xl border-2 border-white bg-black-primary text-white overflow-hidden transition-all duration-300`}>
      {/* HEADER (w/ toggle) */}
      <div>
        <button
          className={`${DEFAULT_NAVLINK_STYLE} w-full pt-6 relative hover:bg-pink-primary/25`}
          aria-label="Open navigation menu"
          onClick={toggleMenu}
        >
          <img src='/images/logo.svg' width={24} height={24} className={`w-6 min-w-6`} alt='Logo' />
          <p className={`${isNavbarOpen ? 'opacity-100' : 'opacity-0'} pl-3`}>Menu</p>
          <img src={arrowIcon} width={16} height={16} className={`${isNavbarOpen ? 'opacity-100 -rotate-90' : 'opacity-0 rotate-90'} absolute right-0 w-4 h-4 mr-2 duration-200`} alt='Toggle arrow' />
        </button>

        <HorizontalRule className='mx-6' />

        <ul>
          {/* HOME */}
          <NavbarLink
            to='/'
            isNavbarOpen={isNavbarOpen}
            icon={homeIcon}
            isSubMenuLink={false}
            onClick={toggleSubMenu}
          >
            Home
          </NavbarLink>

          {/* LIVE DATA */}
          <NavbarLink
            id='live-data'
            to='/live-data'
            isNavbarOpen={isNavbarOpen}
            icon={liveDataIcon}
            isSubMenuLink={false}
            onClick={toggleSubMenu}
            hasSubMenu={true}
            hasSubMenuOpen={subMenuOpen === 'live-data'}
          >
            Live Data
          </NavbarLink>
          {
            subMenuOpen === 'live-data' &&
            <>
              <ul>
                <NavbarLink
                  to='/live-data/overview'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Overview
                </NavbarLink>
                <NavbarLink
                  to='/live-data/claims'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Claims
                </NavbarLink>
                <NavbarLink
                  to='/live-data/lending'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Lending
                </NavbarLink>
                <NavbarLink
                  to='/live-data/liquidity-pools'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Liquidity Pools
                </NavbarLink>
                <NavbarLink
                  to='/live-data/staking'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Staking
                </NavbarLink>
                <NavbarLink
                  to='/live-data/trades'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Trades
                </NavbarLink>
                <NavbarLink
                  to='/live-data/transfers'
                  isNavbarOpen={isNavbarOpen}
                  isSubMenuLink={true}
                >
                  Transfers
                </NavbarLink>
              </ul>
              <HorizontalRule className='mx-6' />
            </>
          }

          {/* ANALYTICS */}
          <NavbarLink
            id='analytics'
            to='/analytics'
            isNavbarOpen={isNavbarOpen}
            icon={analyticsIcon}
            isSubMenuLink={false}
            onClick={toggleSubMenu}
            hasSubMenu={true}
            hasSubMenuOpen={subMenuOpen === 'analytics'}
          >
            Analytics
          </NavbarLink>
          {
            subMenuOpen === 'analytics' &&
            <ul>
              <NavbarLink
                to='/analytics/overview'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Overview
              </NavbarLink>
              <NavbarLink
                to='/analytics/claims'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Claims
              </NavbarLink>
              <NavbarLink
                to='/analytics/total-value-locked'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Total Value Locked
              </NavbarLink>
              <NavbarLink
                to='/analytics/pools'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Pools
              </NavbarLink>
            </ul>
          }

          <HorizontalRule className='mx-6' />

          {/* WALLET */}
          <NavbarLink
            id='wallet'
            to='/wallet'
            isNavbarOpen={isNavbarOpen}
            icon={walletIcon}
            isSubMenuLink={false}
            onClick={toggleSubMenu}
            hasSubMenu={true}
            hasSubMenuOpen={subMenuOpen === 'wallet'}
          >
            Wallet
          </NavbarLink>
          {
            subMenuOpen === 'wallet' &&
            <ul>
              <NavbarLink
                to='/wallet/overview'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Overview
              </NavbarLink>
              <NavbarLink
                to='/wallet/claims'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Claims
              </NavbarLink>
              <NavbarLink
                to='/wallet/lending'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Lending
              </NavbarLink>
              <NavbarLink
                to='/wallet/liquidity-pools'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Liquidity Pools
              </NavbarLink>
              <NavbarLink
                to='/wallet/staking'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Staking
              </NavbarLink>
              <NavbarLink
                to='/wallet/trades'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Trades
              </NavbarLink>
              <NavbarLink
                to='/wallet/transfers'
                isNavbarOpen={isNavbarOpen}
                isSubMenuLink={true}
              >
                Transfers
              </NavbarLink>
            </ul>
          }

          <HorizontalRule className='mx-6' />

          {/* SETTINGS */}
          <NavbarLink
            to='/settings'
            isNavbarOpen={isNavbarOpen}
            icon={settingsIcon}
            isSubMenuLink={false}
            onClick={toggleSubMenu}
          >
            Settings
          </NavbarLink>
        </ul>
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