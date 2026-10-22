import React from 'react';
import { Row } from '../Flex/Flex';
import Loading from './Loading';
import { Text } from '../Typography/Text';

const LoadingText: React.FC = () => {
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
