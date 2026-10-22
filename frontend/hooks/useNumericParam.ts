import { useRouter } from 'next/router';

const useNumericParam = (paramName: string): number | undefined => {
  const router = useRouter();
  const value = router.query[paramName];

  let result = 0;

  if (typeof value === 'string') {
    result = parseInt(value, 10);
  }

  if (result > 0) return result;
  return undefined;
};

export default useNumericParam;
