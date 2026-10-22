import React, { useCallback } from 'react';
import { PbTag, PbViewTag } from '../../generated/api-types/data-contracts';
import TagButton from '../TagButton/TagButton';
import { Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';

interface TagButtonBoxProps {
  tags: PbViewTag[];
  onSelect?: (tag: PbViewTag) => void;
  selectedTags: PbViewTag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<PbViewTag[]>>;
  displayCount?: boolean;
  showZeroCountToggle?: boolean;
}

const TagButtonBox: React.FC<TagButtonBoxProps> = ({
  tags,
  onSelect,
  selectedTags,
  setSelectedTags,
  displayCount = false,
  showZeroCountToggle = false,
}) => {
  const [showZero, setShowZero] = React.useState<boolean>(!showZeroCountToggle);

  const onTagSelect = useCallback(
    (tag: PbTag) => {
      setSelectedTags((p) => {
        const isSelected = p.some((t) => t.id === tag.id);
        if (isSelected) {
          return p.filter((t) => t.id !== tag.id);
        }
        return [...p, tag];
      });
      if (onSelect) onSelect(tag);
    },
    [onSelect, setSelectedTags],
  );

  const toggleShowZero = useCallback(() => setShowZero((p) => !p), []);

  return (
    <Row wrap gap="sm">
      {tags.map((t) => {
        if (!t.count && !showZero && showZeroCountToggle) return null;

        return (
          <TagButton
            tag={t}
            key={t.id}
            onSelect={onTagSelect}
            active={selectedTags.includes(t)}
            displayCount={displayCount}
          />
        );
      })}
      {displayCount && showZeroCountToggle && (
        <>
          {!showZero && (
            <Text i onClick={toggleShowZero}>
              (Show tags with 0 assignments)
            </Text>
          )}
          {showZero && (
            <Text i onClick={toggleShowZero}>
              (Hide tags with 0 assignments)
            </Text>
          )}
        </>
      )}
    </Row>
  );
};

export default TagButtonBox;
