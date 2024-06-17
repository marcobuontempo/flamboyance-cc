import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

type Props = {}


const NAVLINK_DEFAULT_STYLE = 'inline-block text-sm sm:w-24 w-16 py-1 text-center';
const NAVLINK_ACTIVE_STYLE = NAVLINK_DEFAULT_STYLE + ' font-bold border-2'

export default function Navbar({ }: Props) {
  return (
    <nav className='relative mx-auto flex h-16 items-center justify-between sm:px-5 px-2'>
      <Link to='/' className='h-full flex items-end z-10 hover:contrast-125'>
        <img src='images/logo.png' className='h-full py-2 px-1 object-contain' alt='Flamboyance Logo' />
      </Link>

      <ul className='flex items-center z-10 gap-1 sm:gap-5'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? NAVLINK_ACTIVE_STYLE : NAVLINK_DEFAULT_STYLE}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/wallet'
            className={({ isActive }) => isActive ? NAVLINK_ACTIVE_STYLE : NAVLINK_DEFAULT_STYLE}>
            Wallet
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/live-data'
            className={({ isActive }) => isActive ? NAVLINK_ACTIVE_STYLE : NAVLINK_DEFAULT_STYLE}>
            Live Data
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/analytics'
            className={({ isActive }) => isActive ? NAVLINK_ACTIVE_STYLE : NAVLINK_DEFAULT_STYLE}>
            Analytics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/settings'
            className={({ isActive }) => isActive ? NAVLINK_ACTIVE_STYLE : NAVLINK_DEFAULT_STYLE}>
            <FontAwesomeIcon icon={faGears} />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}