export interface ModuleData {
  marker: {
    imgIdx?: number;
    entityId?: number;
    name?: string;
    avatarUrl?: string;
    linkUrl?: string;
  }[];
}

export const generateModuleData = () => {
  const randNumber = Math.floor(Math.random() * 5);
  const moduleData: ModuleData = {
    marker: [],
  };
  for (let i = 0; i < randNumber; i++) {
    moduleData.marker.push({
      imgIdx: Math.floor(Math.random() * 10),
    });
  }

  return moduleData;
};
