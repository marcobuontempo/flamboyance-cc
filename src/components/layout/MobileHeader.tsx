import SettingsIcon from '@assets/icons/settings.svg?react';
import { Link } from 'react-router-dom';



export default function MobileHeader() {
  return (
    <nav className='flex md:hidden justify-between items-center p-5 rounded-b-2xl border-2 border-t-0 border-white/10 fixed w-dvw top-0 left-0 right-0 h-[64px] bg-white-black-gradient-secondary z-50'>
      <Link className='flex font-semibold' to='/'>
        <img src='/images/logo.svg' width={24} height={24} className='w-6 min-w-6 mr-3' />
        Flamboyance
      </Link>
      <Link to='/settings'>
        <SettingsIcon />
      </Link>
    </nav>
  )
}