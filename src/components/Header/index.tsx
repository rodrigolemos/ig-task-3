import { ReactElement } from 'react';

import styles from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="/logo.svg" alt="logo" />
      </div>
    </header>
  );
}
