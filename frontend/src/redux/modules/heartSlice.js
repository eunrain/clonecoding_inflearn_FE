import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  message: "",
};

const url = process.env.REACT_APP_BACK_BASE_URL;

//좋아요 post
export const __postHeart = createAsyncThunk(
  "postheart",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `${url}/feature/likes/${payload}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

//하트 get
export const __getHeart = createAsyncThunk(
  "heart",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(`${url}/users/likes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducer: {},
  extraReducers: {
    [__postHeart.fulfilled]: (state, action) => {
      state.message = action.payload;
    },
    [__postHeart.rejected]: (state, action) => {
      state.isLoading = true;
      alert(action.payload);
    },
    [__getHeart.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getHeart.rejected]: (state, action) => {
      state.isLoading = true;
      alert(action.payload);
    },
  },
});

export default heartSlice.reducer;
