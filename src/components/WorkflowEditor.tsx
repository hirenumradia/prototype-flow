import { useState, useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge,
  ReactFlowInstance,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { useMachine } from '@xstate/react';
import NodeLibrary from './NodeLibrary';
import NodeConfigPanel from './NodeConfigPanel';
import { nodeTypes } from './nodes';
import { WorkflowNode, WorkflowEdge } from '@/types/workflow';
import { workflowMachine } from '@/machines/workflowMachine';
import Header from './Header';

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FlowContainer = styled.div`
  flex-grow: 1;
  height: calc(100% - 60px); // Adjust this value based on your header height
  display: flex;
`;

const WorkflowEditor: React.FC<{ workflowId: string }> = ({ workflowId }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [state, send] = useMachine(workflowMachine);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const getNodeLabel = (type: string): string => {
    switch (type) {
      case 'startNode':
        return 'Start';
      case 'actionNode':
        return 'Action';
      case 'conditionNode':
        return 'Condition';
      case 'endNode':
        return 'End';
      default:
        return type;
    }
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: WorkflowNode = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: { label: getNodeLabel(type) },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const edgeOptions = {
    animated: state.matches('live'),
    style: {
      stroke: state.matches('live') ? '#10b981' : '#9ca3af',
      strokeWidth: 2,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: state.matches('live') ? '#10b981' : '#9ca3af',
    },
  };

  const handleSave = () => {
    if (state.matches('draft')) {
      send({ type: 'SAVE'});
      console.log('Saving workflow...');
      // Implement save logic here
    }
  };

  const handlePublish = () => {
    if (state.matches('draft')) {
      send({type: 'PUBLISH'});
    } else if (state.matches('live')) {
      send({type: 'UNPUBLISH'});
    }
  };

  return (
    <EditorContainer>
      <Header 
        onSave={handleSave} 
        onPublish={handlePublish} 
        isPublished={state.matches('live')}
        currentState={state.value as string}
      />
      <FlowContainer>
        <NodeLibrary />
        <div ref={reactFlowWrapper} style={{ flexGrow: 1, height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={edgeOptions}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        {selectedNode && (
          <NodeConfigPanel node={selectedNode} setNode={setNodes} />
        )}
      </FlowContainer>
    </EditorContainer>
  );
};

export default WorkflowEditor;