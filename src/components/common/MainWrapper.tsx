import { HTMLAttributes, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  baseURL?: string;
  redirectURL?: string;
};

export default function MainWrapper({ title, baseURL, redirectURL, className, children, ...props }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [secondaryTitle, setSecondaryTitle] = useState<string | null>(null);

  useEffect(() => {
    if (redirectURL && location.pathname === `/${baseURL}`) {
      navigate(`/${baseURL}/${redirectURL}`);
    }

    const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();
    if (lastPathSegment && baseURL && lastPathSegment.toLocaleLowerCase() !== baseURL?.toLocaleLowerCase()) {
      const formattedSecondaryTitle = lastPathSegment
        .replace(/-/g, ' ') // replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // capitalise the first letter of each word
      setSecondaryTitle(formattedSecondaryTitle);
    }

  }, [location, navigate]);

  return (
    <main
      className={`md:min-h-[960px] flex flex-col overflow-x-hidden flex-1 text-white rounded-2xl ${className}`}
      {...props}
    >
      <h2 className='text-center text-2xl tracking-widest font-bold py-5 rounded-t-2xl border-2 border-b-0 border-white bg-white/10 overflow-hidden whitespace-nowrap'>
        {title}{secondaryTitle && ': '}
        {
          secondaryTitle &&
          <span className='font-normal'>{secondaryTitle}</span>
        }
      </h2>
      <div className='flex flex-col flex-1 items-center overflow-x-auto rounded-b-2xl border-2 border-t-0 border-white p-3 md:p-8'>
        {children}
      </div>
    </main>
  )
}