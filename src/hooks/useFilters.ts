import { useEffect } from 'react';
import { useCountriesFilter } from './useCountriesFilter';
import { useIsCapital } from './useIsCapital';
import { usePage } from './usePage';
import { useSearch } from './useSearch';

export const useFilters = () => {
  const [countryIds, setCountryIds] = useCountriesFilter();
  const [page, setPage] = usePage();
  const [isCapital, setIsCapital] = useIsCapital();
  const [search, setSearch] = useSearch();

  useEffect(() => {
    setPage(0);
  }, [countryIds, isCapital, search]);

  return {
    countryIds,
    page,
    isCapital,
    search,

    setCountryIds,
    setPage,
    setIsCapital,
    setSearch,
  };
};