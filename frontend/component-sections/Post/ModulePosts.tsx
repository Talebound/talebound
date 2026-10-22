import React from 'react';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import ModuleLayout from '../../components/Layout/ModuleLayout';
import MapsScreen from '../../screens/menus/Maps/MapsScreen';
import PostsScreen from '../../screens/menus/Posts/PostsScreen';

interface ModulePostsProps {
  moduleId: number;
}

const ModulePosts: React.FC<ModulePostsProps> = ({ moduleId }) => {
  const role = useMyModuleRole(moduleId);
  const canEdit = isModuleCollaborator(role);

  return (
    <ModuleLayout>
      <PostsScreen canEdit={canEdit} moduleId={moduleId} />
    </ModuleLayout>
  );
};

export default ModulePosts;
