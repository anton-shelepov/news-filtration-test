import { NewsCard } from "components/NewsCard"
import { useEffect, useState } from "react"
import { INewsStateDataItem } from "redux/slices/newsSlice"
import { useAppSelector } from "utils/hooks/useAppSelector"

interface INewsCardsListProps {
   shortTextFiltration: string
}

export const NewsCardsList: React.FC<INewsCardsListProps> = ({ shortTextFiltration }) => {
   const newsState = useAppSelector((state) => state.news)
   const [filteredNewsData, setFilteredNewsData] = useState<INewsStateDataItem[]>([])

   const filterNewsData = () => {
      const updatedFilteredNewsData = newsState.data.map((dataItem) => {
         const filteredNews = dataItem.news.filter((newsItem) =>
            newsItem.shortText.toLowerCase().includes(shortTextFiltration.toLowerCase())
         )
         return { ...dataItem, news: filteredNews }
      })
      setFilteredNewsData(updatedFilteredNewsData)
   }

   useEffect(() => {
      if (shortTextFiltration !== "") {
         filterNewsData()
         return
      }
      setFilteredNewsData(() => newsState.data)
      console.log(newsState.data)
   }, [JSON.stringify(newsState.data), shortTextFiltration])

   return (
      <>
         {filteredNewsData.map(({ news, style }) =>
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
