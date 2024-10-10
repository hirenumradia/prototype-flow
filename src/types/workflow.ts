import { Node, Edge } from 'reactflow';

export interface WorkflowNode extends Node {
  type: 'startNode' | 'actionNode' | 'conditionNode' | 'endNode';
  data: {
    label: string;
    [key: string]: any;
  };
}

export interface WorkflowEdge extends Edge {}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'draft' | 'live';
}