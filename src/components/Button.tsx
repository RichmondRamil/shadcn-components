import { KoHo } from 'next/font/google';
import styles from './Button.module.css';

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
    <button className={styles.b}>
      Get Started by Editing{' '}
      <code className={`font-bold ${koho.className}`}>src/app/page.tsx</code>
      <div className={styles.ico1}>
        <Image src={Icon1} alt="Icon1 leaf" />
      </div>
      <div className={styles.ico2}>
        <Image src={Icon2} alt="Icon2 leaf" />
      </div>
      <div className={styles.ico3}>
        <Image src={Icon3} alt="Icon3 leaf" />
      </div>
    </button>
  );
}
