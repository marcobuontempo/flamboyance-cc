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
    <main className='w-full flex flex-wrap justify-center items-stretch flex-1 sm:p-5 p-0 bg-cyan-50 font-PublicSans'>
      {
        navLinks &&
        <div className='w-full sm:w-1/5 sm:p-2 sm:m-0 mb-5'>
          <Sidebar
            header={navHeader}
            footer={navFooter}
            links={navLinks}
            preserveParams={preserveParams}
          />
        </div>
      }
      <div className={`w-full ${navLinks ? 'sm:w-4/5 sm:p-2' : null}`}>
        <div className='w-full h-full flex flex-col justify-center items-center neobrutalist-border-2 bg-purple-100'>
          {children}
        </div>
      </div>
    </main>
  )
}