import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface HeaderState {
  headerHeight: number;
}

const initialState: HeaderState = {
  headerHeight: 0,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeaderHeight: (state, action: PayloadAction<number>) => {
      state.headerHeight = action.payload;
    },
  },
});
export const { setHeaderHeight } = headerSlice.actions;
export default headerSlice.reducer;
