import Link from 'next/link';
import { styled } from '../../styles/stitches.config';

export const NavigationItem = styled(Link, {
  fontFamily: '$heading',
  fontWeight: '$bold',
  textTransform: 'uppercase',
  color: '$primary800',
  fontSize: '$xl',
  textDecoration: 'none',
});
