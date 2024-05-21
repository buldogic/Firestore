import React, { useState } from 'react';
import { HeartFilled } from '@ant-design/icons';
import cn from 'classnames';
import styles from './Like.module.scss';

type Props = {
  like?: boolean;
  onToggle?: () => void;
};

const Like = (props: Props) => {
  // const [like, setLike] = useState(false);

  const hendleClick = () =>{
    if (props.onToggle === undefined) return
    props.onToggle() 
  }

  console.log(props.like)
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
        // onClick={(e) => {
        //   e.preventDefault()
        //   e.stopPropagation()
        //   setLike(!like)}}
      />
    </div>
  );
};

export default Like;
