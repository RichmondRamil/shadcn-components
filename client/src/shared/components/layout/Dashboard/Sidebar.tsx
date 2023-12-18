'use client';
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineServerStack,
  HiOutlineDocumentArrowUp,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  // get the router pathname using react router dom
  const location = useLocation();
  const router = location.pathname;

  const isActive = (path: string) => {
    return router === path ? 'active' : ' hover:bg-[#8248e5]';
  };

  const menuObj = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      icon: () => <HiOutlineHome size={20} />,
    },
    {
      path: '/dashboard/email-qa',
      title: 'Email QA',
      icon: () => <HiOutlineUserCircle size={20} />,
    },
    {
      path: '/dashboard/automation-qa',
      title: 'Automation QA',
      icon: () => <HiOutlineServerStack size={20} />,
    },
    {
      path: '/dashboard/journey-qa',
      title: 'Journey QA',
      icon: () => <HiOutlineDocumentArrowUp size={20} />,
    },
    {
      path: '/dashboard/settings',
      title: 'Settings',
      icon: () => <HiOutlineCog6Tooth size={20} />,
    },
  ];

  return (
    <aside id='default-sidebar' className='bg-[#E9ECF6] w-64 h-screen text-[#1D2F64]' aria-label='Sidebar'>
      <div className='h-full py-5 bg-base-100'>
        <div className='flex flex-row justify-center mb-5'>
          <Link to='/dashboard'>
            <div className='flex'>
              <p className='text-xl font-semibold'>SFMC Cleanify</p>
            </div>
          </Link>
        </div>
        <ul className='menu flex flex-col items-center'>
          <div>
          {menuObj.map(({ path, title, icon }) => (
            <li key={title} className='mb-2'>
              <Link to={path} className={isActive(path)}>
                <div className='flex items-center'>
                  {icon()}
                  <span className='ml-3'>{title}</span>
                </div>
              </Link>
            </li>
          ))}
          </div>
        </ul>
      </div>
    </aside>
  );
}
