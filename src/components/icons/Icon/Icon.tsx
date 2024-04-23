import * as React from 'react';
import styles from './Icon.module.scss';
import cn from 'classnames';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (
  props: IconProps
) => {
  const { className, children } = props;
  const color = props.color ?? 'primary';

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={cn(className, styles.root, styles[color])}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
