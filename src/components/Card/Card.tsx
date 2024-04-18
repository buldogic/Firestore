import React from 'react';
import Text from '../Text';
import cn from 'classnames';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image?: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const {
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
  } = props;

  return (
    <div className={cn(className, styles.Card)} onClick={onClick}>
      <img src={image} alt="Card" />
      <div className={styles.CardContent}>
        {captionSlot && (
          <Text
            color={'secondary'}
            weight={'medium'}
            view={'p-14'}
          >
            {captionSlot}
          </Text>
        )}
        <Text
          maxLines={2}
          view={'p-20'}
          weight={'normal'}
        >
          {title}
        </Text>

        <Text
          maxLines={3}
          view={'p-16'}
          weight={'normal'}
          color={'secondary'}
        >
          {subtitle}
        </Text>
        <div className={styles.CardActions}>
          {contentSlot && (
            <Text view={'p-18'} weight={'bold'}>
              {contentSlot}
            </Text>
          )}
          {actionSlot && (
            <Text  view={'button'}>
              {actionSlot}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
