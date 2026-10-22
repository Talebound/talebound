import React, { useCallback, useState } from 'react';
import { SelectOptions } from '../../../components-radix-ui/Select/selectLib';
import Select from '../../../components/Select/Select';

const options: SelectOptions = {
  type: 'options',
  options: [
    { value: 'world-region', label: 'World, Region' },
    { value: 'city-town', label: 'City' },
    { value: 'interior', label: 'Interior' },
    { value: 'battlefield', label: 'Battlefield' },
  ],
};

interface SelectMapTypeProps {
  defaultValue?: string;
  onChange: (val: string) => void;
}

const SelectMapType: React.FC<SelectMapTypeProps> = ({
  defaultValue = 'world-region',
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandler = useCallback(
    (val: string) => {
      onChange(val);
      setValue(val);
    },
    [onChange],
  );

  return (
    <Select
      id="position"
      label="Map type"
      fullWidth={true}
      defaultValue={defaultValue}
      onValueChange={onChangeHandler}
      value={value}
      options={options}
    />
  );
};

export default SelectMapType;
