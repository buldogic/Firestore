import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCities } from '../../firebase';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Button from 'components/Button';
import styles from './CityPage.module.scss';

const CityPage = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const [state, setstate] = useState<any>([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const a = new Promise((res, rej) => {
      res(getCities());
    });

    a.then((v: [] | any) => {
      setstate(v);
      setIsloading(false);
    });
  }, []);

  const city = state.find((c: any) => c.name === id);

  return (
    <div className={styles.root}>
      <div>
        <Button onClick={goBack}> &lt; Назад </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={styles.text}>
            <h2>City Page</h2>
          </div>
          {id === undefined ? (
            state.map((c: any) => (
              <div className={styles.cardBlock} key={c.name}>
                <Link to={`${c.name}`}>
                  <Card className={styles.card} title={c.name} subtitle={c.population} />
                </Link>
              </div>
            ))
          ) : (
            <div>
              <p>name:{city.name}</p>
              {city.is_capital ? <p>Capital</p> : ''}
              <p>population{city.population}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CityPage;
