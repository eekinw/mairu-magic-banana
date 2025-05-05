import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { getOutgoers } from '@xyflow/react';

const initialState: IGame = {
    nodes: [],
    edges: [],
    activeNode: null,
    suggestions: [],
    history: [],
    historyIndex: -1
} 

const saveToHistory = (state: IGame) => {
    state.history = [
        ...state.history.slice(0, state.historyIndex + 1),
        { nodes: [...state.nodes], edges: [...state.edges] }
    ];
    state.historyIndex += 1;
};


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<string>) => {
            const node = {
                id: uuidv4(),
                type: "banana" as const,
                data: { label: action.payload },
                position: { x: 100, y: 150 }
            };
            state.nodes = [node];
            state.edges = [];
            state.history = [{ nodes: [node], edges: [] }];
            state.historyIndex = 0;
        },
        deleteNode: (state, action: PayloadAction<string>) => {
    const nodeToDelete = state.nodes.find(n => n.id === action.payload);
    if (!nodeToDelete) return;

    // Get all descendants recursively
    const descendants = getOutgoers(nodeToDelete, state.nodes, state.edges);
    const allNodesToDelete = [nodeToDelete.id, ...descendants.map(n => n.id)];

    state.nodes = state.nodes.filter(n => !allNodesToDelete.includes(n.id));
    state.edges = state.edges.filter(
        e => !allNodesToDelete.includes(e.source) && !allNodesToDelete.includes(e.target)
    );
    
    saveToHistory(state);
},
        addNode: (state, action: PayloadAction<{ parentId: string; word: string }>) => {
            const parentNode = state.nodes.find(n => n.id === action.payload.parentId);
            if (!parentNode) return;

            const newNode = {
                id: uuidv4(),
                type: "banana" as const,
                data: { label: action.payload.word },
                position: {
                    x: parentNode.position.x,
                    y: parentNode.position.y + 100
                }
            };

            const newEdge = {
                id: uuidv4(),
                source: parentNode.id,
                target: newNode.id
            };

            state.nodes.push(newNode);
            state.edges.push(newEdge);
            saveToHistory(state);
        },
        setActiveNode: (state, action: PayloadAction<string | null>) => {
            state.activeNode = action.payload;
        },
        setSuggestions: (state, action: PayloadAction<string[]>) => {
            state.suggestions = action.payload;
        },
        undoNode: (state) => {
            if (state.historyIndex > 0) {
                state.historyIndex -= 1;
                const prev = state.history[state.historyIndex];
                state.nodes = [...prev.nodes];
                state.edges = [...prev.edges];
            }
        },
        redoNode: (state) => {
            if (state.historyIndex < state.history.length - 1) {
                state.historyIndex += 1;
                const next = state.history[state.historyIndex];
                state.nodes = [...next.nodes];
                state.edges = [...next.edges];
            }
        },
        updateNodePosition: (
            state,
            action: PayloadAction<{ id: string; position: { x: number; y: number } }>
        ) => {
            const node = state.nodes.find((n) => n.id === action.payload.id);
            if (node) {
                node.position = action.payload.position;
                saveToHistory(state);
            }
        },
    }
});


export const { ...actions } = gameSlice.actions;

export default gameSlice.reducer;