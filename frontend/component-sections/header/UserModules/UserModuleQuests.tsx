import React, { Suspense } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuCompass } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { PbUserModule } from '../../../generated/api-types/data-contracts';
import ModuleAspectDiamond from './ModuleAspectDiamond';

interface UserModuleQuestsProps {
  modules: PbUserModule[];
}

const UserModuleQuests: React.FC<UserModuleQuestsProps> = ({ modules }) => {
  const moduleIds = (modules ?? []).map((m) => m.moduleId!);

  const x = 'left',
    y = 'top';

  return (
    <AspectBox x={x} y={y}>
      <AspectBoxIcon x={x} y={y}>
        <LuCompass size={20} />
      </AspectBoxIcon>
      {moduleIds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x={x} y={y} text={'No quests'} />
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

export default UserModuleQuests;
