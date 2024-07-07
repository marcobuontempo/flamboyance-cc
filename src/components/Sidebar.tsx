import { ReactNode } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SidebarLinks } from '../types';

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

  return (
    <nav className={`w-full h-full px-2 border-2 border-solid border-black bg-purple-50 neobrutalist-border-2 font-LexendMega sm:text-sm  ${className}`}>
      {header && <div>{header}</div>}

      <ul>
        {links.map(link => {
          return <li className='py-2 w-full' key={link.to}><NavLink className={({ isActive }) => isActive ? SIDELINK_ACTIVE_STYLE : SIDELINK_DEFAULT_STYLE} to={generateLink(link.to)}>{link.text}</NavLink></li>
        })}
      </ul>

      {footer && <div>{footer}</div>}
    </nav>
  )
}