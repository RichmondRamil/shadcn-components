'use client';

import { KoHo } from 'next/font/google';
import Image from 'next/image';
import Button from 'src/components/Button';
import Footer from 'src/components/Footer';

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
            <Button />
          </div>
        </nav>
      </header>
      <main>
        <section>
          <div className="pt-40 grid place-items-center grid-cols-1 gap-10">
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
            <div className="pb-10 px-20">
              <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
                <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer hover:bg-violet-300">
                  Docs {'->'}
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer hover:bg-violet-300">
                  Templates {'->'}
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="p-10 border border-violet-300 rounded-2xl cursor-pointer hover:bg-violet-300">
                  Deploy {'->'}
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
