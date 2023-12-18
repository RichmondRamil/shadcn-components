// DEPENDENCIES
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <>
      <div className='flex flex-row bg-base-300'>
        <Sidebar />
        <div className='bg-[#FFFFFF] text-[#1D2F64] flex flex-col p-5 gap-5 overflow-y-scroll h-screen w-full'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
