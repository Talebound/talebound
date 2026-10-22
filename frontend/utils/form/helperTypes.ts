export enum HelperType {
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
}

export type HelperMessage = {
  text: string;
  type?: HelperType;
};

export const helperOK: HelperMessage = {
  text: '',
  type: undefined,
};
