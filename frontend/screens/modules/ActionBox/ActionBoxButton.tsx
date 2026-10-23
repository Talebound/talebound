import React from 'react';
import { Button } from '../../../components/Button/Button';
import Link from 'next/link';

interface ActionBoxButtonProps {
  moduleTypeId?: number;
  linkPrefix?: string;
  linkSuffix: string;
  text: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const ActionBoxButton: React.FC<ActionBoxButtonProps> = ({
  moduleTypeId,
  linkPrefix,
  linkSuffix,
  text,
  icon,
  active,
}) => {
  return (
    <Link href={`/${linkPrefix}/${moduleTypeId}/${linkSuffix}`}>
      <Button size="md" color={active ? 'primaryOutline' : 'semiGhost'}>
        {icon}
        {text}
      </Button>
    </Link>
  );
};

export default ActionBoxButton;
