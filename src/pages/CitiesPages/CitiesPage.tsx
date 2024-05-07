import React from 'react';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Meta } from '../../utils/meta';
import { City } from '../../utils/fieldType';
import { cities } from '../../store/CityDataStore';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import MultiDropdown from '../../components/MultiDropdown';
import { countries } from '../../store/CountriesStore';
import { truthy } from '../../utils/truthy';
import { useFilters } from '../../hooks/useFilters';
import styles from './CitiesPage.module.scss';

const CitiesPages = () => {
  const { page, isCapital, search, countryIds, setPage, setSearch, setIsCapital, setCountryIds } = useFilters();

  useEffect(() => {
    cities.getCities({ page, countryIds, isCapital, search });
    countries.getCountries();
  }, [page, countryIds, isCapital, search]);

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerSearch}>
          <Input className={styles.input} value={search} onChange={setSearch} />
          <Button onClick={() => setSearch('')}>Очистить</Button>
        </div>
        <div className={styles.filterContain}>
          <p>Столица</p>
          <CheckBox value={isCapital} onChange={setIsCapital}></CheckBox>
          {countries.countries.length && (
            <MultiDropdown
              options={countries.countries.map((c) => {
                return { key: String(c.id), value: c.name };
              })}
              value={countryIds
                .map((id) => {
                  return countries.countries.find((c) => c.id === id);
                })
                .filter(truthy)
                .map((c) => ({ key: String(c.id), value: c.name }))}
              onChange={(options) => setCountryIds(options.map((c) => parseInt(c.key)))}
              getTitle={(options) => options.map((o) => o.value).join(', ')}
            />
          )}
        </div>
      </div>
      <div className={styles.containerCard}>
        <div className={styles.containerCardText}>
          <h2>Популярные города</h2>
        </div>
        {cities.meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader />
          </div>
        ) : cities.cities.length ? (
          <>
            {cities.cities.map((c: City) => (
              <div className={styles.cardBlock} key={c.id}>
                <Link to={`city/${c.id}`}>
                  <Card className={styles.card} title={c.name} image={c.img} subtitle={c.description} />
                </Link>
              </div>
            ))}
          </>
        ) : (
          <p>Города нет</p>
        )}
      </div>
      <div>
        {cities.meta === Meta.loading ? (
          <span></span>
        ) : (
          cities.count > 0 && (
            <div className={styles.containerPagination}>
              <Pagination limit={cities.LIMIT} count={cities.count} page={page} onChange={setPage} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default observer(CitiesPages);
