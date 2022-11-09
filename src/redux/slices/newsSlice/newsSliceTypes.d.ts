import { INewsCardModel } from "models/newsCardModel"
import { RootState } from "redux/store"
import { NewsStyle } from "utils/scripts/selectNewsCardStyle"

export type INewsStateDataItem = {
   news: INewsCardModel[]
   page: number
   style: NewsStyle
}

export type INewsFulfilledThunkPayload = INewsStateDataItem & { isPageExisting?: boolean }

export interface INewsState {
   data: INewsStateDataItem[]
   error: string | null
   loading: "idle" | "pending" | "success" | "failure"
}

export type AsyncNewsThunkAPI = {
   state: RootState
}
