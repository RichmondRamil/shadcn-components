import { KoHo } from 'next/font/google';

import Image from 'next/image';
import Icon1 from 'src/components/icon1.svg';
import Icon2 from 'src/components/icon2.svg';
import Icon3 from 'src/components/icon3.svg';

const koho = KoHo({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Button() {
  return (
    <>
      <style jsx>{`
        button {
          position: relative;
          padding: 15px 45px;
          background: #8248e5;
          font-size: 17px;
          font-weight: 500;
          color: #eae0fb;
          border-radius: 8px;
          filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
        }

        button:hover {
          background: #8248e5;
          animation: wind 2s ease-in-out infinite;
        }

        @keyframes wind {
          0% {
            background-position: 0% 50%;
          }

          0% {
            background-position: 50% 100%;
          }

          0% {
            background-position: 0% 50%;
          }
        }

        .ico1 {
          position: absolute;
          top: 0;
          right: 0;
          width: 25px;
          transform-origin: 0 0;
          transform: rotate(10deg);
          transition: all 0.5s ease-in-out;
          filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
        }

        button:hover .ico1 {
          animation: slay-1 3s cubic-bezier(0.52, 0, 0.58, 1) infinite;
          transform: rotate(10deg);
        }

        @keyframes slay-1 {
          0% {
            transform: rotate(10deg);
          }

          50% {
            transform: rotate(-5deg);
          }

          100% {
            transform: rotate(10deg);
          }
        }

        .ico2 {
          position: absolute;
          top: 0;
          left: 25px;
          width: 12px;
          transform-origin: 50% 0;
          transform: rotate(10deg);
          transition: all 1s ease-in-out;
          filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
        }

        button:hover .ico2 {
          animation: slay-2 3s cubic-bezier(0.52, 0, 0.58, 1) 1s infinite;
          transform: rotate(0);
        }

        @keyframes slay-2 {
          0% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(15deg);
          }

          100% {
            transform: rotate(0);
          }
        }

        .ico3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 18px;
          transform-origin: 50% 0;
          transform: rotate(-5deg);
          transition: all 1s ease-in-out;
          filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
        }

        button:hover .ico3 {
          animation: slay-3 2s cubic-bezier(0.52, 0, 0.58, 1) 1s infinite;
          transform: rotate(0);
        }

        @keyframes slay-3 {
          0% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(-5deg);
          }

          100% {
            transform: rotate(0);
          }
        }
      `}</style>
      <button>
        Get Started by Editing{' '}
        <code className={`font-bold ${koho.className}`}>src/app/page.tsx</code>
        <div className="ico1">
          <Image src={Icon1} alt="Icon1 leaf" />
        </div>
        <div className="ico2">
          <Image src={Icon2} alt="Icon2 leaf" />
        </div>
        <div className="ico3">
          <Image src={Icon3} alt="Icon3 leaf" />
        </div>
      </button>
    </>
  );
}
