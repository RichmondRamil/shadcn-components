// COMPONENTS
import Footer from '../../shared/components/common/Footer';
// LOGO
import Logo from '../../shared/assets/img/ad-logo-light.png';

export default function NotFound() {
  return (
    <>
      <div className='flex gap-5 items-center justify-center py-5'>
        <img src={Logo} alt='Altus Digital logo' className='h-24' />
      </div>
      <div className='grid place-items-center py-10'>
        <div className='flex flex-col gap-20 items-center justify-center mt-[-0.2rem]'>
          <img
            src='/images/404.svg'
            alt='404 page not found'
            width={342}
            height={342}
          />
          <h2 className='p-4 rounded-xl bg-[#8248e5] text-slate-200'>
            Page not found!
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
