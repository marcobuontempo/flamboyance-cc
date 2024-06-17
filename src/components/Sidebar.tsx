import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarLinks } from '../types';

type Props = {
  links: SidebarLinks;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function Sidebar({ links, header, footer, }: Props) {
  return (
    <nav className='p-5 h-fit border-2 border-solid border-black'>
      {
        header &&
        <div>{header}</div>
      }

      <ul>
        {
          links.map(link => {
            return (
              <li className='p-2' key={link.to}><NavLink to={link.to}>{link.text}</NavLink></li>
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