import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderImage } from '../../store/globalSlice';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';
import { useImage } from '../../hooks/useImage';
import { useModule } from '../../hooks/useModule';

interface ModuleOpenedProps {
  moduleId: number;
}

const ModuleOpened: React.FC<ModuleOpenedProps> = ({ moduleId }) => {
  const dispatch = useDispatch();
  const { module } = useModule(moduleId);
  const { image: headerImg } = useImage(module?.headerImgId);

  useEffect(() => {
    if (headerImg?.url) {
      dispatch(setHeaderImage(imageModifyVariant(headerImg?.url, ImageVariant['1920x300'])));
    }
  }, [dispatch, headerImg?.url]);

  return null;
};

export default ModuleOpened;
