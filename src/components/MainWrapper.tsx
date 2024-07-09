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
  className?: string;
}

export default function MainWrapper({
  children,
  navHeader,
  navFooter,
  navLinks,
  preserveParams,
  baseURL,
  redirectURL,
  className,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (redirectURL && location.pathname === `/${baseURL}`) {
      navigate(`/${baseURL}/${redirectURL}`);
    }
  }, [location, navigate]);

  return (
    <main className={`w-full flex flex-wrap sm:flex-row flex-col justify-center items-stretch flex-1 sm:p-5 px-0 py-2 bg-cyan-50 font-PublicSans ${className}`}>
      {
        (navLinks) &&
        <div className={`flex sm:flex-row flex-col sm:p-2 pb-2 max-w-1/5`}>
          <Sidebar
            header={navHeader}
            footer={navFooter}
            links={navLinks}
            preserveParams={preserveParams}
            className=''
          />
        </div>
      }
      <div className={`w-full flex-1 flex justify-center sm:items-center items-start sm:p-2 ${navLinks ? 'sm:w-4/5' : ''}`}>
        <div className={`w-full h-full flex flex-col justify-center items-center neobrutalist-border-2 bg-purple-100 p-2 sm:p-0`}>
          {children}
        </div>
      </div>
    </main>
  )
}