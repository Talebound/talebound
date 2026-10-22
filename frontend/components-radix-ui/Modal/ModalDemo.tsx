import React from 'react';
import { MdClose } from 'react-icons/md';
import { styled } from '../../styles/stitches.config';
import { ModalRoot } from './ModalRoot';
import { ModalTrigger } from './ModalTrigger';
import { ModalOverlay } from './ModalOverlay';
import { ModalContent } from './ModalContent';
import { ModalTitle } from './ModalTitle';
import { ModalDescription } from './ModalDescription';
import { ModalPortal } from './ModalPortal';
import { ModalClose } from './ModalClose';
import SelectDemo from '../Select/SelectDemo';

const ModalDemo: React.FC = () => {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button>Edit profile</Button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent>
          <ModalTitle>Edit profile</ModalTitle>
          <SelectDemo />
          <ModalDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </ModalDescription>
          <Fieldset>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </Fieldset>
          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <ModalClose asChild>
              <Button variant="green">Save changes</Button>
            </ModalClose>
          </Flex>
          <ModalClose asChild>
            <IconButton aria-label="Close">
              <MdClose />
            </IconButton>
          </ModalClose>
        </ModalContent>
      </ModalPortal>
    </ModalRoot>
  );
};

const Flex = styled('div', { display: 'flex' });

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 600,
  height: 35,

  variants: {
    variant: {
      green: {
        backgroundColor: '$primary400',
        color: '$primary800',
        '&:hover': { backgroundColor: '$primary500' },
        '&:focus': { boxShadow: `0 0 2px $primary800` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$secondary700',
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: '$secondary200' },
  '&:focus': { boxShadow: '$sm' },
});

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

const Label = styled('label', {
  fontSize: 15,
  color: '$secondary',
  width: 90,
  textAlign: 'right',
});

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: '$secondary',
  boxShadow: `0 0 0 1px $primary500`,
  height: 35,

  '&:focus': { boxShadow: '0 0 0 2px $primary600' },
});

export default ModalDemo;
