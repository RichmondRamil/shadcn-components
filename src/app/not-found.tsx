import Image from 'next/image';
import Footer from '../components/Footer';
import { KoHo } from 'next/font/google';

const koho = KoHo({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function NotFound() {
  return (
    <>
      <div className="flex gap-5 items-center justify-center py-5">
        <Image
          src="/images/altusdigital-purple-logo.png"
          alt="Altus Digital logo"
          height={30}
          width={60}
        />
        <div
          className={`${koho.className} uppercase flex flex-col justify-center items-center mt-[-6px]`}
        >
          <span className="text-3xl font-bold">Altus</span>
          <span className="text-2xl font-medium text-violet-700 tracking-wide mt-[-12px]">
            Digital
          </span>
        </div>
      </div>
      <div className="grid place-items-center py-10">
        <div className="flex flex-col gap-10 items-center justify-center">
          <Image
            src="/images/404.svg"
            alt="404 page not found"
            width={342}
            height={342}
          />
          <h2 className="p-4 rounded-xl bg-[#8248e5] text-slate-200">
            Page not found!
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
