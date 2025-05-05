import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as gameActions } from "@/redux/slices/gameSlice";
import { RootState } from "@/redux/store";

export default function useGame() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    
    return {
        nodes: game.nodes,
        edges: game.edges,
        activeNode: game.activeNode,
        suggestions: game.suggestions,
        canUndo: game.historyIndex > 0,
        canRedo: game.historyIndex < game.history.length - 1,

        // all actions
            startGame: useCallback((word: string) => {
            dispatch(gameActions.startGame(word));
        }, [dispatch]),

        deleteNode: useCallback((nodeId: string) => {
            dispatch(gameActions.deleteNode(nodeId));
        }, [dispatch]),

        addNode: useCallback((parentId: string, word: string) => {
            dispatch(gameActions.addNode({ parentId, word }));
        }, [dispatch]),

        setActiveNode: useCallback((nodeId: string | null) => {
            dispatch(gameActions.setActiveNode(nodeId));
        }, [dispatch]),

        setSuggestions: useCallback((words: string[]) => {
            dispatch(gameActions.setSuggestions(words));
        }, [dispatch]),

        undo: useCallback(() => {
            dispatch(gameActions.undoNode());
        }, [dispatch]),

        redo: useCallback(() => {
            dispatch(gameActions.redoNode());
        }, [dispatch]),

        updateNodePosition: useCallback((id: string, position: { x: number; y: number }) => {
            dispatch(gameActions.updateNodePosition({ id, position }));
        }, [dispatch])
    }
}