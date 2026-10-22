import React, { useCallback, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import LocationForm from './LocationForm';
import { PbModule, PbViewLocation } from '../../generated/api-types/data-contracts';

interface LocationFormModalProps {
  module: PbModule;
  location?: PbViewLocation;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen: (v: boolean) => void;
}

const LocationFormModal: React.FC<LocationFormModalProps> = ({
  module,
  location,
  trigger,
  open,
  setOpen,
}) => {
  const onFinishCallback = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const content = useMemo(
    () => <LocationForm location={location} module={module} onFinishCallback={onFinishCallback} />,
    [location, onFinishCallback, module],
  );

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={location ? 'Update location' : 'Create location'}
      content={content}
      onOpenChange={setOpen}
      size="sm"
    />
  );
};

export default LocationFormModal;
