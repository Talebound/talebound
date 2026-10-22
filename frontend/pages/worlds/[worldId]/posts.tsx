import React from 'react';
import ModulePosts from '../../../component-sections/Post/ModulePosts';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const WorldPosts: React.FC = () => {
  const moduleId = useUrlModuleId();

  return <ModulePosts moduleId={moduleId} />;
};

export default WorldPosts;
