import styled from 'styled-components';
import { WorkflowNode } from '@/types/workflow';

const LibraryContainer = styled.div`
  width: 200px;
  height: 100%;
  padding: 15px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
  overflow-y: auto;
`;

const NodeItem = styled.div<{ $nodeType: string }>`
  width: 150px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: move;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  
  ${({ $nodeType }) => {
    switch ($nodeType) {
      case 'startNode':
        return 'background-color: #d4edda; border: 1px solid #c3e6cb;';
      case 'actionNode':
        return 'background-color: #cce5ff; border: 1px solid #b8daff;';
      case 'conditionNode':
        return 'background-color: #fff3cd; border: 1px solid #ffeeba;';
      case 'endNode':
        return 'background-color: #f8d7da; border: 1px solid #f5c6cb;';
      default:
        return '';
    }
  }}
`;

const NodeLibrary = () => {
  const onDragStart = (event: React.DragEvent, nodeType: WorkflowNode['type']) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <LibraryContainer>
      <h3>Node Library</h3>
      <NodeItem
        $nodeType="startNode"
        onDragStart={(event) => onDragStart(event, 'startNode')}
        draggable
      >
        Start
      </NodeItem>
      <NodeItem
        $nodeType="actionNode"
        onDragStart={(event) => onDragStart(event, 'actionNode')}
        draggable
      >
        Action
      </NodeItem>
      <NodeItem
        $nodeType="conditionNode"
        onDragStart={(event) => onDragStart(event, 'conditionNode')}
        draggable
      >
        Condition
      </NodeItem>
      <NodeItem
        $nodeType="endNode"
        onDragStart={(event) => onDragStart(event, 'endNode')}
        draggable
      >
        End
      </NodeItem>
    </LibraryContainer>
  );
};

export default NodeLibrary;