import * as React from 'react';
import { ReactNode } from 'react';
import { styled } from '../../../styles/stitches.config';

const PlaceholderRoot = styled('div', {
  fontSize: '15px',
  color: '#999',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '8px',
  left: '28px',
  right: '28px',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  pointerEvents: 'none',
});

export default function Placeholder({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return <PlaceholderRoot className={className || ''}>{children}</PlaceholderRoot>;
}
