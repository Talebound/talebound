import React, { useEffect } from 'react';
import { useInput } from '../../../../hooks/useInput';
import Input from '../../../Input/Input';
import { Row } from '../../../Flex/Flex';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { updateInlineImagePayload } from './editorImageModalSlice';
import { ReduxState } from '../../../../store';

const EditorImageModalTabUrl: React.FC = () => {
  const dispatch = useAppDispatch();
  const src = useAppSelector((state: ReduxState) => state.editorImageModal.inlineImagePayload.src);
  const { value: urlValue, onChange: onChangeUrl } = useInput<string>(src);

  useEffect(() => {
    dispatch(
      updateInlineImagePayload({
        src: urlValue,
      }),
    );
  }, [dispatch, urlValue]);

  return (
    <Row gap="sm" css={{ width: '300px' }}>
      <Input
        id="imageUrl"
        label="Image URL"
        onChange={onChangeUrl}
        value={src}
        required
        fullWidth
      />
    </Row>
  );
};

export default EditorImageModalTabUrl;
