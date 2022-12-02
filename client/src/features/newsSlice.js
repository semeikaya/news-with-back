import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit/";

const initialState = {
  news: [],
  oneNews: null,
  loading: false,
  error: null,
  category: [],
  newsByCategory: [],
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

export const getNews = createAsyncThunk("news/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4040/news");
    const news = await res.json();
    if (news.error) {
      return thunkAPI.rejectWithValue(news.error);
    } else {
      return news;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getNewsById = createAsyncThunk(
  "news/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4040/news/${id}`);
      const news = await res.json();
      if (news.error) {
        return thunkAPI.rejectWithValue(news.error);
      } else {
        return news;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "news/category",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4040/categories`);

      const news = await res.json();

      if (news.error) {
        return thunkAPI.rejectWithValue(news.error);
      }
      return news;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNewByCategory = createAsyncThunk(
  "news/categoryid",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4040/news/category/${id}`);
      const news = await res.json();
      if (news.error) {
        return thunkAPI.rejectWithValue(news.error);
      }
      return news;
    } catch (error) {}
  }
);

export const newsSlice = createSlice({
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
      .addCase(getNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.oneNews = action.payload;
      })
      .addCase(getNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getNewByCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNewByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.newsByCategory = action.payload;
      })
      .addCase(getNewByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.comments = action.payload;
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

export default newsSlice.reducer;
