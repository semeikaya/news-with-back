import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/";

const initialState = {
  news: [],
  oneNews: null,
  loading: false,
  error: null,
  category: [],
  newsByCategory: [],
};

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
      });
  },
});

export default newsSlice.reducer;
