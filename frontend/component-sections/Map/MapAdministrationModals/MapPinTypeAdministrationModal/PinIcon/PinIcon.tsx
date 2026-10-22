import React, { useMemo } from 'react';
import { pinIconObject, PinIconType } from '../PinIconSelector/pinIconLib';

interface PinIconProps {
  icon: PinIconType;
  size?: number;
  color?: string;
}

const PinIcon: React.FC<PinIconProps> = ({ icon, size, color }) => {
  const Icon = useMemo(() => (icon !== '' ? pinIconObject[icon] : null), [icon]);

  if (!Icon) return null;
  return <Icon color={color} size={size ?? 30} />;
};

export default PinIcon;
