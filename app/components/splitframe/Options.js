import React from 'react';
import styles from './SplitStyle.scss'; 
import Icon from 'components/Icon';

const Item = ({ icon, label, ...props }) => (
  <li {...props} classname={styles.optli}>
    {icon && (
      <div classname={styles.iconWrapper}>
        <Icon iconId={icon} />
      </div>
    )}
    {label}
  </li>
);

export default {
  Item,
};
