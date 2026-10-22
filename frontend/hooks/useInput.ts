import React, { useCallback, useState } from 'react';

type ValueType = string | number;

interface UseInputResponse<T extends ValueType, U extends HTMLInputElement | HTMLTextAreaElement> {
  value: T;
  onChange: (e: React.ChangeEvent<U>) => void;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export const useInput = <
  T extends ValueType,
  U extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement,
>(
  initialValue: T,
): UseInputResponse<T, U> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<U>) => {
    if (e.target.type === 'number') {
      setValue(parseFloat(e.target.value) as T);
    } else {
      setValue(e.target.value as T);
    }
  }, []);

  return {
    value,
    onChange,
    setValue,
  };
};
