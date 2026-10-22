import React, { Suspense } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuComponent } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { PbUserModule } from '../../../generated/api-types/data-contracts';
import ModuleAspectDiamond from './ModuleAspectDiamond';

interface UserModuleSystemsProps {
  modules: PbUserModule[];
}

const UserModuleSystems: React.FC<UserModuleSystemsProps> = ({ modules }) => {
  const moduleIds = (modules ?? []).map((m) => m.moduleId!);
  console.log('UserModuleSystems', moduleIds);

  const x = 'right',
    y = 'bottom';

  return (
    <AspectBox x={x} y={y}>
      <AspectBoxIcon x={x} y={y}>
        <LuComponent size={20} />
      </AspectBoxIcon>
      {moduleIds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x={x} y={y} text={'No systems'} />
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

export default UserModuleSystems;
