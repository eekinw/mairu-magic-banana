import { Node, Edge } from "@xyflow/react";

export interface IGame {
    nodes: Node[];
    edges: Edge[];
    activeNode: string | null;
    suggestions: string[];
    history: Array<{ nodes: Node[]; edges: Edge[] }>
    historyIndex: number;
}