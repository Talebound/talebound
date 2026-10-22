import React, { useCallback, useEffect } from 'react';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { Reorder, useDragControls } from 'framer-motion';
import NavbarHeader from '../../../components/LeftNavbar/NavbarHeader';
import { NavbarItem, NavbarSquare } from '../../../components/LeftNavbar/navbarComponents';
import { MdArrowDropDown, MdArrowDropUp, MdDelete, MdDragIndicator } from 'react-icons/md';
import { UpdateMenuItemParams, useUpdateMenuItem } from '../../../api/menus/useUpdateMenuItem';
import { useInput } from '../../../hooks/useInput';
import Input from '../../../components/Input/Input';
import debounce from 'lodash.debounce';
import { simplifyString } from '../../../utils/functions/simplifyString';
import Checkbox from '../../../components/Checkbox/Checkbox';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import { useUpdateMenuItemMoveGroupUp } from '../../../api/menus/useUpdateMenuItemMoveGroupUp';
import { DragHandle, InputWrapper, Item, NavbarWrapper } from './menuAdministrationComponents';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import { useDeleteMenuItem } from '../../../api/menus/useDeleteMenuItem';

interface MenuAdministrationItemProps {
  data: PbMenuItem;
  currentIndex: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  groupMovableUp?: boolean;
  groupMovableDown?: boolean;
  nextGroupItemId?: number;
  notUniqueCode?: boolean;
  reservedCodes?: string[];
  setError: React.Dispatch<unknown>;
}

const MenuItem: React.FC<MenuAdministrationItemProps> = ({
  data,
  currentIndex,
  setLoading,
  groupMovableUp,
  groupMovableDown,
  nextGroupItemId,
  notUniqueCode = false,
  reservedCodes = [],
  setError,
}) => {
  const controls = useDragControls();
  const [dragging, setDragging] = React.useState(false);
  const {
    value: nameValue,
    onChange: onChangeName,
    setValue: setNameValue,
  } = useInput(data.name ?? '');

  const {
    value: codeValue,
    onChange: onChangeCode,
    setValue: setCodeValue,
  } = useInput(data.code ?? '');

  const onSettled = useCallback(() => {
    setLoading(false);
    setError(undefined);
  }, [setLoading, setError]);

  const {
    mutate: updateMenuItem,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useUpdateMenuItem({
    onSettled,
  });

  const {
    mutate: updateMenuItemMoveGroupUp,
    isPending: isPendingUpdateMoveGroupUp,
    // isError: isErrorUpdateMoveGroupUp,
    error: errorUpdateMoveGroupUp,
  } = useUpdateMenuItemMoveGroupUp({
    onSettled,
  });

  const {
    mutate: deleteMenuItem,
    isPending: isPendingDelete,
    // isError: isErrorDelete,
    error: errorDelete,
  } = useDeleteMenuItem({
    onSettled,
  });

  useEffect(() => {
    if (errorUpdate || errorUpdateMoveGroupUp || errorDelete) {
      setError(errorUpdate ?? errorUpdateMoveGroupUp ?? errorDelete);
    }
  }, [errorUpdate, errorUpdateMoveGroupUp, errorDelete, setError]);

  useEffect(() => {
    if (isPendingUpdate || isPendingUpdateMoveGroupUp || isPendingDelete) {
      setLoading(true);
    }
  }, [setLoading, isPendingUpdate, isPendingUpdateMoveGroupUp, isPendingDelete]);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(false);
    if (data.menuId && data.id) {
      updateMenuItem({
        menuId: data.menuId,
        menuItemId: data.id,
        body: {
          position: currentIndex,
        },
      });
    }
  }, [currentIndex, data.id, data.menuId, updateMenuItem]);

  const sendPayload = useCallback(
    (payload: UpdateMenuItemParams['body']) => {
      if (data.menuId && data.id) {
        updateMenuItem({
          menuId: data.menuId,
          menuItemId: data.id,
          body: payload,
        });
      }
    },
    [data.id, data.menuId, updateMenuItem],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((payload: UpdateMenuItemParams['body']) => {
      sendPayload(payload);
    }, 1000),
    [data.id, data.menuId],
  );

  useEffect(() => {
    if (nameValue !== data.name) {
      onChangeHandlerDebounced({ name: nameValue });
    }
  }, [data.name, nameValue, onChangeHandlerDebounced]);

  useEffect(() => {
    if (codeValue !== data.code) {
      setCodeValue(simplifyString(codeValue));
      onChangeHandlerDebounced({ code: simplifyString(codeValue) });
    }
  }, [data.code, codeValue, onChangeHandlerDebounced, setCodeValue]);

  // in case of error, set the value to the one from the server
  useEffect(() => {
    setCodeValue(simplifyString(data.code ?? ''));
  }, [isErrorUpdate, data.code, setCodeValue]);

  useEffect(() => {
    setNameValue(data.name ?? '');
  }, [isErrorUpdate, data.name, setNameValue]);

  const moveGroupUp = useCallback(
    (itemId: number) => {
      console.log('Moving group up', itemId);
      if (data.menuId) {
        updateMenuItemMoveGroupUp({
          menuId: data.menuId,
          menuItemId: itemId,
        });
      }
    },
    [data.menuId, updateMenuItemMoveGroupUp],
  );

  const moveThisGroupUp = useCallback(() => {
    console.log('Moving group up', data.id);
    if (data.id) moveGroupUp(data.id);
  }, [data.id, moveGroupUp]);

  const moveNextGroupDown = useCallback(() => {
    console.log('Moving group down, so moving the next group up', nextGroupItemId);
    if (nextGroupItemId) moveGroupUp(nextGroupItemId);
  }, [moveGroupUp, nextGroupItemId]);

  const codeInputMode = notUniqueCode
    ? 'error'
    : reservedCodes.includes(codeValue)
    ? 'info'
    : undefined;

  const deleteItem = useCallback(() => {
    if (data.menuId && data.id) {
      deleteMenuItem({
        menuId: data.menuId,
        menuItemId: data.id,
      });
    }
  }, [data.id, data.menuId, deleteMenuItem]);

  return (
    <Reorder.Item
      as="div"
      value={data}
      dragListener={false}
      dragControls={controls}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Item wrap gap="xs" dragging={dragging}>
        <Row gap="sm">
          <DragHandle dragging={dragging} onPointerDown={(e) => controls.start(e)}>
            <MdDragIndicator size={20} />
          </DragHandle>
          <Checkbox
            id={`menu-item-is-main-${data.id}`}
            checked={data.isMain}
            childrenRender="after"
            onCheckedChange={(x) => sendPayload({ isMain: !!x })}
            // mode="transparent"
          />
          <Button
            icon
            invisible={!data.isMain || !groupMovableUp}
            color={groupMovableUp ? 'primaryFill' : 'primaryOutline'}
            onClick={moveThisGroupUp}
            title="Move group up"
          >
            <MdArrowDropUp />
          </Button>
          <Button
            icon
            invisible={!data.isMain || !groupMovableDown}
            color={groupMovableDown ? 'primaryFill' : 'primaryOutline'}
            onClick={moveNextGroupDown}
            title="Move group down"
          >
            <MdArrowDropDown />
          </Button>
        </Row>
        <NavbarWrapper main={data.isMain}>
          {data.isMain && <NavbarHeader title={data.name ?? ''} />}
          {!data.isMain && (
            <NavbarItem href={'#'}>
              {data.name ?? 'Menu item'}
              <NavbarSquare />
            </NavbarItem>
          )}
        </NavbarWrapper>
        <Row gap="sm">
          <InputWrapper>
            <Input
              id={`menu-item-title-${data.id}`}
              value={nameValue}
              onChange={onChangeName}
              aria-labelledby="Menu item label"
              placeholder="Title"
              required
              displayHelpers={false}
            />
          </InputWrapper>
          <InputWrapper>
            {!data.isMain && (
              <Input
                id={`menu-item-code-${data.id}`}
                value={codeValue}
                onChange={onChangeCode}
                // onBlur={}
                aria-labelledby="Menu item code"
                placeholder="Code"
                required
                displayHelpers={false}
                mode={codeInputMode}
              />
            )}
          </InputWrapper>
          <AlertDialog
            dialogSize="md"
            triggerElement={
              <Button
                css={{ marginRight: '$sm' }}
                icon
                color="dangerOutline"
                title="Delete menu item"
              >
                <MdDelete />
              </Button>
            }
            title={`Delete menu item "${data.name}"`}
            description="All assigned posts will be unassigned and if this menu item is a header, all its children will be merged to group above."
            submitAction={deleteItem}
          />
        </Row>
      </Item>
    </Reorder.Item>
  );
};

export default MenuItem;
