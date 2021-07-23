import React from 'react';

import styles from './Button.module.css';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={styles.Button}>
    Load more
  </button>
);

export default Button;
