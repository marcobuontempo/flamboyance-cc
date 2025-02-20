import { MouseEvent, useEffect, useState } from "react";
import HorizontalRule from "@components/common/HorizontalRule"
import HomeIcon from '@assets/icons/home.svg?react';
import LiveDataIcon from '@assets/icons/live-data.svg?react';
import AnalyticsIcon from '@assets/icons/analytics.svg?react';
import WalletIcon from '@assets/icons/wallet.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';
import ArrowIcon from '@assets/icons/arrow.svg?react';
import SidebarLink from "@/components/layout/SidebarLink";
import SidebarButton from "./SidebarButton";
import SubMenuList from "./SubMenuList";
import '@styles/sidebar.css';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);

  // Ensure sidebar is always open on md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    // Set sidebar open initially if screen is wide enough
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(!isSidebarOpen);
      if (isSidebarOpen) {
        setSubMenuOpen(null);
      }
    }
  };

  const toggleSubMenu = (menuName: string) => {
    if (isSidebarOpen) {
      setSubMenuOpen(menuName === subMenuOpen ? null : menuName)
    }
  }

  return (
    <nav
      className={`${isSidebarOpen ? "md:w-[272px] md:min-w-[272px] md:max-w-[272px]" : "md:w-[76px] md:min-w-[76px] md:max-w-[76px]"} 
      z-50
      fixed md:sticky bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-auto w-dvw md:w-auto h-[64px] md:h-[960px] md:flex md:flex-col md:justify-between md:mr-8 md:pb-6 rounded-t-2xl md:rounded-2xl md:transition-all md:duration-300
      border-2 border-b-0 border-white/5 md:border-b-2 bg-white-black-gradient-primary overflow-hidden`}
      aria-expanded={isSidebarOpen}
    >
      {/* HEADER (w/ toggle) */}
      <div>
        <button
          className={`hidden md:flex sidebar-item relative hover:bg-white-pink-gradient`}
          aria-label='open navigation menu'
          onClick={toggleSidebar}
        >
          <img src='/images/logo.svg' width={24} height={24} className='w-6 min-w-6 mr-3' alt='Flamboyance Logo' />
          <p className={`py-3 font-semibold ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Menu</p>
          <ArrowIcon className={`${isSidebarOpen ? 'opacity-100 -rotate-90' : 'opacity-0 rotate-90'} absolute right-0 w-4 h-4 mr-2 duration-200`} />
        </button>

        <HorizontalRule className='hidden md:block mt-0' />

        <ul className="w-full flex justify-evenly md:block">
          {/* HOME */}
          <li>
            <SidebarLink
              to={'/'}
              icon={HomeIcon}
              showContents={isSidebarOpen}
              toggleSubMenu={toggleSubMenu}
              aria-label='Home'
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
              aria-label='Live Data'
            >
              Live Data
            </SidebarButton>
          </li>
          <li>
            <SubMenuList isSubMenuOpen={subMenuOpen === 'live-data'} title='Live Data'>
              <SidebarLink
                to={'/live-data/overview'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Overview
              </SidebarLink>
              <SidebarLink
                to={'/live-data/claims'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Claims
              </SidebarLink>
              <SidebarLink
                to={'/live-data/lending'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Lending
              </SidebarLink>
              <SidebarLink
                to={'/live-data/liquidity-pools'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Liquidity Pools
              </SidebarLink>
              <SidebarLink
                to={'/live-data/staking'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Staking
              </SidebarLink>
              <SidebarLink
                to={'/live-data/trades'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Trades
              </SidebarLink>
              <SidebarLink
                to={'/live-data/transfers'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Transfers
              </SidebarLink>
            </SubMenuList>
          </li>

          {/* ANALYTICS */}
          <li>
            <SidebarButton
              path='analytics'
              icon={AnalyticsIcon}
              showContents={isSidebarOpen}
              subMenuOpen={subMenuOpen}
              toggleSubMenu={toggleSubMenu}
              aria-label='Analytics'
            >
              Analytics
            </SidebarButton>
          </li>
          <li>
            <SubMenuList isSubMenuOpen={subMenuOpen === 'analytics'} title='Analytics'>
              <SidebarLink
                to={'/analytics/claims'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Claims
              </SidebarLink>
              <SidebarLink
                to={'/analytics/total-value-locked'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Total Value Locked
              </SidebarLink>
              <SidebarLink
                to={'/analytics/pools'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Pools
              </SidebarLink>
            </SubMenuList>
          </li>

          {/* WALLET */}
          <li>
            <SidebarButton
              path='wallet'
              icon={WalletIcon}
              showContents={isSidebarOpen}
              subMenuOpen={subMenuOpen}
              toggleSubMenu={toggleSubMenu}
              aria-label='Wallet'
            >
              Wallet
            </SidebarButton>
          </li>
          <li>
            <SubMenuList isSubMenuOpen={subMenuOpen === 'wallet'} title='Wallet'>
              <SidebarLink
                to={'/wallet/overview'}
                isSubMenuLink={true}
                toggleSubMenu={toggleSubMenu}
              >
                Overview
              </SidebarLink>
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
            </SubMenuList>
          </li>

          <li className="hidden md:flex">
            <SidebarLink
              to={'/settings'}
              icon={SettingsIcon}
              showContents={isSidebarOpen}
              toggleSubMenu={toggleSubMenu}
              aria-label='Settings'
            >
              Settings
            </SidebarLink>
          </li>
        </ul>
      </div>

      {/* FOOTER */}
      <div className="hidden md:block text-center text-white/15 whitespace-nowrap">{
        isSidebarOpen
          ? <>2024 &copy; flamboyance.cc</>
          : <>&copy;</>
      }
      </div>

    </nav>
  )
}