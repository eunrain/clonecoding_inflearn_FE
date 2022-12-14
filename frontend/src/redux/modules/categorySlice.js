import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  message: "",
};

const url = process.env.REACT_APP_BACK_BASE_URL;

//카테고리 별 조회
export const __getCategory = createAsyncThunk(
  "getCategory",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.get(`${url}/posts/${payload}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      try {
        const { data } = await axios.get(`${url}/posts/${payload}`);
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

//stack get
export const __getStack = createAsyncThunk(
  "getStack",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `${url}/posts/${payload.category}/${payload.stack}`,
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducer: {},
  extraReducers: {
    //getCategory
    [__getCategory.fulfilled]: (state, action) => {
      state.data = action.payload.postdata;
    },
    [__getCategory.rejected]: (state, action) => {
      alert(action.payload);
    },
    //getStack
    [__getStack.fulfilled]: (state, action) => {
      state.data = action.payload.data;
    },
    [__getStack.rejected]: (state, action) => {
      state.isLoading = true;
      alert(action.payload);
    },
  },
});

export default categorySlice.reducer;
