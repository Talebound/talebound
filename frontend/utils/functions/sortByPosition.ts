type HasPosition = {
  position?: number;
};

export const sortByPosition = (a: HasPosition, b: HasPosition) =>
  (a?.position ?? 0) - (b?.position ?? 0);

export const sortByPositionDesc = (a: HasPosition, b: HasPosition) =>
  (b?.position ?? 0) - (a?.position ?? 0);
