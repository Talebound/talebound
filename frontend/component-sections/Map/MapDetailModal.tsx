import React, { Suspense, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import LoadingText from '../../components/Loading/LoadingText';

// const Post = React.lazy(() => import('./Post'));

interface MapDetailModalProps {
  canEdit?: boolean;
  mapId?: number;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}

const MapDetailModal: React.FC<MapDetailModalProps> = ({
  canEdit = false,
  mapId,
  trigger,
  open,
  setOpen,
}) => {
  const content = useMemo(
    () =>
      mapId ? (
        <Suspense fallback={<LoadingText />}>
          {/*<Post key={mapId} postId={mapId} canEdit={canEdit} isModal={true} />*/}
          Map {mapId} {canEdit}
        </Suspense>
      ) : undefined,
    [canEdit, mapId],
  );

  return (
    <Modal
      noPadding
      size="md"
      trigger={trigger}
      open={open}
      content={content}
      onOpenChange={setOpen}
    />
  );
};

export default MapDetailModal;
