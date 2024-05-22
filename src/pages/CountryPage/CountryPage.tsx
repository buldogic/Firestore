import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import { observer } from 'mobx-react-lite';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { z } from 'zod';
import Like from '../../components/Like';
import LocalStoreCountry from './LocalStoreCountry';
import styles from './CountryPage.module.scss';
import { authStore } from '../../store/AuthStore';

const idSchema = z.number().int().positive();

const CountryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const localStoreCountry = useMemo(() => new LocalStoreCountry(), []);

  useEffect(() => {
    const parsedId = idSchema.safeParse(Number(id));
    if (parsedId.success) {
      localStoreCountry.getCountry(parsedId.data);
    }
  }, []);

  useEffect(() => {
    if(!authStore._session) return 
    localStoreCountry.getIsLikeCountry(authStore._session.uid)
  }, [localStoreCountry.likeCountry])


  const handleLike = () => {
    if(!authStore._session) return 
    localStoreCountry.addUserCountryLike(authStore._session.uid)

    const parsedId = idSchema.safeParse(Number(id));
    if (parsedId.success) {
      localStoreCountry.addCountryLike(parsedId.data);
    }
    }

    console.log(localStoreCountry.likeCountry)

  return (
    <div className={styles.root}>
      <div className={styles.containerButton}>
        <ArrowLeftOutlined className={styles.iconBack} onClick={goBack} />
      </div>
      {localStoreCountry.country === null ? (
        <Loader />
      ) : (
        <div className={styles.containerContent}>
          <div className={styles.contentImg}>
            <img className={styles.img} src={localStoreCountry.country.img} alt="foto" />
          </div>
          <div className={styles.contentText}>
            <div className={styles.header}>
              <p className={styles.textName}>{localStoreCountry.country.name} </p>
              <Like like={localStoreCountry.likeCountry} onToggle={handleLike} />
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
      )}
    </div>
  );
};

export default observer(CountryPage);
