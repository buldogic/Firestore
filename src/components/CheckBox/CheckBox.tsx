import React from 'react';
import cn from 'classnames';
import CheckIcon from '../icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  value: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { onChange, className, value, ...checkBoxProps } = props;

  return (
    <label className={cn(className, styles.root, props.disabled && styles.disabled)}>
      <input
        {...checkBoxProps}
        checked={value}
        disabled={props.disabled}
        className={styles.input}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <CheckIcon className={styles.icon}></CheckIcon>
    </label>
  );
};

export default CheckBox;