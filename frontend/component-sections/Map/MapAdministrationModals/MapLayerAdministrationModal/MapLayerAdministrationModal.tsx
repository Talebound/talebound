import React, { useMemo } from 'react';
import Modal from '../../../../components/Modal/Modal';
import MapLayerAdministrationContent from './MapLayerAdministrationContent';

interface MapLayerAdministrationModalProps {
  mapId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapLayerAdministrationModal: React.FC<MapLayerAdministrationModalProps> = ({
  mapId,
  open,
  setOpen,
}) => {
  const content = useMemo(() => <MapLayerAdministrationContent mapId={mapId} />, [mapId]);

  return (
    <Modal
      trigger={null}
      open={open}
      title={'Map layer administration'}
      content={content}
      onOpenChange={setOpen}
      size="full"
    />
  );
};

export default MapLayerAdministrationModal;
