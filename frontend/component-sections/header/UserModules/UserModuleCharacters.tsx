import React, { Suspense } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuUsers } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { PbUserModule } from '../../../generated/api-types/data-contracts';
import ModuleAspectDiamond from './ModuleAspectDiamond';

interface UserModuleCharactersProps {
  modules: PbUserModule[];
}

const UserModuleCharacters: React.FC<UserModuleCharactersProps> = ({ modules }) => {
  const moduleIds = (modules ?? []).map((m) => m.moduleId!);

  const x = 'left',
    y = 'bottom';

  return (
    <AspectBox x={x} y={y}>
      <AspectBoxIcon x={x} y={y}>
        <LuUsers size={20} />
      </AspectBoxIcon>
      {moduleIds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x={x} y={y} text={'No characters'} />
      )}
      <Suspense
        fallback={<AspectDiamond imgIdx={0} totalCount={0} index={0} x={x} y={y} text={'...'} />}
      >
        {moduleIds.map(
          (wid, idx) =>
            wid && (
              <ModuleAspectDiamond
                key={wid}
                moduleId={wid}
                totalCount={moduleIds.length}
                index={idx + 1}
                x={x}
                y={y}
              />
            ),
        )}
      </Suspense>
    </AspectBox>
  );
};

export default UserModuleCharacters;
