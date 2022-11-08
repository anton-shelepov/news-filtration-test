import { NewsCard } from "components/NewsCard"
import { FilledStyledButton } from "components/_buttons/FilledStyledButton"
import { SearchInput } from "components/_inputs/SearchInput"
import { PageWrapper } from "components/_wrappers/PageWrapper"
import s from "./NewsPage.module.scss"

interface INewsPageProps {}

export const NewsPage: React.FC<INewsPageProps> = () => {
   const onHandleSearch = (value: string) => {
      console.log(value)
   }

   return (
      <PageWrapper>
         <div className={s.block_search}>
            <SearchInput onSearch={onHandleSearch} searchTimeout={200} placeholder="Поиск" />
         </div>
         <div className={s.block_news_list}>
            <NewsCard
               cardStyle="green"
               data={{
                  datePublish: "2019-12-02",
                  image: "https://cdn2.domotekhnika.ru/images/news/000/000/592/e2116e4ba6ea003cd9de6544b7bc91272cd13f4f-original.png",
                  shortText:
                     "С 10 февраля по 15 марта 2020 года включительно не нужно выбирать между покупкой новой стиральной машины или холодильника - позвольте себе и то, и другое!\r\nПри покупке товара в рассрочку скидка на товар не распространяется",
               }}
            />
         </div>
         <div className={s.block_load_buttons}>
            <FilledStyledButton text="Загрузить" style="pink" onClick={() => {}} />
         </div>
      </PageWrapper>
   )
}
