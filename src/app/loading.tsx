import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className="grid min-h-[610px] grid-cols-1 place-items-center gap-5">
      <div className="grid place-items-center gap-5">
        <div className={styles.tb}>
          <div className={styles.tb__dot}></div>
          <div className={styles.tb__dot}></div>
          <div className={styles.tb__dot}></div>
        </div>
        <div>
          <p className="font-medium text-violet-700">
            Please wait while we are loading the resources...
          </p>
        </div>
      </div>
    </div>
  );
}
