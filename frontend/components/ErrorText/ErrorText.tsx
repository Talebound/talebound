import React, { useMemo } from 'react';
import { parseError } from '../../utils/types/error';
import { Text } from '../Typography/Text';

interface ErrorTextProps {
  error: unknown;
}

const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  const parsedError = useMemo(() => parseError(error), [error]);

  if (!parsedError) return null;

  return <Text color="danger">{parsedError}</Text>;
};

export default ErrorText;
