import React from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

const NodeWrapper = styled.div<{ $nodeType: string }>`
  padding: 10px;
  border-radius: 5px;
  font-family: sans-serif;
  color: #222;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${({ $nodeType }) => {
    switch ($nodeType) {
      case 'startNode':
        return 'background-color: #d4edda; border-color: #c3e6cb;';
      case 'actionNode':
        return 'background-color: #cce5ff; border-color: #b8daff;';
      case 'conditionNode':
        return 'background-color: #fff3cd; border-color: #ffeeba;';
      case 'endNode':
        return 'background-color: #f8d7da; border-color: #f5c6cb;';
      default:
        return '';
    }
  }}
`;

const Label = styled.div`
  font-weight: bold;
`;

interface NodeProps {
  data: { label: string };
}

export const StartNode: React.FC<NodeProps> = ({ data }) => (
  <NodeWrapper $nodeType="startNode">
    <Label>{data.label}</Label>
    <Handle type="source" position={Position.Right} />
  </NodeWrapper>
);

export const ActionNode: React.FC<NodeProps> = ({ data }) => (
  <NodeWrapper $nodeType="actionNode">
    <Handle type="target" position={Position.Left} />
    <Label>{data.label}</Label>
    <Handle type="source" position={Position.Right} />
  </NodeWrapper>
);

export const ConditionNode: React.FC<NodeProps> = ({ data }) => (
  <NodeWrapper $nodeType="conditionNode">
    <Handle type="target" position={Position.Left} />
    <Label>{data.label}</Label>
    <Handle type="source" position={Position.Right} id="true" />
    <Handle type="source" position={Position.Bottom} id="false" />
  </NodeWrapper>
);

export const EndNode: React.FC<NodeProps> = ({ data }) => (
  <NodeWrapper $nodeType="endNode">
    <Handle type="target" position={Position.Left} />
    <Label>{data.label}</Label>
  </NodeWrapper>
);

export const nodeTypes = {
  startNode: StartNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
  endNode: EndNode,
};