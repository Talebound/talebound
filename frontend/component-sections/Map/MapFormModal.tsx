import React, { Suspense, useCallback, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import { PbMap } from '../../generated/api-types/data-contracts';
import MapForm from './MapForm';
import { useUrlModuleId } from '../../hooks/useUrlModuleId';

interface MapFormModalProps {
  map?: PbMap;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen: (v: boolean) => void;
}

const MapFormModal: React.FC<MapFormModalProps> = ({ map, trigger, open, setOpen }) => {
  const onFinishCallback = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const moduleId = useUrlModuleId();

  const content = useMemo(
    () => (
      <Suspense fallback={null}>
        <MapForm mapId={map?.id} moduleId={moduleId} onFinishCallback={onFinishCallback} />
      </Suspense>
    ),
    [map?.id, moduleId, onFinishCallback],
  );

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={map ? 'Update map' : 'Create map'}
      content={content}
      onOpenChange={setOpen}
      size="sm"
    />
  );
};

export default MapFormModal;
