import React, { useMemo } from 'react';
import Modal from '../../../../components/Modal/Modal';
import MapPinAdministrationContent from './MapPinAdministrationContent';

interface MapPinAdministrationModalProps {
  mapId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapPinAdministrationModal: React.FC<MapPinAdministrationModalProps> = ({
  mapId,
  open,
  setOpen,
}) => {
  const content = useMemo(() => <MapPinAdministrationContent mapId={mapId} />, [mapId]);

  return (
    <Modal
      trigger={null}
      open={open}
      title={'Map pin administration'}
      content={content}
      onOpenChange={setOpen}
      size="full"
    />
  );
};

export default MapPinAdministrationModal;
