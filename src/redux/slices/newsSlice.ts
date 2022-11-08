import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getNewsByPage from "api/news/getNewsByPage"
import { INewsCardModel } from "models/newsCardModel"
import { NewsStyle } from "utils/scripts/selectNewsCardStyle"

export type INewsStateDataItem = {
   news: INewsCardModel[]
   page: number
   style: NewsStyle
}

interface INewsState {
   data: INewsStateDataItem[]
   error: string | null
   loading: "idle" | "pending" | "success" | "failure"
}

const initialState: INewsState = {
   data: [],
   error: null,
   loading: "idle",
}

export const fetchNews = createAsyncThunk<INewsStateDataItem, { page: number; style: NewsStyle }>(
   "news/fetch",
   async ({ page, style }) => {
      const {
         data: { news },
      } = await getNewsByPage(page)

      return { news: news, page, style }
   }
)

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
         const sortedData: INewsStateDataItem[] = [...state.data, payload].sort((a, b) => {
            if (a.page < b.page) {
               return -1
            }
            return 1
         })
         state.data = sortedData
         state.loading = "success"
         state.error = null
      })
   },
})

export default newsSlice
