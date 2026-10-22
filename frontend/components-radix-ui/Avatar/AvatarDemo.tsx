import React from 'react';
import { AvatarRoot } from './AvatarRoot';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';
import { Flex } from '../../components/Flex/Flex';

const AvatarDemo: React.FC = () => {
  return (
    <Flex gap="lg">
      <AvatarRoot>
        <AvatarImage
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <AvatarFallback delayMs={600}>CT</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot>
        <AvatarImage
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Pedro Duarte"
        />
        <AvatarFallback delayMs={600}>JD</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot>
        <AvatarFallback>PD</AvatarFallback>
      </AvatarRoot>
    </Flex>
  );
};

export default AvatarDemo;
