import Card from 'components/Card';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Meta } from 'utils/meta';
import { City } from 'utils/fieldType';
import { cities } from 'store/CityDataStore';
import Input from 'components/Input';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import Loader from 'components/Loader';
import styles from './CountryPage.module.scss';

const CountryPage = () => {
  const [params, setParams] = useSearchParams();

  const search = params.get('search') ?? '';

  const isCapital = (params.get('capital') ?? 'false') !== 'false';

  useEffect(() => {
    cities.getCities();
  }, []);

  useEffect(() => {
    cities.setSearchQuery(search);
  }, [search]);

  useEffect(() => {
    cities.setCapitalFilter(isCapital);
  }, [isCapital]);

  const handleSearchChange = (v: string) => {
    setParams((params) => {
      params.set('search', v);
      return params;
    });
  };

  const handleCapitalChange = (v: boolean) => {
    setParams((params) => {
      params.set('capital', v.toString());
      return params;
    });
  };

  if (cities.meta === Meta.loading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerSearch}>
          <Input className={styles.input} value={search} onChange={handleSearchChange} />
          <Button onClick={() => handleSearchChange('')}>Очистить</Button>
        </div>
        <div className={styles.filterContain}>
          <p>Столица</p>
          <CheckBox value={isCapital} onChange={handleCapitalChange}></CheckBox>
        </div>
      </div>
      <div className={styles.containerCard}>
        <div className={styles.containerCardText}>
          <h2>Популярные города</h2>
        </div>
        {cities.cities.length ? (
          cities.cities.map((c: City) => (
            <div className={styles.cardBlock} key={c.id}>
              <Link to={`city/${c.id}`}>
                <Card className={styles.card} title={c.name} image={c.img} subtitle={c.description} />
              </Link>
            </div>
          ))
        ) : (
          <p>Города нет</p>
        )}
      </div>
    </div>
  );
};


export default observer(CountryPage);
