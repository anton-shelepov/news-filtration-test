import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getNewsByPage from "api/news/getNewsByPage"
import { NewsStyle } from "utils/scripts/selectNewsCardStyle"
import {
   AsyncNewsThunkAPI,
   INewsFulfilledThunkPayload,
   INewsState,
   INewsStateDataItem,
} from "./newsSliceTypes"

const initialState: INewsState = {
   data: [],
   error: null,
   loading: "idle",
}

export const fetchNews = createAsyncThunk<
   INewsFulfilledThunkPayload,
   { page: number; style: NewsStyle },
   AsyncNewsThunkAPI
>("news/fetch", async ({ page, style }, { getState }) => {
   const { news } = getState()
   const alreadyExistingPageNews = news.data.find((item) => item.page === page)

   if (!alreadyExistingPageNews) {
      const {
         data: { news },
      } = await getNewsByPage(page)

      return { news, page, style }
   }

   return { ...alreadyExistingPageNews, style, isPageExisting: true }
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

         if (payload.isPageExisting) {
            const dataWithUpdatedPageNewsStyle = state.data.map((newsItem) =>
               newsItem.page === payload.page ? { ...newsItem, style: payload.style } : newsItem
            )
            state.data = dataWithUpdatedPageNewsStyle
            return
         }

         const sortedData: INewsStateDataItem[] = [...state.data, payload].sort((a, b) =>
            a.page < b.page ? -1 : 1
         )
         state.data = sortedData
      })
   },
})

export default newsSlice
