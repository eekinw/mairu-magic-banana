import type { NodeProps } from "@xyflow/react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lotties/loading-animation.json";

type CustomNodeData = {
  label: string;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  suggestions?: string[];
  onSuggestionSelect?: (word: string) => void;
  isActive?: boolean;
  isGenerating?: boolean;
};

function BananaNode({ data, selected, dragging }: NodeProps) {
  const nodeData = data as CustomNodeData;

  // ノード削除際押すのを防ぐ
  const handleNodeDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    nodeData.onDelete?.(e);
  };

  return (
    <>
      <NodeToolbar
        isVisible={
          nodeData.isActive &&
          (nodeData.isGenerating ||
            (nodeData.suggestions && nodeData.suggestions.length > 0))
        }
        position={Position.Right}
        offset={5}
        className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden relative"
      >
        <button
          className="absolute right-0 top-0 opacity-70 hover:opacity-100 transition-opacity text-xs bg-red-200 text-red-700 rounded-full w-5 h-5 flex items-center justify-center z-50"
          onClick={(e) => {
            e.stopPropagation();
            nodeData.onSuggestionSelect?.("");
          }}
          type="button"
        >
          ×
        </button>
        <div className="flex flex-col w-48">
          {nodeData.isGenerating ? (
            <div className="flex justify-center items-center p-4">
              <Lottie
                animationData={loadingAnimation}
                style={{ width: 50, height: 50 }}
              />
            </div>
          ) : (
            nodeData.suggestions?.map((word) => (
              <button
                key={word}
                className="px-4 py-2 text-left hover:bg-yellow-50 hover:text-yellow-900"
                onClick={() => nodeData.onSuggestionSelect?.(word)}
              >
                {word}
              </button>
            ))
          )}
        </div>
      </NodeToolbar>
      <div
        className={`relative group bg-yellow-100 border-2 border-yellow-400 rounded-lg px-4 py-2 shadow-md
        ${selected ? "ring-2 ring-yellow-600" : ""}
        ${dragging ? "opacity-80" : ""}
      `}
      >
        <Handle type="target" position={Position.Left} />
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold text-yellow-800 drag-handle">
            {nodeData.label}
          </div>
        </div>
        <Handle type="source" position={Position.Right} />
        {nodeData.onDelete && (
          <button
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-red-200 text-red-700 rounded-full w-4 h-4 flex items-center justify-center z-10"
            onClick={handleNodeDelete}
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </>
  );
}

export default BananaNode;
