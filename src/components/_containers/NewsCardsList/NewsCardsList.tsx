import { NewsCard } from "components/NewsCard"
import { useCallback, useRef } from "react"
import { INewsStateDataItem } from "redux/slices/newsSlice"
import { useAppSelector } from "utils/hooks/useAppSelector"
import { NewsStyle } from "utils/scripts/selectNewsCardStyle"

interface INewsCardsListProps {
   shortTextFiltration: string
   applyCardsStyle: NewsStyle
}

export const NewsCardsList: React.FC<INewsCardsListProps> = ({ shortTextFiltration, applyCardsStyle }) => {
   const newsState = useAppSelector((state) => state.news)
   const filteredNewsData = useRef<INewsStateDataItem[]>([])

   const filterNewsData = useCallback(() => {
      filteredNewsData.current = newsState.data.map((dataItem) => {
         const filteredNews = dataItem.news.filter((newsItem) =>
            newsItem.shortText.toLowerCase().includes(shortTextFiltration.toLowerCase())
         )
         return { ...dataItem, news: filteredNews }
      })
   }, [newsState.data, shortTextFiltration])

   filterNewsData()

   return (
      <>
         {filteredNewsData.current.map(({ news, style }) =>
            news.map(
               (newsItem, index) =>
                  newsItem.image && (
                     <NewsCard key={newsItem.shortText + index} cardStyle={style} data={newsItem} />
                  )
            )
         )}
      </>
   )
}
