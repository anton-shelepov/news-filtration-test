import client from "api/client"
import { GetNewsByPageResponseData } from "./newsApiTypes"

const getNewsByPage = async (page: number) => {
   const response = await client.get<GetNewsByPageResponseData>(`news`, {
      params: { page },
   })

   return response.data
}

export default getNewsByPage
