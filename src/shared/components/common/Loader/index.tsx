import styles from './loading.module.css';

export default function Loading({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='grid place-items-center gap-5'>
        <div className={styles.tb}>
          <div className={styles.tb__dot}></div>
          <div className={styles.tb__dot}></div>
          <div className={styles.tb__dot}></div>
        </div>
        <div>
          <p className='font-medium'>
            Please wait while we are loading the resources . . .
          </p>
        </div>
      </div>
    </div>
  );
}
