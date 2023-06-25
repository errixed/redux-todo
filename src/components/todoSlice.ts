import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Todo {
  id: string;
  title: string;
  description: string;
}

const initialState: Array<Todo> = []

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    removeTodo: (state, {payload}) => {
      return state.filter(({ id }) => id !== payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const todoSelector = (state: RootState) => state.todoReducer;
export default todoSlice.reducer;