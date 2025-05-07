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
import { FaUndo, FaRedo } from "react-icons/fa";

const nodeTypes = {
  banana: BananaNode,
};

type GameScreenProps = {
  initialWord: string;
};

const GameScreen = ({ initialWord }: GameScreenProps) => {
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
  const [geminiApiError, setGeminiApiError] = useState<string | null>(null);
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
          hasError: node.id === activeNode && geminiApiError !== null,
          onSuggestionSelect: (word: string) => {
            if (word) {
              addNode(node.id, word);
              setGeminiApiError(null);
            }
            setActiveNode(null);
            setSuggestions([]);
            setIsGenerating(false);
          },
          onRetry: () => {
            if (node.data.label) {
              handleNodeClick(null, node);
            }
          },
        },
      }))
    );
    setEdges(initialEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    geminiApiError,
  ]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleNodeClick = async (
    event: React.MouseEvent | null,
    node: Node
  ) => {
    setActiveNode(node.id);
    try {
      setIsGenerating(true);
      const words = await generateWords(node.data.label as string);
      setSuggestions(words);
      setIsGenerating(false);
    } catch (error) {
      console.error("Failed to generate words from Gemini", error);
      setIsGenerating(false);
      setGeminiApiError(
        "単語の生成に失敗しました。後でもう一度お試しください。"
      );
    }
  };

  useEffect(() => {
    startGame(initialWord);
  }, [initialWord, startGame]);

  return (
    <div className="flex flex-col flex-grow mt-5 pb-5">
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-200 p-2 rounded-md cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={undo}
          disabled={!canUndo}
        >
          <div className="flex items-center gap-2">
            <FaUndo />
            <span>戻る</span>
          </div>
        </button>
        <button
          className="bg-gray-200 p-2 rounded-md disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={redo}
          disabled={!canRedo}
        >
          <div className="flex items-center gap-2">
            <FaRedo />
            <span>進む</span>
          </div>
        </button>
      </div>
      <div className="flex-1 border-2 border-yellow-400 rounded-md relative">
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
            setGeminiApiError(null);
          }}
          proOptions={proOptions}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GameScreen;
