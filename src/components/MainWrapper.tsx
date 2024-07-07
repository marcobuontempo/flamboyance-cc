import { ReactNode, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { SidebarLinks } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
  navHeader?: ReactNode;
  navFooter?: ReactNode;
  navLinks?: SidebarLinks;
  preserveParams?: string[];
  baseURL?: string;
  redirectURL?: string;
}

export default function MainWrapper({
  children,
  navHeader,
  navFooter,
  navLinks,
  preserveParams,
  baseURL,
  redirectURL,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (redirectURL && location.pathname === `/${baseURL}`) {
      navigate(`/${baseURL}/${redirectURL}`);
    }
  }, [location, navigate]);

  return (
    <main className='w-full flex flex-wrap justify-center items-stretch flex-1 p-5 bg-blue-100'>
      {
        navLinks &&
        <div className='w-full sm:w-1/5 p-2'>
          <Sidebar
            header={navHeader}
            footer={navFooter}
            links={navLinks}
            preserveParams={preserveParams}
          />
        </div>
      }
      <div className={`w-full p-2 ${navLinks ? 'sm:w-4/5' : null}`}>
        <div className='w-full h-full border-2 border-solid border-black flex flex-col justify-center items-center'>
          {children}
        </div>
      </div>
    </main>
  )
}