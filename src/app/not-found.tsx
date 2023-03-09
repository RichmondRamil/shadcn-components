import Image from 'next/image';

export default function NotFound() {
  return (
    <>
      <div className="grid place-items-center w-full h-screen">
        <div className='flex flex-col gap-10 items-center justify-center'>
          <Image src='/images/404.svg' alt="404 page not found" width={500} height={500} />
          <h2 className='p-4 rounded-xl bg-[#8248e5] text-slate-200'>Page not found!</h2>
        </div>
      </div>
    </>
  );
}
