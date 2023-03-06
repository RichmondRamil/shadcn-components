import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <section>
        <div>
          <h1 className={manrope.className}>Welcome to Altus Digital</h1>
        </div>
      </section>
    </main>
  );
}
