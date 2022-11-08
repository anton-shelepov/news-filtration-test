import { NewsCard } from "components/NewsCard"
import { useAppSelector } from "utils/hooks/useAppSelector"

interface INewsCardsListProps {
   shortTextFiltration: string
}

export const NewsCardsList: React.FC<INewsCardsListProps> = ({ shortTextFiltration }) => {
   const newsState = useAppSelector((state) => state.news)

   const filteredNewsData = newsState.data.filter(({ shortText }) =>
      shortText.toLowerCase().includes(shortTextFiltration.toLowerCase())
   )

   return (
      <>
         {filteredNewsData.map(
            (newsItem, index) => newsItem.image && <NewsCard key={index} data={newsItem} cardStyle="pink" />
         )}
      </>
   )
}
