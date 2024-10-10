import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const SaveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const PublishButton = styled(Button)`
  background-color: #2196f3;
  color: white;
`;

const StateDisplay = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

interface HeaderProps {
  onSave: () => void;
  onPublish: () => void;
  isPublished: boolean;
  currentState: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, onPublish, isPublished, currentState }) => {
  return (
    <HeaderContainer>
      <Title>Workflow Editor</Title>
      <StateDisplay>State: {currentState}</StateDisplay>
      <ButtonGroup>
        <SaveButton onClick={onSave}>Save</SaveButton>
        <PublishButton onClick={onPublish}>
          {isPublished ? 'Unpublish' : 'Publish'}
        </PublishButton>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;