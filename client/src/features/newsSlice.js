import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/";

const initialState = {
  news: [],
  oneNews: null,
  loading: false,
  error: null,
  category: [],
  newsByCategory: [],
  autocompleteNews: [],
  pages: [],
};

export const getNews = createAsyncThunk("news/fetch", async (id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4040/news/pages/${!id ? 1 : id}`);
    const news = await res.json();
    console.log(news);
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
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNewBySearch = createAsyncThunk(
  "news/seacrhid",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4040/news/search/${id}`);
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

export const autocompleteNews = createAsyncThunk(
  "news/autocompleteid",
  async (searchValue, thunkAPI) => {
    console.log(searchValue);
    try {
      const res = await fetch(
        `http://localhost:4040/news/autocomplete/${searchValue}`
      );
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

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.pages = action.payload.pageNumbers;
        state.news = action.payload.currentNews;
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
      .addCase(getNewBySearch.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getNewBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.newsByCategory = action.payload;
      })
      .addCase(getNewBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(autocompleteNews.pending, (state, action) => {
        state.error = false;
      })
      .addCase(autocompleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.autocompleteNews = action.payload;
      })
      .addCase(autocompleteNews.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default newsSlice.reducer;
