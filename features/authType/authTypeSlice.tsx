import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface AuthTypeState {
  value: string;
}

const initialState: AuthTypeState = {
  value: "Login",
};

export const authTypeSlice = createSlice({
  name: "authType",
  initialState,
  reducers: {
    setAuthType: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { setAuthType } = authTypeSlice.actions;

export const selectAuthType = (state: RootState) => state.authType.value;

export default authTypeSlice.reducer;
