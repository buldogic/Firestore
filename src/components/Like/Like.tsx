import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import cn from 'classnames';
import styles from './Like.module.scss';

type Props = {
  like?: boolean;
  onToggle?: () => void;
};

const Like = (props: Props) => {

  const hendleClick = () =>{
    if (props.onToggle === undefined) return
    props.onToggle() 
  }

  return (
    <div >
      <HeartFilled
        className={cn(props.like ? styles.buttonYesLike : styles.buttonNoLike)}
        type="primary"

        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          hendleClick()
        }}
      />
    </div>
  );
};

export default Like;
