import React from 'react';
import Button from '../../components/Button';
import cn from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  limit: number;
  count: number;
  page: number;
  onChange: (page: number) => void;
};

const Pagination = (props: Props) => {
  const countPages = Math.ceil(props.count / props.limit);

  return (
    <div className={styles.root}>
      <Button onClick={() => props.onChange(Math.max(props.page - 1, 0))}>←</Button>
      <div className={styles.pages}>
        {Array.from({ length: countPages }).map((_, i) => (
          <Button key={i} className={cn(props.page === i && styles.active)} onClick={() => props.onChange(i)}>
            {i + 1}
          </Button>
        ))}
      </div>
      <Button onClick={() => props.onChange(Math.min(props.page + 1, countPages - 1))}>→</Button>
    </div>
  );
};

export default Pagination;
