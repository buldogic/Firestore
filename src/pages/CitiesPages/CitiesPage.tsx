import React, { useMemo } from 'react';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Meta } from '../../utils/meta';
import { City } from '../../utils/fieldType';
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
import CitiesLocalStore from './CitiesLocalStore';

const CitiesPages = () => {
  const citiesLocalStore = useMemo(() => new CitiesLocalStore(), []);
  const { page, isCapital, search, countryIds, setPage, setSearch, setIsCapital, setCountryIds } = useFilters();

  useEffect(() => {
    citiesLocalStore.getCities({ page, countryIds, isCapital, search });
    countries.getCountries();
  }, [page, countryIds, isCapital, search]);

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerSearch}>
          <Input className={styles.input} value={search} placeholder="Поиск" onChange={setSearch} />
          <Button onClick={() => setSearch('')}>Очистить</Button>
        </div>
        {countries.countries.length === 0 ? (
          <div></div>
        ) : (
          <div className={styles.filterContain}>
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
              getTitle={(options) => (options.length ? options.map((o) => o.value).join(', ') : 'Страна')}
            />
            <p>Столица</p>
            <CheckBox value={isCapital} onChange={setIsCapital}></CheckBox>
          </div>
        )}
      </div>
      <div className={styles.containerCard}>
        <div className={styles.containerCardText}>
          <h2>Города</h2>
        </div>
        {citiesLocalStore.meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader />
          </div>
        ) : citiesLocalStore.cities.length ? (
          <>
            {citiesLocalStore.cities.map((c: City) => (
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
        {citiesLocalStore.meta === Meta.loading ? (
          <span></span>
        ) : (
          citiesLocalStore.count > 0 && (
            <div className={styles.containerPagination}>
              <Pagination
                limit={citiesLocalStore.LIMIT}
                count={citiesLocalStore.count}
                page={page}
                onChange={setPage}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default observer(CitiesPages);
