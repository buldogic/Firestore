import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import { observer } from 'mobx-react-lite';
import { Meta } from '../../utils/meta';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { z } from 'zod';
import Like from '../../components/Like';
import LocalStore from './LocalStore';
import styles from './CityPage.module.scss';

const idSchema = z.number().int().positive();

const CityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [like, setLike] = useState(false);
  const localStore = useMemo(() => new LocalStore(), []);

  useEffect(() => {
    const parsedId = idSchema.safeParse(Number(id));

    if (parsedId.success) {
      localStore.getCity(parsedId.data);
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.containerButton}>
        <ArrowLeftOutlined className={styles.iconBack} onClick={goBack} />
      </div>
      {localStore.meta === Meta.loading && <Loader />}
      <div className={styles.containerContent}>
        <div className={styles.contentImg}>
          <img className={styles.img} src={localStore.city.img} alt="foto" />
        </div>
        <div className={styles.contentText}>
          <div className={styles.header}>
            <p className={styles.textName}>{localStore.city.name} </p>
            <Like like={like} onToggle={() => setLike((like) => !like)} />
          </div>
          <div>
            <p>
              <b>Столица:</b> {localStore.city.is_capital ? 'Да' : 'Нет'}
            </p>
            <p>
              <b>Описание :</b> <span className={styles.textDes}>{localStore.city.description}</span>
            </p>
            <p>
              <b>Население :</b> {localStore.city.population}
            </p>
            <p>
              <b>Достопримечательности :</b> {localStore.city.singht ?? 'Список пуст'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CityPage);
