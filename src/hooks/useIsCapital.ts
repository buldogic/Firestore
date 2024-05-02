import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.coerce.boolean();

const KEY = 'isCapital';

export const useIsCapital = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isCapital = useMemo(() => {
    const serializedPage = (searchParams.get(KEY) ?? 'false') !== 'false';
    const capital = schema.safeParse(serializedPage);
      if (capital.success) return capital.data;
    return  false;
  }, [searchParams]);

  const setIsCapital = useCallback(
    (isCapital: boolean) => {
      setSearchParams((params) => {
        params.set(KEY, String(isCapital));
        return params;
      });
    },
    [setSearchParams],
  );

  return [isCapital, setIsCapital] as const;
};
