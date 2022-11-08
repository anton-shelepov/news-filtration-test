import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getNewsByPage from "api/news/getNewsByPage"
import { INewsCardModel } from "models/newsCardModel"

interface INewsState {
   data: INewsCardModel[]
   error: string | null
   loading: "idle" | "pending" | "success" | "failure"
}

const initialState: INewsState = {
   data: [],
   error: null,
   loading: "idle",
}

export const fetchNews = createAsyncThunk<INewsCardModel[], number>("news/fetch", async (newsPage) => {
   const { data } = await getNewsByPage(newsPage)

   return data.news
})

const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchNews.pending, (state) => {
         state.loading = "pending"
         state.error = null
      })

      builder.addCase(fetchNews.fulfilled, (state, { payload }) => {
         state.loading = "success"
         state.error = null
         state.data = payload
      })
   },
})

export default newsSlice
