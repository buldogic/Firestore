import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { Normalize } from '../utils/normolaizText';

const schema = z.string();

const KEY = 'search';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    const serializedSearch = searchParams.get(KEY ?? '');
    const searchStr = schema.safeParse(Normalize(serializedSearch));
    if (searchStr.success) return searchStr.data;
    return '';
  }, [searchParams]);

  const setSearch = useCallback(
    (search: string) => {
      setSearchParams((params) => {
        params.set(KEY, search);
        return params;
      });
    },
    [setSearchParams],
  );

  return [search, setSearch] as const;
};
