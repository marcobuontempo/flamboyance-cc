import { MouseEvent, ReactNode, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SidebarLinks } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
  links?: SidebarLinks;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  preserveParams?: string[];
}

const SIDELINK_DEFAULT_STYLE = 'neobrutalist-border-1 w-full block text-center py-1 bg-purple-100 hover:bg-purple-200';
const SIDELINK_ACTIVE_STYLE = 'font-bold bg-purple-200 ' + SIDELINK_DEFAULT_STYLE

export default function Sidebar({ links, header, footer, className, preserveParams }: Props) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  if (!links) {
    return null;
  }

  const [searchParams] = useSearchParams();

  const generateLink = (linkTo: string) => {
    if (preserveParams === undefined || preserveParams.length === 0) {
      return linkTo;
    }

    let preserveCount = 0;
    searchParams.forEach((value, key) => {
      if (preserveParams && preserveParams.find(param => param === key)) {
        linkTo += (preserveCount === 0) ? '?' : '&';
        linkTo += `${key}=${value}`;
        preserveCount++;
      }
    })
    return linkTo;
  }

  const handleToggleSidebar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <nav className={`flex sm:flex-row flex-col border-2 border-solid border-black bg-purple-50 neobrutalist-border-2 font-LexendMega sm:text-sm  ${className}`}>
      <button className={`sm:w-8 w-full bg-purple-200 p-1 text-center border-solid border-black hover:bg-purple-300 overflow-hidden ${sidebarVisible ? 'sm:border-r-2 border-b-2' : 'border-0'}`} onClick={handleToggleSidebar}>
        <FontAwesomeIcon icon={faArrowRight} className={`rotate-270 sm:rotate-0 ${sidebarVisible ? 'rotate-90 sm:rotate-180' : null}`} />
      </button>
      {
        (sidebarVisible) &&
        <div className='flex-1'>
          {header && <div className='p-2 w-full'>{header}</div>}

          <ul className='p-2'>
            {links.map(link => {
              return (
                <li className='py-2 w-full' key={link.to}>
                  <NavLink className={({ isActive }) => isActive ? SIDELINK_ACTIVE_STYLE : SIDELINK_DEFAULT_STYLE} to={generateLink(link.to)}>{link.text}</NavLink>
                </li>
              )
            })}
          </ul>

          {footer && <div>{footer}</div>}
        </div>
      }
    </nav>
  )
}