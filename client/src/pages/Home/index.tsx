// DEPENDENCIES
import { HiArrowSmallRight } from 'react-icons/hi2';
// COMPONENTS
import Footer from '../../shared/components/common/Footer';
// LOGO
import Logo from '../../shared/assets/img/ad-logo-light.png';

export default function Home() {
  return (
    <>
      <main>
        <section>
          <div className='my-36 flex flex-col justify-center items-center gap-10'>
            <div>
              <img alt='Altus Digital logo' className='h-32' src={Logo} />
            </div>
            <div className=''>
              <div className='grid place-items-center gap-5 grid-cols-1 lg:grid-cols-3'>
                <a
                  href='https://react.dev/learn'
                  target='_blank'
                  rel='noreferrer'
                  className='w-full z-10'
                >
                  <div className='p-10 border border-violet-300 rounded-2xl cursor-pointer'>
                    <div className='text-slate-200 translate-y-[-2.5rem] translate-x-44 px-2 ml-[-7px] rounded-tr-xl rounded-bl-xl bg-violet-500 absolute'>
                      <HiArrowSmallRight size={20} />
                    </div>
                    <div>
                      <span className='text-lg font-medium'>
                        Learn React.js
                      </span>
                      <p>The basics of React.js.</p>
                    </div>
                  </div>
                </a>
                <a
                  href='https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website'
                  target='_blank'
                  rel='noreferrer'
                  className='w-full z-10'
                >
                  <div className='p-10 border border-violet-300 rounded-2xl cursor-pointer'>
                    <div className='text-slate-200 translate-y-[-2.5rem] translate-x-44 px-2 ml-[-6px] rounded-tr-xl rounded-bl-xl bg-violet-500 absolute'>
                      <HiArrowSmallRight size={20} />
                    </div>
                    <div>
                      <span className='text-lg font-medium'>Learn Next.js</span>
                      <p>The basics of Next.js.</p>
                    </div>
                  </div>
                </a>
                <a
                  href='https://vercel.com/docs/concepts/get-started'
                  target='_blank'
                  rel='noreferrer'
                  className='w-full z-10'
                >
                  <div className='p-10 border border-violet-300 rounded-2xl cursor-pointer'>
                    <div className='text-slate-200 translate-y-[-2.5rem] translate-x-44 px-2 ml-[-7px] rounded-tr-xl rounded-bl-xl bg-violet-500 absolute'>
                      <HiArrowSmallRight size={20} />
                    </div>
                    <div>
                      <span className='text-lg font-medium'>Learn Deploy</span>
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
