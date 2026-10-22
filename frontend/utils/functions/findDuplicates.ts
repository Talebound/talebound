import _ from 'lodash';

export const findDuplicates = <T extends string | number>(arr: T[]): string[] => {
  return _(arr)
    .groupBy()
    .pickBy((x) => x.length > 1)
    .keys()
    .value();
};
