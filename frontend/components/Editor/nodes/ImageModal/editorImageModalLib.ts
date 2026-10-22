export enum EditorImageModalMode {
  Insert,
  Update,
}

export const EditorImageModalAction: Record<EditorImageModalMode, string> = {
  [EditorImageModalMode.Insert]: 'Add',
  [EditorImageModalMode.Update]: 'Update',
};
