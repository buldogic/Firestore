import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.coerce.number().int().positive();

const KEY = 'page';

export const usePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const serializedPage = searchParams.get(KEY);
    const page = schema.safeParse(serializedPage);
    if (page.success) return page.data - 1;
    return 0;
  }, [searchParams]);

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((params) => {
        params.set(KEY, String(page + 1));
        return params;
      });
    },
    [setSearchParams],
  );

  return [page, setPage] as const;
};
