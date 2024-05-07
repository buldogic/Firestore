import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.array(z.coerce.number().int().positive());

const KEY = 'countries';

export const useCountriesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const countryIds = useMemo(() => {
    const serializedCountries = searchParams.get(KEY) ?? '';
    const countryIds = schema.safeParse(serializedCountries.split(','));
    if (countryIds.success) return countryIds.data;
    return [];
  }, [searchParams]);

  const setCountryIds = useCallback(
    (ids: number[]) => {
      setSearchParams((params) => {
        params.set(KEY, ids.join(','));
        return params;
      });
    },
    [setSearchParams],
  );

  return [countryIds, setCountryIds] as const;
};
