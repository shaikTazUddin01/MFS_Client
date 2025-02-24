import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authInfo: (state, action) => {
      const { data, token } = action.payload;
      // console.log("--->", data);
      (state.user = data), (state.token = token);
    },
    logout:(state)=>{
      state.user=null;
      state.token=null;

    },
  },
});

// Action creators are generated for each case reducer function
export const { authInfo ,logout} = authSlice.actions;

export default authSlice.reducer;