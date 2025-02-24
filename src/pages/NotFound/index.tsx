// COMPONENTS
import Footer from '../../shared/components/common/Footer';
// LOGO
import Logo from '../../shared/assets/svg/404.svg';

export default function NotFound() {
  return (
    <div className='flex flex-col gap-5 items-center justify-between h-screen'>
      <img src={Logo} alt='Altus Digital logo' className='h-1/2' />
      {/* Create a beaitufil header that says page not found */}
      <h1 className='text-4xl font-bold text-center font'>Page Not Found</h1>
      <Footer />
    </div>
  );
}
