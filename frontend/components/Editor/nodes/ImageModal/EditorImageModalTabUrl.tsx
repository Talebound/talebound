import React, { useEffect } from 'react';
import { useInput } from '../../../../hooks/useInput';
import Input from '../../../Input/Input';
import { Row } from '../../../Flex/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { updateInlineImagePayload } from './editorImageModalSlice';
import { ReduxState } from '../../../../store';

const EditorImageModalTabUrl: React.FC = () => {
  const dispatch = useDispatch();
  const src = useSelector((state: ReduxState) => state.editorImageModal.inlineImagePayload.src);
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
