import { useState } from 'react';
import styled from 'styled-components';
import { WorkflowNode } from '@/types/workflow';

const PanelContainer = styled.div`
  width: 300px;
  padding: 15px;
  background-color: #f0f0f0;
  border-left: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0051bb;
  }
`;

interface NodeConfigPanelProps {
  node: WorkflowNode;
  setNode: React.Dispatch<React.SetStateAction<WorkflowNode[]>>;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ node, setNode }) => {
  const [label, setLabel] = useState(node.data.label);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNode((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return { ...n, data: { ...n.data, label } };
        }
        return n;
      })
    );
  };

  return (
    <PanelContainer>
      <h3>Configure Node</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Node Label"
        />
        <Button type="submit">Update Node</Button>
      </Form>
    </PanelContainer>
  );
};

export default NodeConfigPanel;