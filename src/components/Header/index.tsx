import { ReactElement } from 'react';

import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <div className={commonStyles.content}>
        <img src="/logo.svg" alt="logo" />
      </div>
    </header>
  );
}
