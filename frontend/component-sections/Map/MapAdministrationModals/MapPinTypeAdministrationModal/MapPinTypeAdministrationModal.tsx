import React, { useMemo } from 'react';
import Modal from '../../../../components/Modal/Modal';
import MapPinTypeAdministrationContent from './MapPinTypeAdministrationContent';

interface MapPinTypeAdministrationModalProps {
  mapId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapPinTypeAdministrationModal: React.FC<MapPinTypeAdministrationModalProps> = ({
  mapId,
  open,
  setOpen,
}) => {
  const content = useMemo(() => <MapPinTypeAdministrationContent mapId={mapId} />, [mapId]);

  return (
    <Modal
      trigger={null}
      open={open}
      title={'Map pin type administration'}
      content={content}
      onOpenChange={setOpen}
      size="full"
    />
  );
};

export default MapPinTypeAdministrationModal;
