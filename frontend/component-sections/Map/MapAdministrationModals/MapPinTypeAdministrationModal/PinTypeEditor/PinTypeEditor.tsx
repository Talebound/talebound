import React, { useCallback, useMemo } from 'react';
import { PbMapPinType, PbPinShape } from '../../../../../generated/api-types/data-contracts';
import PinBackgroundShapeSelect from '../PinBackgroundShape/PinBackgroundShapeSelect';
import Slider from '../../../../../components/Slider/Slider';
import { useUpdateMapPinType } from '../../../../../api/maps/useUpdateMapPinType';
import ErrorText from '../../../../../components/ErrorText/ErrorText';
import { useUrlModuleId } from '../../../../../hooks/useUrlModuleId';
import { useGetMapPinTypesAndGroups } from '../../../../../api/maps/useGetMapPinTypesAndGroups';
import { Col, Row } from '../../../../../components/Flex/Flex';
import { Label } from '../../../../../components/Typography/Label';
import PinIconSelect from '../PinIconSelector/PinIconSelect';
import { PinIconType } from '../PinIconSelector/pinIconLib';
import ColorPicker from '../../../../../components/ColorPicker/ColorPicker';
import { TitleH2 } from '../../../../../components/Typography/Title';
import MapPin from '../../../MapPin/MapPin';

interface PinTypeEditorProps {
  pinTypeId: number;
}

const PinTypeEditor: React.FC<PinTypeEditorProps> = ({ pinTypeId }) => {
  const moduleId = useUrlModuleId();
  const { data: mapPinTypesAndGroups, isFetching: isPending } = useGetMapPinTypesAndGroups({
    variables: moduleId,
  });

  const pinData = useMemo(
    () => (mapPinTypesAndGroups?.pinTypes ?? []).find((x) => x.id === pinTypeId),
    [mapPinTypesAndGroups, pinTypeId],
  );
  const pinShape = pinData?.shape ?? PbPinShape.NONE;
  const pinIcon = pinData?.icon ?? '';

  const {
    mutate: updateMapPinType,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateMapPinType();

  const onChangeHandler = useCallback(
    (body: Partial<Omit<PbMapPinType, 'id' | 'isDefault' | 'mapPinTypeGroupId'>>) => {
      updateMapPinType({
        moduleId,
        pinTypeId,
        body: {
          ...body,
        },
      });
    },
    [moduleId, pinTypeId, updateMapPinType],
  );

  const onChangePinShape = useCallback(
    (shape: PbPinShape) => onChangeHandler({ shape }),
    [onChangeHandler],
  );

  const onChangePinIcon = useCallback(
    (icon: PinIconType) => onChangeHandler({ icon }),
    [onChangeHandler],
  );

  const onChangeBackgroundWidth = useCallback(
    (value: number[]) => onChangeHandler({ width: value[0] }),
    [onChangeHandler],
  );

  const onChangeIconSize = useCallback(
    (value: number[]) => onChangeHandler({ iconSize: value[0] }),
    [onChangeHandler],
  );

  const onChangeIconColor = useCallback(
    (value: string | undefined) => onChangeHandler({ iconColor: value ?? 'transparent' }),
    [onChangeHandler],
  );

  const onChangeBorderColor = useCallback(
    (value: string | undefined) => onChangeHandler({ borderColor: value ?? 'transparent' }),
    [onChangeHandler],
  );

  const onChangeBackgroundColor = useCallback(
    (value: string | undefined) => onChangeHandler({ backgroundColor: value ?? 'transparent' }),
    [onChangeHandler],
  );

  const loading = isPending || isPendingUpdate;

  return (
    <>
      <Col gap="sm" fullWidth>
        <Row gap="md" alignItems="start" fullWidth>
          <Row css={{ width: 100, minWidth: 100 }}>
            <TitleH2>Shape</TitleH2>
          </Row>
          <Row grow alignItems="center">
            <PinBackgroundShapeSelect selected={pinShape} onChange={onChangePinShape} />
          </Row>
        </Row>
        {pinShape !== PbPinShape.NONE && (
          <>
            <Row gap="md" alignItems="center" fullWidth>
              <Row css={{ width: 100 }}>
                <Label>Background</Label>
              </Row>
              <Row grow alignItems="center">
                <ColorPicker
                  value={pinData?.backgroundColor ?? 'transparent'}
                  onChange={onChangeBackgroundColor}
                />
              </Row>
            </Row>
            <Row gap="md" alignItems="center" fullWidth>
              <Row css={{ width: 100 }}>
                <Label>Border</Label>
              </Row>
              <Row grow alignItems="center">
                <ColorPicker
                  value={pinData?.borderColor ?? 'transparent'}
                  onChange={onChangeBorderColor}
                />
              </Row>
            </Row>
            <Row gap="md" alignItems="center" fullWidth>
              <Row css={{ width: 100 }}>
                <Label>Size</Label>
              </Row>
              <Row grow alignItems="center" justifyContent="center">
                <Slider
                  min={10}
                  max={50}
                  defaultValue={[pinData?.width ?? 30]}
                  onValueCommit={onChangeBackgroundWidth}
                  disabled={loading}
                  showValue
                  suffix="px"
                />
              </Row>
            </Row>
          </>
        )}
        <Row>&nbsp;</Row>
        <Row gap="md" alignItems="start" fullWidth>
          <Row css={{ width: 100, minWidth: 100 }}>
            <TitleH2>Icon</TitleH2>
          </Row>
          <Row grow alignItems="center">
            <PinIconSelect selected={pinIcon} onChange={onChangePinIcon} />
          </Row>
        </Row>
        {pinIcon !== '' && (
          <>
            <Row gap="md" alignItems="center" fullWidth>
              <Row css={{ width: 100 }}>
                <Label>Color</Label>
              </Row>
              <Row grow alignItems="center">
                <ColorPicker
                  value={pinData?.iconColor ?? 'transparent'}
                  onChange={onChangeIconColor}
                />
              </Row>
            </Row>
            <Row gap="md" alignItems="center" fullWidth>
              <Row css={{ width: 100 }}>
                <Label>Size</Label>
              </Row>
              <Row grow alignItems="center" justifyContent="center">
                <Slider
                  min={10}
                  max={30}
                  defaultValue={[pinData?.iconSize ?? 30]}
                  onValueCommit={onChangeIconSize}
                  disabled={loading}
                  showValue
                  suffix="px"
                />
              </Row>
            </Row>
          </>
        )}

        <Row>&nbsp;</Row>
        <Row gap="md" alignItems="start" fullWidth>
          <Row css={{ width: 100, minWidth: 100 }}>
            <TitleH2>Preview</TitleH2>
          </Row>
          <Row grow alignItems="center">
            {pinData && <MapPin data={pinData} />}
          </Row>
        </Row>
      </Col>
      <ErrorText error={errorUpdate} />
    </>
  );
};

export default PinTypeEditor;
