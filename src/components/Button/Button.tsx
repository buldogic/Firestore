import React from 'react';
import Loader from '../Loader/Loader';
import cn from 'classnames';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { loading, children, disabled, className, ...buttonProps } = props;

  return (
    <div >
      <button
        {...buttonProps}
        disabled={disabled || loading}
        className={cn(
          className,
          loading && styles.loading,
          disabled && styles.disabled,
          styles.button,
        )}
      >
        {loading && <Loader size={'s'} className={styles.loader} />}
        {children}
      </button>
    </div>
  );
};

export default Button;
