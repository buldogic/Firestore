import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.coerce.string();

const KEY = 'search';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    const serializedSearch = searchParams.get(KEY ?? '');
    const searchStr = schema.safeParse(serializedSearch);
    if (searchStr.success) return searchStr.data ;
    return ''
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
