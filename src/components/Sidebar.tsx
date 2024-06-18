import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarLinks } from '../types';

type Props = {
  links?: SidebarLinks;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Sidebar({ links, header, footer, className }: Props) {
  if (!links) {
    return null;
  }

  return (
    <nav className={`w-full h-full px-2 border-2 border-solid border-black bg-blue-50 ${className}`}>
      {
        header &&
        <div>{header}</div>
      }

      <ul>
        {
          links.map(link => {
            return (
              <li className='py-2' key={link.to}><NavLink to={link.to}>{link.text}</NavLink></li>
            )
          })
        }
      </ul>


      {
        footer &&
        <div>{footer}</div>
      }
    </nav>
  )
}