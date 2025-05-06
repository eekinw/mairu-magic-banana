import { useEffect, useCallback, useState } from "react";
import {
  ReactFlow,
  Node,
  useNodesState,
  useEdgesState,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import BananaNode from "./BananaNode";
import { generateWords } from "@/actions/generateWords";
import useGame from "@/hooks/useGame";

const nodeTypes = {
  banana: BananaNode,
};

type GameScreenProps = {
  initialWord: string;
  resetGame?: () => void;
};

const GameScreen = ({ initialWord, resetGame }: GameScreenProps) => {
  const {
    nodes: initialNodes,
    edges: initialEdges,
    activeNode,
    suggestions,
    canUndo,
    canRedo,
    startGame,
    deleteNode,
    addNode,
    setActiveNode,
    setSuggestions,
    undo,
    redo,
  } = useGame();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isGenerating, setIsGenerating] = useState(false);
  // to hide 'ReactFlow' label on the view
  const proOptions = { hideAttribution: true };

  useEffect(() => {
    setNodes(
      initialNodes.map((node) => ({
        ...node,
        position:
          nodes.find((n) => n.id === node.id)?.position || node.position,
        dragHandle: ".drag-handle",
        data: {
          ...node.data,
          onDelete: () => deleteNode(node.id),
          suggestions: node.id === activeNode ? suggestions : [],
          isActive: node.id === activeNode,
          isGenerating: node.id === activeNode && isGenerating,
          onSuggestionSelect: (word: string) => {
            if (word) {
              addNode(node.id, word);
            }
            setActiveNode(null);
            setSuggestions([]);
            setIsGenerating(false);
          },
        },
      }))
    );
    setEdges(initialEdges);
  }, [
    initialNodes,
    initialEdges,
    activeNode,
    suggestions,
    deleteNode,
    addNode,
    setActiveNode,
    setSuggestions,
    isGenerating,
  ]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleNodeClick = async (event: React.MouseEvent, node: Node) => {
    setActiveNode(node.id);
    try {
      setIsGenerating(true);
      const words = await generateWords(node.data.label as string);
      setSuggestions(words);
      setIsGenerating(false);
    } catch (error) {
      console.error("Failed to generate words from Gemini", error);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    startGame(initialWord);
  }, [initialWord, startGame]);

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-200 p-2 rounded-md cursor-pointer disabled:opacity-50"
          onClick={undo}
          disabled={!canUndo}
        >
          戻る
        </button>
        <button
          className="bg-gray-200 p-2 rounded-md disabled:opacity-50"
          onClick={redo}
          disabled={!canRedo}
        >
          進む
        </button>
      </div>
      <div className="flex-1 border rounded-md relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          onDragOver={onDragOver}
          onPaneClick={() => {
            setActiveNode(null);
            setSuggestions([]);
          }}
          proOptions={proOptions}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
      {resetGame && (
        <button
          onClick={resetGame}
          className="mt-4 text-blue-600 underline self-center"
        >
          最初からやり直す
        </button>
      )}
    </div>
  );
};

export default GameScreen;
