import React, { Suspense } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuGlobe2 } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { PbUserModule } from '../../../generated/api-types/data-contracts';

const ModuleAspectDiamond = React.lazy(() => import('./ModuleAspectDiamond'));

interface UserModuleWorldsProps {
  modules: PbUserModule[];
}

const UserModuleWorlds: React.FC<UserModuleWorldsProps> = ({ modules }) => {
  const moduleIds = (modules ?? []).map((m) => m.moduleId!);

  const x = 'right',
    y = 'top';

  return (
    <AspectBox x={x} y={y}>
      <AspectBoxIcon x={x} y={y}>
        <LuGlobe2 size={20} />
      </AspectBoxIcon>
      {moduleIds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x={x} y={y} text={'No worlds'} />
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

export default UserModuleWorlds;
