import { ReactNode } from 'react';
import Sidebar from "./Sidebar";
import { SidebarLinks } from '../types';

type Props = {
  children: ReactNode;
  links: SidebarLinks;
}

export default function MainWrapper({ children, links }: Props) {
  return (
    <main className='flex flex-wrap justify-center items-stretch flex-1 p-5 bg-blue-100'>
      <Sidebar links={links} />
      {children}
    </main>
  )
}