declare module '*.svg' {
  import type React from 'react';
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module '*.svg?url' {
  import type { StaticImageData } from 'next/image';
  const image: StaticImageData;
  export default image;
}
