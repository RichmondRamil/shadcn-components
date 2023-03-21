import { KoHo } from 'next/font/google';
import Image from 'next/image';
import Button from '@/shared/components/Button';
import Footer from '@/shared/components/Footer';

import { HiArrowSmallRight } from 'react-icons/hi2';
/* Used by 404 page error component*/
// import { notFound } from 'next/navigation';

const koho = KoHo({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  /* 
    For testing error, not-found and loading component
  */
  // throw new Error('This is an error message')

  // if (true) {
  //   notFound();
  // }

  return (
    <>
      <header>
        <nav>
          <div className="py-10 px-5 fixed z-20 2xl:ml-[42%]">
            <Button />
          </div>
        </nav>
      </header>
      <main>
        <section>
          <div className=" 2xl:pt-72 pt-44 grid place-items-center grid-cols-1 2xl:gap-60 gap-16">
            <div className="flex gap-5 items-center justify-center">
              <Image
                src="/images/altusdigital-purple-logo.png"
                alt="Altus Digital logo"
                height={70}
                width={110}
              />
              <div
                className={`${koho.className} uppercase flex flex-col justify-center items-center mt-[-6px]`}
              >
                <span className="text-6xl font-bold">Altus</span>
                <span className="text-5xl font-medium text-violet-700 tracking-wide mt-[-12px]">
                  Digital
                </span>
              </div>
            </div>
            <div className="2xl:pb-60 pb-16 px-20">
              <div className="grid place-items-center gap-5 grid-cols-1 lg:grid-cols-3">
                <a
                  href="https://react.dev/learn"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full z-10"
                >
                  <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer">
                    <div className="text-slate-200 translate-y-[-2.5rem] translate-x-44 px-2 ml-[-7px] rounded-tr-xl rounded-bl-xl bg-violet-500 absolute">
                      <HiArrowSmallRight size={20} />
                    </div>
                    <div>
                      <span className="text-lg font-medium">
                        Learn React.js
                      </span>
                      <p>The basics of React.js.</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full z-10"
                >
                  <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer">
                    <div className="text-slate-200 translate-y-[-2.5rem] translate-x-44 px-2 ml-[-6px] rounded-tr-xl rounded-bl-xl bg-violet-500 absolute">
                      <HiArrowSmallRight size={20} />
                    </div>
                    <div>
                      <span className="text-lg font-medium">Learn Next.js</span>
                      <p>The basics of Next.js.</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://vercel.com/docs/concepts/get-started"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full z-10"
                >
                  <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer">
                    <div className="text-slate-200 translate-y-[-2.5rem] translate-x-44 px-2 ml-[-7px] rounded-tr-xl rounded-bl-xl bg-violet-500 absolute">
                      <HiArrowSmallRight size={20} />
                    </div>
                    <div>
                      <span className="text-lg font-medium">Learn Deploy</span>
                      <p>Vercel page docs.</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
