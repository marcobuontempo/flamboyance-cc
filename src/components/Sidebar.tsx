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

export default function Sidebar({ links, header, footer, className, preserveParams }: Props) {
  if (!links) {
    return null;
  }

  const [searchParams, setSearchParams] = useSearchParams();

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
    <nav className={`w-full h-full px-2 border-2 border-solid border-black bg-blue-50 ${className}`}>
      {header && <div>{header}</div>}

      <ul>
        {links.map(link => {
          return <li className='py-2' key={link.to}><NavLink to={generateLink(link.to)}>{link.text}</NavLink></li>
        })}
      </ul>

      {footer && <div>{footer}</div>}
    </nav>
  )
}