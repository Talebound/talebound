import React from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import { TitleH2 } from '../../../components/Typography/Title';
import { styled } from '../../../styles/stitches.config';

const BigCol = styled(Col, {
  flexGrow: 1,
  flexBasis: '30%',
  backgroundColor: '$primary200',
  minHeight: '150px',
  borderRadius: '$lg',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$primary300',
    [`& ${TitleH2}`]: {
      transition: 'all 0.2s ease-in-out',
      color: '$black',
    },
  },
});

interface AssignPostModalContentChoiceProps {
  createNewPostCallback: () => void;
  chooseExistingPostCallback: () => void;
}

const AssignPostModalContentChoice: React.FC<AssignPostModalContentChoiceProps> = ({
  createNewPostCallback,
  chooseExistingPostCallback,
}) => {
  return (
    <Row gap="md" padding="lg">
      <BigCol gap="md" alignItems="center" justifyContent="center" onClick={createNewPostCallback}>
        <TitleH2 underline={false}>Create new post</TitleH2>
      </BigCol>
      <BigCol
        gap="md"
        alignItems="center"
        justifyContent="center"
        onClick={chooseExistingPostCallback}
      >
        <TitleH2 underline={false}>Choose existing post</TitleH2>
      </BigCol>
    </Row>
  );
};

export default AssignPostModalContentChoice;
