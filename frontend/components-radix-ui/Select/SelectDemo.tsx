import React from 'react';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import { SelectViewport } from './SelectViewport';
import { SelectIcon } from './SelectIcon';
import SelectItem from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectScrollDownButton } from './SelectScrollDownButton';
import { SelectSeparator } from './SelectSeparator';
import { SelectScrollUpButton } from './SelectScrollUpButton';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { SelectRoot } from './SelectRoot';
import { SelectValue } from './SelectValue';
import { SelectPortal } from './SelectPortal';
import { SelectGroup } from './SelectGroup';

export const SelectDemo = () => (
  <SelectRoot>
    <SelectTrigger aria-label="Food">
      <SelectValue placeholder="Select a fruit…" />
      <SelectIcon>
        <BsChevronDown />
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
      <SelectContent>
        <SelectScrollUpButton>
          <BsChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="aubergine">Aubergine</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="carrot" disabled>
              Carrot
            </SelectItem>
            <SelectItem value="courgette">Courgette as the longest option!</SelectItem>
            <SelectItem value="leek">Leek</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>Meat</SelectLabel>
            <SelectItem value="beef">Beef</SelectItem>
            <SelectItem value="chicken">Chicken</SelectItem>
            <SelectItem value="lamb">Lamb</SelectItem>
            <SelectItem value="pork">Pork</SelectItem>
          </SelectGroup>
        </SelectViewport>
        <SelectScrollDownButton>
          <BsChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
);

export default SelectDemo;
