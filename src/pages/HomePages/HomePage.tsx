import Card from 'components/Card';
import { getCities } from '../../firebase';
import { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import Input from 'components/Input';
import styles from './HomePage.module.scss';
import  Button  from 'components/Button';



const HomePages = () => {
  const [state, setstate] = useState<[]>([]);

  useEffect(() => {
    const a = new Promise((res, rej) => {
      res(getCities());
    });

    a.then((v: [] | any) => {
      setstate(v);
    });
  }, []);


  redirect('/login');

  return (
    <div className={styles.container}>
      <div className={styles.containerSearch}>
        <Input className={styles.input} value="Search" onChange={() => {}} />
        <Button className={styles.button} >Искать</Button>
      </div>

      <div className={styles.containerCard}>
        <div className={styles.containerCardText}>
          <h2>Популярные города</h2>
        </div>
        {state.map((c: any) => (
          <div className={styles.cardBlock} key={c.name}>
            <Link to={`CityPage/${c.name}`}>
              <Card className={styles.card} title={c.name} subtitle={c.population} />
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.containerCard}>
        <div className={styles.containerCardText}>
          <h2>Туры по городам</h2>
        </div>
        {state.map((c: any) => (
          <div className={styles.cardBlock} key={c.name}>
            <Link to={`CityPage/${c.name}`}>
              <Card className={styles.card} title={c.name} subtitle={c.population} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePages;
