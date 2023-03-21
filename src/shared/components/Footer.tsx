import Image from 'next/image';
import { FaGlobeAsia, FaTwitterSquare, FaLinkedin, FaMedium } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="grid place-items-center bg-[#1a2b62] pt-5">
        <div className="pb-5 pt-10 md:py-8 2xl:py-[2.48rem] px-16 flex items-center justify-center flex-col gap-5 rounded-xl">
          <Image
            alt="SF Logo Partner"
            src="/images/SF-PARTNER-LOGO1.png"
            width={200}
            height={60}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-slate-200 flex gap-2 items-center justify-center">
              <span className="hover:bg-[#8248e5] p-2 rounded-full">
                <a
                  href="https://altus.digital"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGlobeAsia size={22} />
                </a>
              </span>
              <span className="hover:bg-[#8248e5] p-2 rounded-full">
                <a
                  href="https://www.linkedin.com/company/altusdigital"
                  target="_blank"
                  rel="noreferrer"
                >
<FaLinkedin size={24} />
                </a>
              </span>
              <span className="hover:bg-[#8248e5] p-2 rounded-full">
                <a
                  href="https://twitter.com/altus_digital"
                  target="_blank"
                  rel="noreferrer"
                >
<FaTwitterSquare size={24} />
                </a>
              </span>
              <span className="hover:bg-[#8248e5] p-2 rounded-full">
                <a
                  href="https://altusdigital.medium.com/"
                  target="_blank"
                  rel="noreferrer"
                >
<FaMedium size={24} />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="text-slate-200 py-[1.05rem] mx-20 md:mx-0 text-center border-t border-violet-500">
          <h3 className="font-semibold">
            Copyright &#169; {new Date().getFullYear()} • Altus Digital Pty Ltd
            (ABN 94 638 335 716) • All Rights Reserved
          </h3>
        </div>
      </div>
    </footer>
  );
}
