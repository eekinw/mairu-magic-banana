import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/redux/slices/gameSlice"

export const store = configureStore({
    reducer: {
        game: gameReducer
    }
})

export type RootState = ReturnType<typeof store.getState>