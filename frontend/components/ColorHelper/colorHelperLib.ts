import { styled } from '../../styles/stitches.config';

export interface ColorType {
  c: string;
  t: string;
}

export const baseColors: ColorType[] = [
  { c: '$primary', t: '$white' },
  { c: '$secondary', t: '$white' },
  { c: '$tertiary', t: '$white' },
  { c: '$black', t: '$white' },
  { c: '$white', t: '$black' },
  { c: '$pageBackground', t: '$black' },
  { c: '$navbarBackground', t: '$white' },
  { c: '$link', t: '$white' },
  { c: '$link2', t: '$white' },
];

export const primaryColors: ColorType[] = [
  { c: '$primary', t: '$white' },
  { c: '$primary100', t: '$black' },
  { c: '$primary200', t: '$black' },
  { c: '$primary300', t: '$black' },
  { c: '$primary400', t: '$black' },
  { c: '$primary500', t: '$white' },
  { c: '$primary600', t: '$white' },
  { c: '$primary700', t: '$white' },
  { c: '$primary800', t: '$white' },
  { c: '$primary900', t: '$white' },
];

export const secondaryColors: ColorType[] = [
  { c: '$secondary', t: '$white' },
  { c: '$secondary100', t: '$black' },
  { c: '$secondary200', t: '$black' },
  { c: '$secondary300', t: '$black' },
  { c: '$secondary400', t: '$black' },
  { c: '$secondary500', t: '$white' },
  { c: '$secondary600', t: '$white' },
  { c: '$secondary700', t: '$white' },
  { c: '$secondary800', t: '$white' },
  { c: '$secondary900', t: '$white' },
];

export const tertiaryColors: ColorType[] = [
  { c: '$tertiary', t: '$white' },
  { c: '$tertiary100', t: '$black' },
  { c: '$tertiary200', t: '$black' },
  { c: '$tertiary300', t: '$black' },
  { c: '$tertiary400', t: '$black' },
  { c: '$tertiary500', t: '$white' },
  { c: '$tertiary600', t: '$white' },
  { c: '$tertiary700', t: '$white' },
  { c: '$tertiary800', t: '$white' },
  { c: '$tertiary900', t: '$white' },
];

export const whiteColors: ColorType[] = [
  { c: '$white', t: '$white' },
  { c: '$white100', t: '$white100' },
  { c: '$white200', t: '$white200' },
  { c: '$white300', t: '$white300' },
  { c: '$white400', t: '$white400' },
  { c: '$white500', t: '$white500' },
  { c: '$white600', t: '$white600' },
  { c: '$white700', t: '$white700' },
  { c: '$white800', t: '$white800' },
  { c: '$white900', t: '$white900' },
];

export const transparentColors: ColorType[] = [
  { c: '$transparent0', t: '$black' },
  { c: '$transparent10', t: '$black' },
  { c: '$transparent20', t: '$black' },
  { c: '$transparent30', t: '$black' },
  { c: '$transparent40', t: '$black' },
  { c: '$transparent50', t: '$black' },
  { c: '$transparent60', t: '$black' },
  { c: '$transparent70', t: '$black' },
  { c: '$transparent80', t: '$black' },
  { c: '$transparent90', t: '$black' },
  { c: '$transparent100', t: '$black' },
];

export const statusColors: ColorType[] = [
  { c: '$success', t: '$white' },
  { c: '$danger', t: '$white' },
  { c: '$info', t: '$white' },
  { c: '$warning', t: '$white' },
];

export const StyledColorHelper = styled('div', {
  display: 'flex',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  border: '1px solid $black',
});

export const Square = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '10rem',
  height: '10rem',
  borderRadius: '2rem',
  padding: '1rem',

  variants: {
    imageBg: {
      true: {
        backgroundImage:
          'url(https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/efaae215-d5c5-4070-e61d-949f10521200/150x150)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      },
    },
    inside: {
      true: {
        width: '8rem',
        height: '8rem',
        padding: '0.25rem',
      },
    },
  },
});

export const defaultColorType: ColorType = {
  c: '$primary',
  t: '$white',
};
