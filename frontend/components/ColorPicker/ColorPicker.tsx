import React, { useCallback, useEffect, useMemo } from 'react';
import { styled } from '../../styles/stitches.config';
import { CSSProperties } from '@stitches/react';
import ColorPickerModal from '../Editor/plugins/TableCellActionMenuPlugin/ColorPickerModal';
import debounce from 'lodash.debounce';

const ColorPickerWrapper = styled('div', {
  width: `50px`,
  height: `20px`,
  border: '2px solid black',
});

interface ColorPickerProps {
  title?: string;
  value: CSSProperties['color'];
  onChange: (value: CSSProperties['color']) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ title, value, onChange }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && value) {
      ref.current.style.backgroundColor = value;
    }
  }, [value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((value: CSSProperties['color']) => {
      if (onChange) onChange(value);
    }, 500),
    [onChange],
  );

  const trigger = useMemo(() => <ColorPickerWrapper ref={ref} />, []);

  return (
    <ColorPickerModal
      trigger={trigger}
      title={title}
      color={value ?? 'transparent'}
      onChange={onChangeHandlerDebounced}
    />
  );
};

export default ColorPicker;
