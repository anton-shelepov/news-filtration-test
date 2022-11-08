import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getNewsByPage from "api/news/getNewsByPage"
import { INewsCardModel } from "models/newsCardModel"
import { RootState } from "redux/store"
import { NewsStyle } from "utils/scripts/selectNewsCardStyle"

export type INewsStateDataItem = {
   news: INewsCardModel[]
   page: number
   style: NewsStyle
}

export type INewsFulfilledThunkPayload = INewsStateDataItem & { isPageExisting: boolean }

interface INewsState {
   data: INewsStateDataItem[]
   error: string | null
   loading: "idle" | "pending" | "success" | "failure"
}

type asyncThunkAPI = {
   state: RootState
}

const initialState: INewsState = {
   data: [],
   error: null,
   loading: "idle",
}

export const fetchNews = createAsyncThunk<
   INewsFulfilledThunkPayload,
   { page: number; style: NewsStyle },
   asyncThunkAPI
>("news/fetch", async ({ page, style }, { getState }) => {
   const { news } = getState()
   const alreadyExistingPageNews = news.data.find((item) => item.page === page)

   if (!alreadyExistingPageNews) {
      const {
         data: { news },
      } = await getNewsByPage(page)

      return { news, page, style, isPageExisting: false }
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
         console.log(payload.page)
         if (payload.isPageExisting) {
            const dataWithUpdatedPageNewsStyle = state.data.map((newsItem) =>
               newsItem.page === payload.page ? { ...newsItem, style: payload.style } : newsItem
            )
            console.log(dataWithUpdatedPageNewsStyle, state.data)
            state.data = dataWithUpdatedPageNewsStyle
         } else {
            const sortedData: INewsStateDataItem[] = [...state.data, payload].sort((a, b) => {
               if (a.page < b.page) {
                  return -1
               }
               return 1
            })
            state.data = sortedData
         }

         state.loading = "success"
         state.error = null
      })
   },
})

export default newsSlice
