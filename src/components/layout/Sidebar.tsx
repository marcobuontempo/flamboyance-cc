import { MouseEvent, useState } from "react";
import HorizontalRule from "@components/common/HorizontalRule"
import HomeIcon from '@assets/icons/home.svg?react';
import LiveDataIcon from '@assets/icons/live-data.svg?react';
import AnalyticsIcon from '@assets/icons/analytics.svg?react';
import WalletIcon from '@assets/icons/wallet.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';
import ArrowIcon from '@assets/icons/arrow.svg?react';
import SidebarLink from "@/components/layout/SidebarLink";
import SidebarButton from "./SidebarButton";
import '@styles/sidebar.css';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);

  const toggleSidebar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setSubMenuOpen(null);
    }
  }

  const toggleSubMenu = (menuName: string) => {
    if (isSidebarOpen) {
      setSubMenuOpen(menuName === subMenuOpen ? null : menuName)
    }
  }

  return (
    <nav
      className={`${isSidebarOpen ? "w-[272px] min-w-[272px]" : "w-[76px] min-w-[76px]"} sticky flex flex-col justify-between h-[960px] mr-8 pb-6 rounded-2xl border-2 border-white bg-black-primary overflow-hidden transition-all duration-300`}
      aria-expanded={isSidebarOpen}
    >
      {/* HEADER (w/ toggle) */}
      <div>
        <button
          className={`sidebar-item relative hover:bg-pink-primary/25`}
          aria-label='open navigation menu'
          onClick={toggleSidebar}
        >
          <img src='/images/logo.svg' width={24} height={24} className='w-6 min-w-6 mr-3' />
          <p className={`py-3 font-semibold ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Menu</p>
          <ArrowIcon className={`${isSidebarOpen ? 'opacity-100 -rotate-90' : 'opacity-0 rotate-90'} absolute right-0 w-4 h-4 mr-2 duration-200`} />
        </button>

        <HorizontalRule className='mt-0' />

        <ul>
          {/* HOME */}
          <li>
            <SidebarLink
              to={'/'}
              icon={HomeIcon}
              showContents={isSidebarOpen}
              toggleSubMenu={toggleSubMenu}
            >
              Home
            </SidebarLink>
          </li>

          {/* LIVE DATA */}
          <li>
            <SidebarButton
              path='live-data'
              icon={LiveDataIcon}
              showContents={isSidebarOpen}
              subMenuOpen={subMenuOpen}
              toggleSubMenu={toggleSubMenu}
            >
              Live Data
            </SidebarButton>
          </li>
          <ul
            className={(subMenuOpen === 'live-data') ? 'h-full' : 'h-0 opacity-0 overflow-hidden'}
            aria-expanded={subMenuOpen === 'live-data'}
          >
            <li>
              <SidebarLink
                to={'/live-data/overview'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Overview
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/live-data/claims'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Claims
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/live-data/lending'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Lending
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/live-data/liquidity-pools'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Liquidity Pools
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/live-data/staking'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Staking
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/live-data/trades'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Trades
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/live-data/transfers'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Transfers
              </SidebarLink>
            </li>
          </ul>

          {/* ANALYTICS */}
          <li>
            <SidebarButton
              path='analytics'
              icon={AnalyticsIcon}
              showContents={isSidebarOpen}
              subMenuOpen={subMenuOpen}
              toggleSubMenu={toggleSubMenu}
            >
              Analytics
            </SidebarButton>
          </li>
          <ul
            className={(subMenuOpen === 'analytics') ? 'h-full' : 'h-0 opacity-0 overflow-hidden'}
            aria-expanded={subMenuOpen === 'analytics'}
          >
            <li>
              <SidebarLink
                to={'/analytics/claims'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Claims
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/analytics/total-value-locked'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Total Value Locked
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/analytics/pools'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Pools
              </SidebarLink>
            </li>
          </ul>

          {/* WALLET */}
          <li>
            <SidebarButton
              path='wallet'
              icon={WalletIcon}
              showContents={isSidebarOpen}
              subMenuOpen={subMenuOpen}
              toggleSubMenu={toggleSubMenu}
            >
              Wallet
            </SidebarButton>
          </li>
          <ul
            className={(subMenuOpen === 'wallet') ? 'h-full' : 'h-0 opacity-0 overflow-hidden'}
            aria-expanded={subMenuOpen === 'wallet'}
          >
            <li>
              <SidebarLink
                to={'/wallet/overview'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Overview
              </SidebarLink>
            </li>
            {/* WALLET MENUS CURRENTLY NOT ACCESSIBLE */}
            {/* <li>
              <SidebarLink
                to={'/wallet/claims'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Claims
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/wallet/lending'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Lending
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/wallet/liquidity-pools'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Liquidity Pools
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/wallet/staking'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Staking
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/wallet/trades'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Trades
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                to={'/wallet/transfers'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Transfers
              </SidebarLink>
            </li> */}
          </ul>

          <li>
            <SidebarLink
              to={'/settings'}
              icon={SettingsIcon}
              showContents={isSidebarOpen}
              toggleSubMenu={toggleSubMenu}
            >
              Settings
            </SidebarLink>
          </li>
        </ul>
      </div>

      {/* FOOTER */}
      <div className="text-center text-white/15 whitespace-nowrap">{
        isSidebarOpen
          ? <>2024 &copy; flamboyance.cc</>
          : <>&copy;</>
      }
      </div>

    </nav>
  )
}