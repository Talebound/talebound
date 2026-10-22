import React, { useEffect } from 'react';
import { PbMapPinType, PbPinShape } from '../../../generated/api-types/data-contracts';
import { styled } from '../../../styles/stitches.config';
import MapPinBackground from '../MapAdministrationModals/MapPinTypeAdministrationModal/PinBackgroundShape/MapPinBackground';
import PinIcon from '../MapAdministrationModals/MapPinTypeAdministrationModal/PinIcon/PinIcon';

const PinWrapper = styled('div', {
  position: 'relative',
  overflow: 'visible',
});

const PinContentWrapper = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
});

interface MapPinProps {
  data: PbMapPinType;
}

const MapPin: React.FC<MapPinProps> = ({ data }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const width = data.width ?? 30;

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.width = `${width}px`;
      wrapperRef.current.style.height = `${width}px`;
    }
  }, [width]);

  return (
    <PinWrapper ref={wrapperRef}>
      {data.shape && (
        <PinContentWrapper>
          <MapPinBackground
            backgroundColor={data.backgroundColor}
            borderColor={data.borderColor}
            width={data.width}
            shape={data.shape ?? PbPinShape.NONE}
          />
        </PinContentWrapper>
      )}
      {data.icon && (
        <PinContentWrapper>
          <PinIcon size={data.iconSize} color={data.iconColor} icon={data.icon} />
        </PinContentWrapper>
      )}
    </PinWrapper>
  );
};

export default MapPin;
