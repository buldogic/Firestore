import React, { useMemo } from 'react';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Meta } from '../../utils/meta';
import { Country } from '../../utils/fieldType';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import MultiDropdown from '../../components/MultiDropdown';
import { countries } from '../../store/CountriesStore';
import { truthy } from '../../utils/truthy';
import { useFilters } from '../../hooks/useFilters';
import LocalStoreCountries from './LocalStoreCountreis';
import styles from './CountriesPage.module.scss';

const CountriesPage = () => {
  const localStoreCountries = useMemo(() => new LocalStoreCountries(), []);
  const { page, search, countryIds, setPage, setSearch, setCountryIds } = useFilters();

  useEffect(() => {
    localStoreCountries.getCountries({ page, countryIds, search });
    countries.getCountries();
  }, [page, countryIds, search]);

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerSearch}>
          <Input className={styles.input} value={search} placeholder="Поиск" onChange={setSearch} />
          <Button onClick={() => setSearch('')}>Очистить</Button>
        </div>
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
        </div>
      </div>
      <div className={styles.containerCard}>
        <div className={styles.containerCardText}>
          <h2>Страны</h2>
        </div>
        {localStoreCountries.meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader />
          </div>
        ) : localStoreCountries.countries.length ? (
          <>
            {localStoreCountries.countries.map((c: Country) => (
              <div className={styles.cardBlock} key={c.id}>
                <Link to={`country/${c.id}`}>
                  <Card like={c.like} className={styles.card} title={c.name} image={c.img} subtitle={c.description} />
                </Link>
              </div>
            ))}
          </>
        ) : (
          <p>Страны нет</p>
        )}
      </div>
      <div>
        {localStoreCountries.meta === Meta.loading ? (
          <span></span>
        ) : (
          localStoreCountries.count > 0 && (
            <div className={styles.containerPagination}>
              <Pagination
                limit={localStoreCountries.LIMIT}
                count={localStoreCountries.count}
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

export default observer(CountriesPage);
