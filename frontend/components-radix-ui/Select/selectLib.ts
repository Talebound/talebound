export const selectScrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: '$primary500',
  cursor: 'default',
};

export interface SelectOptionItems {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOptionItems[];
}

export type SelectOptions =
  | {
      type: 'group';
      groups: SelectOptionGroup[];
    }
  | {
      type: 'options';
      options: SelectOptionItems[];
    };
