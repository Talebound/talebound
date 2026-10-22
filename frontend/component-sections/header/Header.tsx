import React, { useMemo } from 'react';
import Menu from './Menu';
import { styled } from '../../styles/stitches.config';
import { HeaderTransparentSection } from '../../components/HeaderTransparentSection/HeaderTransparentSection';
import { useAuth } from '../../hooks/useAuth';
import { UserDiamond } from './ControlPanel/UserDiamond';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import UserModuleQuests from './UserModules/UserModuleQuests';
import UserModuleWorlds from './UserModules/UserModuleWorlds';
import UserModuleCharacters from './UserModules/UserModuleCharacters';
import UserModuleSystems from './UserModules/UserModuleSystems';
import { useImage } from '../../hooks/useImage';
import { useGetUserModules } from '../../api/users/useGetUserModules';
import { moduleSelectors } from '../../adapters/ModuleAdapter';
import { PbModuleType, PbUserModule } from '../../generated/api-types/data-contracts';

const BaseHeader = styled('div', {
  width: '100%',
  height: '300px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});

const Header: React.FC = () => {
  const { user } = useAuth();
  const headerImage = useSelector((state: ReduxState) => state.global.headerImage);
  const { image } = useImage(user?.imgId ?? 0);

  const userId = useSelector((state) => state.auth.user?.id);
  const modules = useSelector((state) => moduleSelectors.selectAll(state));

  const { data: moduleData } = useGetUserModules({
    variables: userId ?? 0,
  });

  const filteredUserModules = useMemo(() => {
    const um = moduleData?.userModules ?? [];
    const parsedModules: Record<PbModuleType, PbUserModule[]> = {
      [PbModuleType.MODULE_TYPE_UNKNOWN]: [],
      [PbModuleType.MODULE_TYPE_WORLD]: [],
      [PbModuleType.MODULE_TYPE_SYSTEM]: [],
      [PbModuleType.MODULE_TYPE_CHARACTER]: [],
      [PbModuleType.MODULE_TYPE_QUEST]: [],
    };

    modules.forEach((m) => {
      console.log({ m }, m.moduleType);
      if (m.id && m.moduleType) {
        const userModule = um.find((userModule) => m.id === userModule.moduleId);
        if (userModule) {
          parsedModules[m.moduleType].push(userModule);
        }
      }
    });
    return parsedModules;
  }, [moduleData?.userModules, modules]);

  return (
    <BaseHeader css={{ backgroundImage: `url("${headerImage}")` }}>
      <Menu />
      <HeaderTransparentSection position="left">
        <UserModuleQuests modules={filteredUserModules[PbModuleType.MODULE_TYPE_QUEST]} />
        <UserModuleWorlds modules={filteredUserModules[PbModuleType.MODULE_TYPE_WORLD]} />
        <UserModuleSystems modules={filteredUserModules[PbModuleType.MODULE_TYPE_SYSTEM]} />
        <UserModuleCharacters modules={filteredUserModules[PbModuleType.MODULE_TYPE_CHARACTER]} />
        <UserDiamond>
          <Link href={`/user/${user?.id}/profile`}>
            <img src={image?.url ?? DEFAULT_AVATAR_URL} alt="User avatar" />
          </Link>
        </UserDiamond>
      </HeaderTransparentSection>
      <HeaderTransparentSection position="right" id="action-box" />
    </BaseHeader>
  );
};

export default Header;
