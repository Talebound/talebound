import React, { useCallback, useEffect } from 'react';
import { useInput } from '../../../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import { updateInlineImagePayload } from './editorImageModalSlice';
import { Col } from '../../../Flex/Flex';
import Input from '../../../Input/Input';
import Checkbox from '../../../Checkbox/Checkbox';
import Select from '../../../Select/Select';
import { SelectOptions } from '../../../../components-radix-ui/Select/selectLib';
import { $isInlineImagePosition } from '../InlineImageNode/InlineImageNode';

const options: SelectOptions = {
  type: 'options',
  options: [
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'none', label: 'None' },
  ],
};

const EditorImageAttributes: React.FC = () => {
  const dispatch = useDispatch();
  const showCaption = useSelector(
    (state: ReduxState) => state.editorImageModal.inlineImagePayload.showCaption,
  );
  const position = useSelector(
    (state: ReduxState) => state.editorImageModal.inlineImagePayload.position,
  );
  const { value: altValue, onChange: onChangeAlt } = useInput<string>('');

  useEffect(() => {
    dispatch(
      updateInlineImagePayload({
        altText: altValue,
      }),
    );
  }, [altValue, dispatch]);

  const onChangeShowCaption = useCallback(
    (value: boolean) => {
      dispatch(
        updateInlineImagePayload({
          showCaption: value,
        }),
      );
    },
    [dispatch],
  );

  const onChangePosition = useCallback(
    (value: string) => {
      if ($isInlineImagePosition(value)) {
        dispatch(
          updateInlineImagePayload({
            position: value,
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <Col css={{ width: '300px' }}>
      <Input id={'alt'} label={'Alt text (when not loaded)'} onChange={onChangeAlt} />
      <Select
        id="position"
        label="Position"
        fullWidth={true}
        defaultValue={position}
        onValueChange={onChangePosition}
        value={position}
        options={options}
      />

      <Checkbox id="req_checkbox" checked={showCaption} onCheckedChange={onChangeShowCaption}>
        Show caption
      </Checkbox>
    </Col>
  );
};

export default EditorImageAttributes;
