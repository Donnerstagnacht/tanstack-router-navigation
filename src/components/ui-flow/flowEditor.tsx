import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '../ui/button';

// Define missing types since they're not exported
interface Connection {
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
}

interface Node {
  id: string;
  position: { x: number; y: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  type?: string;
  style?: React.CSSProperties;
  parentId?: string;
  extent?: 'parent';
}

interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  type?: string;
}

// No custom node components - using basic nodes instead

// Initial nodes representing a city council workflow
const initialNodes: Node[] = [
  {
    id: '1',
    data: {
      label: 'Proposal Submission',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Initial Review',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'Committee Assignment',
    },
    style: { background: '#ffe0b2', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 200 },
  },
  {
    id: '4',
    data: {
      label: 'Committee Review',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 100, y: 300 },
  },
  {
    id: '5',
    data: {
      label: 'Budget Analysis',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 400, y: 300 },
  },
  {
    id: '6',
    data: {
      label: 'Committee Vote',
    },
    style: { background: '#ffe0b2', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 400 },
  },
  {
    id: '7',
    data: {
      label: 'Council Agenda',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 500 },
  },
  {
    id: '8',
    data: {
      label: 'Public Hearing',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 600 },
  },
  {
    id: '9',
    data: {
      label: 'Council Vote',
    },
    style: { background: '#ffe0b2', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 700 },
  },
  {
    id: '10',
    data: {
      label: 'Mayor Signature',
    },
    style: { background: '#c8e6c9', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 800 },
  },
  {
    id: '11',
    data: {
      label: 'Implementation',
    },
    style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
    position: { x: 250, y: 900 },
  },
];

// Initial edges connecting the nodes
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', label: 'Policy Review' },
  { id: 'e3-5', source: '3', target: '5', label: 'Budget Impact' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7', label: 'Approved by Committee' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e9-10', source: '9', target: '10', label: 'Passed' },
  { id: 'e10-11', source: '10', target: '11', label: 'Signed' },
];

export function FlowEditor() {
  // Initialize nodes and edges with our predefined city council workflow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges(eds =>
        addEdge({ ...params, animated: true, type: ConnectionLineType.SmoothStep }, eds)
      ),
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: Node) => {
      if (multiSelectMode) {
        // In multi-select mode, toggle the node selection
        setSelectedNodes(prev => {
          const isSelected = prev.some(n => n.id === node.id);
          if (isSelected) {
            return prev.filter(n => n.id !== node.id);
          } else {
            return [...prev, node];
          }
        });
      } else {
        // In single-select mode, just select this node
        setSelectedNodes([node]);
      }
    },
    [multiSelectMode]
  );

  // Toggle multi-select mode
  const toggleMultiSelectMode = useCallback(() => {
    setMultiSelectMode(prev => !prev);
    if (!multiSelectMode) {
      // Clear selection when entering multi-select mode
      setSelectedNodes([]);
    }
  }, [multiSelectMode]);

  // Create a group from selected nodes
  const createGroup = useCallback(() => {
    if (selectedNodes.length < 2) return;

    // Find boundaries of selected nodes
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    selectedNodes.forEach(node => {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + ((node.style?.width as number) || 180));
      maxY = Math.max(maxY, node.position.y + 50); // Assuming height of about 50px
    });

    // Add padding
    const padding = 30;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;

    // Create group node
    const groupId = `group-${Date.now()}`;
    const groupNode: Node = {
      id: groupId,
      type: 'group',
      position: { x: minX, y: minY },
      style: {
        width: maxX - minX,
        height: maxY - minY,
        backgroundColor: 'rgba(240, 240, 240, 0.7)',
        border: '1px dashed #aaa',
        borderRadius: 8,
        padding: 10,
        zIndex: -1,
      },
      data: { label: `Group ${nodes.length + 1}` },
    };

    // Update child nodes to reference the group
    const updatedNodes = nodes.map(node => {
      if (selectedNodes.some(n => n.id === node.id)) {
        return {
          ...node,
          parentId: groupId,
          extent: 'parent' as const,
          position: {
            x: node.position.x - minX,
            y: node.position.y - minY,
          },
          style: {
            ...node.style,
            backgroundColor: node.style?.background || '#bbdefb',
          },
        };
      }
      return node;
    });

    // Add the group node and update child nodes
    setNodes([groupNode, ...updatedNodes]);
    setSelectedNodes([]);
    setMultiSelectMode(false);
  }, [nodes, selectedNodes, setNodes]);

  // Add a new proposal node
  const addProposalNode = useCallback(() => {
    const newId = (nodes.length + 1).toString();
    const newNode = {
      id: newId,
      data: { label: `New Proposal ${newId}` },
      style: { background: '#bbdefb', padding: 10, borderRadius: 5, width: 180 },
      position: { x: 100, y: 100 },
    };
    setNodes(nds => nds.concat(newNode));
  }, [nodes, setNodes]);

  // Reset workflow to initial state
  const resetWorkflow = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNodes([]);
  }, [setNodes, setEdges]);

  return (
    <div className="h-screen w-full">
      {' '}
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          // Highlight selected nodes
          style: {
            ...node.style,
            boxShadow: selectedNodes.some(n => n.id === node.id) ? '0 0 0 2px #ff0072' : undefined,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        {/* Control panels */}
        <Panel position="top-left" className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-bold">City Council Workflow</h2>
          <p className="mb-3 text-sm text-gray-600">
            Interactive diagram showing the proposal lifecycle in city government
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={addProposalNode}>
              Add Proposal
            </Button>
            <Button
              size="sm"
              variant={multiSelectMode ? 'default' : 'outline'}
              onClick={toggleMultiSelectMode}
            >
              {multiSelectMode ? 'Multi-Select: ON' : 'Multi-Select: OFF'}
            </Button>
            {selectedNodes.length >= 2 && (
              <Button size="sm" variant="secondary" onClick={createGroup}>
                Group Selected ({selectedNodes.length})
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={resetWorkflow}>
              Reset
            </Button>
          </div>
        </Panel>

        {/* Information panel for selected node */}
        {selectedNodes.length === 1 && (
          <Panel position="top-right" className="w-80 rounded bg-white p-4 shadow">
            <h3 className="text-md font-bold">{selectedNodes[0].data.label}</h3>
          </Panel>
        )}

        <Controls />
        <MiniMap zoomable pannable />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}
