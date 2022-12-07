import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit/";

const initialState = {
  loading: false,
  error: null,
  comments: [],
  modal: false,
};

export const modalWindow = createAction("modal");
export const exitModalWindow = createAction("exitmodal");

export const addComment = createAsyncThunk(
  "news/comments",
  async ({ input, id }, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch("http://localhost:4040/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.authSlice.token}`,
        },
        body: JSON.stringify({ text: input, newsID: id }),
      });
      const comment = await res.json();
      if (comment.error) {
        return thunkAPI.rejectWithValue(comment.error);
      } else {
        return comment;
      }
    } catch (error) {}
  }
);

export const removeComment = createAsyncThunk(
  "users/removecomment",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4040/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.authSlice.token}`,
        },
      });
      const comment = await res.json();
      if (comment.error) {
        return thunkAPI.rejectWithValue(comment.error);
      } else {
        return comment;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getComment = createAsyncThunk(
  "news/getcomment",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4040/comments/${id}`);

      const comments = await res.json();
      if (comments.error) {
        return thunkAPI.rejectWithValue(comments.error);
      } else {
        return comments;
      }
    } catch (error) {}
  }
);

export const commentsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(exitModalWindow, (state, action) => {
        state.modal = false;
      })
      .addCase(modalWindow, (state, action) => {
        state.modal = action.payload;
      })
      .addCase(addComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.reverse();
      })
      .addCase(getComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((item) => {
          return item._id !== action.payload;
        });
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
