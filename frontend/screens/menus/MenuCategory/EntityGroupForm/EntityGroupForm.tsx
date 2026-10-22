import React, { useCallback, useState } from 'react';
import {
  PbEntityGroup,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
} from '../../../../generated/api-types/data-contracts';
import { useInput } from '../../../../hooks/useInput';
import Textarea from '../../../../components/Textarea/Textarea';
import Input from '../../../../components/Input/Input';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Button } from '../../../../components/Button/Button';
import { UpdateEntityGroupParams } from '../../../../api/entities/useUpdateEntityGroup';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { HelperType } from '../../../../utils/form/helperTypes';
import GroupStyleSelector from './GroupStyleSelector';
import ContentDirectionSelector from './ContentDirectionSelector';

const textareaPlaceholder = 'Description of the group. What information does this post contain?';

interface EntityGroupFormProps {
  entityGroup?: PbEntityGroup;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeStyle?: boolean;
  canChangeDirection?: boolean;
  onSubmitCallback: (data: UpdateEntityGroupParams['body']) => void;
  submitPending?: boolean;
  submitError?: Error | null;
}

const EntityGroupForm: React.FC<EntityGroupFormProps> = ({
  entityGroup,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeStyle = true,
  canChangeDirection = true,
  onSubmitCallback,
  submitPending = false,
  submitError,
}) => {
  const { value: name, onChange: onChangeName } = useInput<string>(entityGroup?.name ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    entityGroup?.description ?? '',
  );

  const [style, setStyle] = useState<PbEntityGroupStyle>(
    entityGroup?.style ?? PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED,
  );
  const [direction, setDirection] = useState<PbEntityGroupDirection>(
    entityGroup?.direction ?? PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL,
  );

  const pending = submitPending;

  const submitEntityGroupHandler = useCallback(() => {
    const entityGroupData = {
      name,
      description,
      style: style as PbEntityGroupStyle,
      direction: direction as PbEntityGroupDirection,
    };

    onSubmitCallback(entityGroupData);
  }, [name, description, style, direction, onSubmitCallback]);

  if (!canChangeTitle && !canChangeDescription) return null;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeTitle && (
            <Input
              id="name"
              label="Name"
              helperText="Empty value means title won't be displayed in real-mode"
              helperType={HelperType.Info}
              onChange={onChangeName}
              value={name}
              required
              fullWidth
            />
          )}
          {canChangeDescription && (
            <Textarea
              id="description"
              label="Short description"
              placeholder={textareaPlaceholder}
              rows={5}
              value={description}
              onChange={onChange}
            />
          )}
          <Row gap="md" alignSelf="start">
            {canChangeStyle && <GroupStyleSelector value={style} onValueChange={setStyle} />}
            {canChangeDirection && (
              <ContentDirectionSelector value={direction} onValueChange={setDirection} />
            )}
          </Row>
          <Row alignSelf="end">
            <Button onClick={submitEntityGroupHandler} loading={pending}>
              {entityGroup ? 'Update' : 'Create'}
            </Button>
          </Row>
          <ErrorText error={submitError} />
        </Col>
      </Row>
    </>
  );
};

export default EntityGroupForm;
