import styles from "./page.module.css";

import {ZipButton} from '@/features/zip'


export default function Home() {
  return (
    <main id="main" className={styles.main}>
        <ZipButton/>
    </main>
  );
}
