import { ReactNode } from 'react';
import Sidebar from "./Sidebar";
import { SidebarLinks } from '../types';

type Props = {
  children: ReactNode;
  links?: SidebarLinks;
}

export default function MainWrapper({ children, links }: Props) {
  return (
    <main className='w-full flex flex-wrap justify-center items-stretch flex-1 p-5 bg-blue-100'>
      {
        links &&
        <div className='w-full sm:w-1/5 p-2'>
          <Sidebar
            links={links}
          />
        </div>
      }
      <div className={`w-full p-2 ${links ? 'sm:w-4/5' : null}`}>
        <div className='w-full h-full border-2 border-solid border-black flex flex-col justify-center items-center'>
          {children}
        </div>
      </div>
    </main>
  )
}