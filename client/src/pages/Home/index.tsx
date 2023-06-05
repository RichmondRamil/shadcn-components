import { useEffect } from 'react';
// DEPENDENCIES
import { HiArrowSmallRight } from 'react-icons/hi2';
import { themeChange } from 'theme-change';
// COMPONENTS
import Footer from '../../shared/components/common/Footer';
// LOGO
import Logo from '../../shared/assets/img/ad-logo-light.png';

const themeName = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
];

const packages = [
  {
    name: 'React',
    link: 'https://reactjs.org/',
    description: 'A JavaScript library for building user interfaces',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
  },
  {
    name: 'Tailwindcss',
    link: 'https://tailwindcss.com/',
    description:
      'A utility-first CSS framework for rapidly building custom designs.',
    logo: 'https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png',
  },
  {
    name: 'Daisyui',
    link: 'https://daisyui.com/',
    description: 'A component library for Tailwind CSS & React',
    logo: 'https://raw.githubusercontent.com/saadeghi/files/main/daisyui/logo-4.svg',
  },
  {
    name: 'React Router Dom',
    link: 'https://reactrouter.com/web/guides/quick-start',
    description: 'Declarative routing for React',
    logo: 'https://seeklogo.com/images/R/react-router-logo-AB5BFB638F-seeklogo.com.png',
  },
  {
    name: 'Zustand',
    link: 'https://zustand.surge.sh/',
    description:
      'A small, fast and scalable bearbones state-management solution.',
    logo: 'https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560',
  },
  // Dashboard "/dashboard"
  {
    name: 'Dashboard',
    link: '/dashboard',
    description: 'Dashboard',
    logo: Logo,
  },
];

export default function Home() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between m-5 h-1/2'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold text-primary'>
              Tech Stack Framework
            </h1>
          </div>

          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn m-1'>
              Change Theme <HiArrowSmallRight size={20} />
            </label>
            <ul
              tabIndex={0}
              className='block overflow-auto h-52  dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
            >
              {themeName.map((theme) => (
                <li key={theme}>
                  <button
                    className='menu-title'
                    data-set-theme={theme}
                    data-act-class='ACTIVECLASS'
                  >
                    {theme}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-wrap w-screen gap-10  p-10 justify-center'>
          {packages.map((e, i) => (
            <div className='card shadow-lg bg-base-300 h-40' key={i}>
              <div className='card-body'>
                <div className='flex flex-col gap-5 w-72'>
                  <div className='flex flex-row'>
                    <img
                      src={e.logo}
                      alt={e.name}
                      className='w-10 h-10 rounded-full'
                    />
                    <div className='flex flex-col justify-center items-start ml-2'>
                      <h2 className='card-title'>{e.name}</h2>
                      <p className='text-sm'>{e.description}</p>
                    </div>
                  </div>
                  <div className='flex flex-row justify-end'>
                    <a href={e.link} target='_blank' rel='noreferrer'>
                      <button className='btn btn-primary'>Visit</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='absolute  w-full bottom-0'>
        <Footer />
      </div>
    </>
  );
}
