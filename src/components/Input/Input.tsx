import React, { useState } from 'react';
import cn from 'classnames';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps) => {
    const { value, onChange, className, afterSlot, disabled, ...inputProps } =
      props;

    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={cn(
          className,
          styles.root,
          disabled && styles.disabled,
          isFocused && styles.focus
        )}
      >
        <input
          {...inputProps}
          type="text"
          onBlur={(e) => {
            setIsFocused(false);
            if (inputProps.onBlur) inputProps.onBlur(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            if (inputProps.onFocus) inputProps.onFocus(e);
          }}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        {afterSlot ?? <ArrowDownIcon className={styles.icon} />}
      </div>
    );
  }
);

export default Input;
