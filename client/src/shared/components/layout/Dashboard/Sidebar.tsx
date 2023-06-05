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
      path: '/dashboard/contact',
      title: 'Contact',
      icon: () => <HiOutlineUserCircle size={20} />,
    },
    {
      path: '/dashboard/data-extension',
      title: 'Data Extension',
      icon: () => <HiOutlineServerStack size={20} />,
    },
    {
      path: '/dashboard/upload',
      title: 'Upload',
      icon: () => <HiOutlineDocumentArrowUp size={20} />,
    },
    {
      path: '/dashboard/settings',
      title: 'Settings',
      icon: () => <HiOutlineCog6Tooth size={20} />,
    },
  ];

  return (
    <aside id='default-sidebar' className=' w-64 h-screen' aria-label='Sidebar'>
      <div className='h-full py-5 bg-base-100'>
        <div className='flex flex-row justify-center mb-5'>
          <Link to='/dashboard'>
            <div className='flex'>
              <p className='text-xl font-semibold'>SFMC Cleanify</p>
            </div>
          </Link>
        </div>
        <ul className='menu'>
          {menuObj.map(({ path, title, icon }) => (
            <li key={title}>
              <Link to={path} className={isActive(path)}>
                <div className='flex items-center'>
                  {icon()}
                  <span className='ml-3'>{title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
