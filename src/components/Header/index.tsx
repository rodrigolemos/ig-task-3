import { ReactElement } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <h1>by Rodrigo Lemos</h1>
      </div>
    </header>
  );
}
