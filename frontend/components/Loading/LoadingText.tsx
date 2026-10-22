import React from 'react';
import { Row } from '../Flex/Flex';
import Loading from './Loading';
import { Text } from '../Typography/Text';

interface LoadingTextProps {}

const LoadingText: React.FC<LoadingTextProps> = () => {
  return (
    <Row gap="md" padding="sm">
      <Loading size="md" />
      <Text size="lg" color="primary">
        Loading...
      </Text>
    </Row>
  );
};

export default LoadingText;
