import { KoHo } from 'next/font/google';
import Image from 'next/image';
import Button from 'src/components/Button';
import Footer from 'src/components/Footer';

import { BsArrowRightShort } from 'react-icons/bs';
import { HiArrowLongRight } from 'react-icons/hi2';
import { notFound } from 'next/navigation';

const koho = KoHo({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  // throw new Error('This is an error message')

   if(true) {
     notFound()
   }

  return (
    <>
      <header>
        <nav>
          <div className="py-10 px-5 fixed">
            <Button />
          </div>
        </nav>
      </header>
      <main>
        <section>
          <div className="pt-44 grid place-items-center grid-cols-1 gap-12">
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
            <div className="pb-12 px-20">
              <div className="grid place-items-center gap-5 grid-cols-1 md:grid-cols-3">
                <a
                  href="https://beta.reactjs.org/learn/installation"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer">
                    <span className="flex items-center justify-center gap-5 text-lg font-medium">
                      Learn Reactjs{' '}
                      <div className="text-slate-200 translate-y-[-2.8rem] translate-x-10 px-2 rounded-tr-xl rounded-bl-xl bg-violet-500">
                        <BsArrowRightShort size={20} />
                      </div>
                    </span>
                    <p>The basics of React.js.</p>
                  </div>
                </a>
                <a
                  href="https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer">
                    <span className="flex items-center justify-center gap-5 text-lg font-medium">
                      Learn Next.js
                      <div className="text-slate-200 translate-y-[-2.8rem] translate-x-10 px-2 rounded-tr-xl rounded-bl-xl bg-violet-500">
                        <BsArrowRightShort size={20} />
                      </div>
                    </span>
                    <p>The basics of Next.js.</p>
                  </div>
                </a>
                <a
                  href="https://vercel.com/docs/concepts/get-started"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer">
                    <span className="flex items-center justify-center gap-5 text-lg font-medium">
                      Learn Deploy
                      <div className="text-slate-200 translate-y-[-2.8rem] translate-x-10 px-2 rounded-tr-xl rounded-bl-xl bg-violet-500">
                        <BsArrowRightShort size={20} />
                      </div>
                    </span>
                    <p>Vercel page docs.</p>
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
