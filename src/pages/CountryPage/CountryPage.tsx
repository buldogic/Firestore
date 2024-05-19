import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import { observer } from 'mobx-react-lite';
import { Meta } from '../../utils/meta';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { z } from 'zod';
import Like from '../../components/Like';
import LocalStoreCountry from './LocalStoreCountry';
import styles from './CountryPage.module.scss';

const idSchema = z.number().int().positive();

const CountryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [like, setLike] = useState(false);
  const localStoreCountry = useMemo(() => new LocalStoreCountry(), []);

  useEffect(() => {
    const parsedId = idSchema.safeParse(Number(id));
    if (parsedId.success) {
      localStoreCountry.getCountry(parsedId.data);
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.containerButton}>
        <ArrowLeftOutlined className={styles.iconBack} onClick={goBack} />
      </div>
      {localStoreCountry.meta === Meta.loading && <Loader />}
      <div className={styles.containerContent}>
        <div className={styles.contentImg}>
          <img className={styles.img} src={localStoreCountry.country.img} alt="foto" />
        </div>
        <div className={styles.contentText}>
          <div className={styles.header}>
            <p className={styles.textName}>{localStoreCountry.country.name} </p>
            <Like like={like} onToggle={() => setLike((like) => !like)} />
          </div>
          <div>
            <p>
              <b>Описание :</b> <span className={styles.textDes}>{localStoreCountry.country.description}</span>
            </p>
            <p>
              <b>Население :</b> {localStoreCountry.country.population}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CountryPage);
