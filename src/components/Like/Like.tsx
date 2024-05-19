import React, { useState } from 'react';
import { HeartFilled } from '@ant-design/icons';
import cn from 'classnames';
import styles from './Like.module.scss';

type Props = {
  like?: boolean;
  onToggle?: () => void;
};

const Like = (props: Props) => {
  const [like, setLike] = useState(false);

  // const { like, onToggle } = props;
  return (
    <div >
      <HeartFilled
        className={cn(like ? styles.buttonNoLike : styles.buttonYesLike)}
        type="primary"
        // onClick={onToggle}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setLike(!like)}}
      />
    </div>
  );
};

export default Like;
