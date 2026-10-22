/* oxlint-disable typescript/no-unsafe-assignment,typescript/no-unsafe-member-access */
import React, { CSSProperties, lazy, Suspense, SVGAttributes, useMemo } from 'react';
import type { IconType } from 'react-icons';
import { styled } from '../../styles/stitches.config';
import { isKeyOfObject } from '../../utils/functions/isKeyOfObject';

// listing all of these like this, because VITE has problem with dynamic imports

type IconPackages =
  | 'ai'
  | 'bi'
  | 'bs'
  | 'ci'
  | 'di'
  | 'fa'
  | 'fi'
  | 'go'
  | 'gr'
  | 'im'
  | 'io'
  | 'io5'
  | 'md'
  | 'ri'
  | 'rx'
  | 'wi'
  | 'fc'
  | 'gi'
  | 'hi'
  | 'hi2'
  | 'si'
  | 'sl'
  | 'tb'
  | 'tfi'
  | 'vsc'
  | 'cg';

// oxlint-disable-next-line typescript/no-explicit-any
const reactIconPackages: Record<IconPackages, any> = {
  ai: () => import(`react-icons/ai`),
  bs: () => import(`react-icons/bs`),
  bi: () => import(`react-icons/bi`),
  ci: () => import(`react-icons/ci`),
  di: () => import(`react-icons/di`),
  fi: () => import(`react-icons/fi`),
  fc: () => import(`react-icons/fc`),
  fa: () => import(`react-icons/fa`),
  gi: () => import(`react-icons/gi`),
  go: () => import(`react-icons/go`),
  gr: () => import(`react-icons/gr`),
  hi: () => import(`react-icons/hi`),
  hi2: () => import(`react-icons/hi2`),
  im: () => import(`react-icons/im`),
  io: () => import(`react-icons/io`),
  io5: () => import(`react-icons/io5`),
  md: () => import(`react-icons/md`),
  rx: () => import(`react-icons/rx`),
  ri: () => import(`react-icons/ri`),
  si: () => import(`react-icons/si`),
  sl: () => import(`react-icons/sl`),
  tb: () => import(`react-icons/ti`),
  tfi: () => import(`react-icons/ti`),
  vsc: () => import(`react-icons/vsc`),
  wi: () => import(`react-icons/wi`),
  cg: () => import(`react-icons/cg`),
};

// oxlint-disable-next-line typescript/no-explicit-any
const loadedPackages: Record<IconPackages, any> = {
  ai: undefined,
  bi: undefined,
  bs: undefined,
  cg: undefined,
  ci: undefined,
  di: undefined,
  fa: undefined,
  fc: undefined,
  fi: undefined,
  gi: undefined,
  go: undefined,
  gr: undefined,
  hi: undefined,
  hi2: undefined,
  im: undefined,
  io: undefined,
  io5: undefined,
  md: undefined,
  ri: undefined,
  rx: undefined,
  si: undefined,
  sl: undefined,
  tb: undefined,
  tfi: undefined,
  vsc: undefined,
  wi: undefined,
};

//<{ $small?: boolean }>

export const DynamicIconWrapper = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
  verticalAlign: '-0.25em',
  textRendering: 'optimizeLegibility',

  svg: {
    display: 'inline-block',
    lineHeight: 1,
    width: '1.25em',
    height: '1.25em',
  },

  '& + span': {
    marginLeft: '0.5rem',
  },

  variants: {
    small: {
      true: {
        svg: {
          width: '1em',
          height: '1em',
        },
      },
    },
  },
});

interface DynamicIconProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback?: React.JSX.Element | null;
  onClick?: () => void;
  showWrapper?: boolean;
  small?: boolean;
}

// Preserve names stored before react-icons normalized these exports in v5.
const legacyIconNames: Record<string, string> = {
  Gi3DHammer: 'Gi3dHammer',
  Gi3DMeeple: 'Gi3dMeeple',
  Gi3DStairs: 'Gi3dStairs',
};

const DynamicIcon: React.FC<DynamicIconProps> = ({
  fallback = null,
  showWrapper = false,
  small = false,
  ...props
}) => {
  const possibleLibraries: string[] = useMemo(() => {
    const twoLetters = props.icon.slice(0, 2);
    const threeLetters = props.icon.slice(0, 3);
    const finalPackages: string[] = [];

    if (['Vsc', 'Tfi'].includes(threeLetters)) {
      finalPackages.push(threeLetters.toLowerCase());
    } else {
      // Ionicons 5 have the same prefix as Ionicons 4
      // HeroIcons 2 have the same prefix as HeroIcons
      finalPackages.push(twoLetters.toLowerCase());
      if (twoLetters === 'Io') {
        finalPackages.push('io5');
      } else if (twoLetters === 'Hi') {
        finalPackages.push('hi2');
      }
    }

    return finalPackages;
  }, [props.icon]);

  const Icon = useMemo(
    () =>
      lazy<IconType>(async () => {
        const lib = possibleLibraries[0];
        const iconName = legacyIconNames[props.icon] ?? props.icon;
        if (isKeyOfObject(lib, reactIconPackages)) {
          let module = loadedPackages[lib] ? loadedPackages[lib] : await reactIconPackages[lib]();
          if (isKeyOfObject(iconName, module)) {
            // oxlint-disable-next-line typescript/no-unnecessary-condition
            if (iconName !== 'default') return { default: module[iconName] };
          } else if (possibleLibraries.length > 1) {
            const lib = possibleLibraries[1];
            if (isKeyOfObject(lib, reactIconPackages)) {
              module = loadedPackages[lib] ? loadedPackages[lib] : await reactIconPackages[lib]();
              if (isKeyOfObject(iconName, module)) {
                // oxlint-disable-next-line typescript/no-unnecessary-condition
                if (iconName !== 'default') return { default: module[iconName] };
              }
            }
          }
        }

        const defaultModule = loadedPackages.gr ? loadedPackages.gr : await reactIconPackages.gr();
        return { default: defaultModule.GrStatusUnknown };
      }),
    [props.icon, possibleLibraries],
  );

  return (
    <Suspense fallback={fallback ?? <DynamicIconWrapper small={small} />}>
      {showWrapper ? (
        <DynamicIconWrapper small={small}>
          <Icon {...props} />
        </DynamicIconWrapper>
      ) : (
        <Icon {...props} />
      )}
    </Suspense>
  );
};

export default React.memo(DynamicIcon);
