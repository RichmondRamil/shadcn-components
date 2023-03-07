import { KoHo } from 'next/font/google';
import Image from 'next/image';

const koho = KoHo({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <div className="py-10 px-5 fixed">
            <p className="border border-violet-500 rounded-2xl p-2 bg-gradient-to-r from-gray-200 via-slate-400 to-gray-300">
              Get Started by Editing{' '}
              <code className={`font-bold ${koho.className}`}>
                src/app/page.tsx
              </code>
            </p>
          </div>
        </nav>
      </header>
      <main>
        <section>
          <div className="grid place-items-center min-h-[666px]">
            <div className="flex gap-5 items-center justify-center">
              <Image
                src="/images/altusdigital-purple-logo.png"
                alt="Altus Digital logo"
                height={20}
                width={60}
              />
              <h1 className={`${koho.className} uppercase`}>
                <span className="text-lg font-bold">Altus</span>
                <br />
                <span className="text-base font-medium text-violet-700 tracking-tight">
                  Digital
                </span>
              </h1>
            </div>
          </div>
          <div className='pb-10 px-20'>
            <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
              <div className='p-10 border border-violet-300 rounded-2xl cursor-pointer'>
                Docs {'->'}
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div className='p-10 border border-violet-300 rounded-2xl cursor-pointer'>
                Templates {'->'}
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div className='p-10 border border-violet-300 rounded-2xl cursor-pointer'>
                Deploy {'->'}
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="flex items-center justify-center text-slate-200 bg-slate-500 p-5 font-bold">
          Copyright &#169; Altus Digital
        </div>
      </footer>
    </>
  );
}
