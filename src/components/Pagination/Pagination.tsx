import React, { useCallback } from 'react';
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

  const handleClickNext = useCallback(() => {
    return props.onChange(Math.max(props.page - 1, 0));
  }, [props.onChange]);

  const handleClickPrev = useCallback(() => {
    return props.onChange(Math.min(props.page + 1, countPages - 1));
  }, [props.onChange]);

  return (
    <div className={styles.root}>
      <Button onClick={handleClickNext}>←</Button>
      <div className={styles.pages}>
        {Array.from({ length: countPages }).map((_, i) => (
          <Button key={i} className={cn(props.page === i && styles.active)} onClick={() => props.onChange(i)}>
            {i + 1}
          </Button>
        ))}
      </div>
      <Button onClick={handleClickPrev}>→</Button>
    </div>
  );
};

export default Pagination;
