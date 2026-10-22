import React, { useCallback } from 'react';
import { Button, ButtonVariants } from '../Button/Button';
import { PbTag, PbViewTag } from '../../generated/api-types/data-contracts';

type TagButtonProps<T extends PbTag | PbViewTag | string> = {
  tag: T;
  displayCount?: boolean;
  onSelect?: (tag: T) => void;
  active?: boolean;
  colorNonactive?: ButtonVariants['color'];
  colorActive?: ButtonVariants['color'];
  disabled?: boolean;
  tooltip?: string;
};

// This is a type guard function
function isPbViewTag(object: object): object is PbViewTag {
  return 'count' in object;
}

const TagButton = <T extends PbTag | PbViewTag | string>({
  tag,
  displayCount = false,
  onSelect,
  active = false,
  colorNonactive = 'primaryOutline',
  colorActive = 'primaryFill',
  disabled = false,
  tooltip,
}: TagButtonProps<T>) => {
  const onClick = useCallback(() => {
    if (onSelect) {
      onSelect(tag as T);
    }
  }, [onSelect, tag]);

  const count = typeof tag === 'string' ? undefined : isPbViewTag(tag) ? tag.count : undefined;

  return (
    <Button
      disabled={disabled}
      size="sm"
      onClick={onClick}
      color={active ? colorActive : colorNonactive}
      title={tooltip}
    >
      {typeof tag === 'string' ? tag : tag.tag}
      {displayCount && count !== undefined && ` (${count})`}
    </Button>
  );
};

export default TagButton;
