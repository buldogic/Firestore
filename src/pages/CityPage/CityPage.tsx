import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from 'components/Loader';
import Button from 'components/Button';
import styles from './CityPage.module.scss';
import { observer } from 'mobx-react-lite';
import { cities } from 'store/CityDataStore';
import { Meta } from 'utils/meta';
import { z } from 'zod';

const idSchema = z.number().int().positive();

const CityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const parsedId = idSchema.safeParse(Number(id));

    if (parsedId.success) {
      cities.getCity(parsedId.data);
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.containerButton}>
        <Button onClick={goBack}> &lt; Назад </Button>
      </div>
      {cities.meta === Meta.loading && <Loader />}
      <div className={styles.containerContent}>
        <div className={styles.contentImg}>
          <img className={styles.img} src={cities.city.img} alt="foto" />
        </div>
        <div className={styles.contentText}>
          <p className={styles.textName}>{cities.city.name}</p>
          <div>
            <p>
              <b>Столица:</b> {cities.city.is_capital ? 'Да' : 'Нет'}
            </p>
            <p>
              <b>Описание :</b> <span className={styles.textDes}>{cities.city.description}</span>
            </p>
            <p>
              <b>Население :</b> {cities.city.population}
            </p>
            <p>
              <b>Достопримечательности :</b> {cities.city.singht ?? 'Список пуст'}
            </p>
          </div>
          <Button>Посетить</Button>
        </div>
      </div>
    </div>
  );
};

export default observer(CityPage);
