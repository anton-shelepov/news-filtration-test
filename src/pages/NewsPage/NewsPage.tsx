import { FilledStyledButton } from "components/_buttons/FilledStyledButton"
import { NewsCardsList } from "components/_containers/NewsCardsList"
import { SearchInput } from "components/_inputs/SearchInput"
import { PageWrapper } from "components/_wrappers/PageWrapper"
import { useEffect, useState } from "react"
import { fetchNews } from "redux/slices/newsSlice"
import { useAppDispatch } from "utils/hooks/useAppDispatch"
import s from "./NewsPage.module.scss"

interface INewsPageProps {}

export const NewsPage: React.FC<INewsPageProps> = () => {
   const [search, setSearch] = useState("")

   const onHandleSearch = (value: string) => {
      setSearch(value)
   }

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(fetchNews(7))
   }, [])

   return (
      <PageWrapper>
         <div className={s.block_search}>
            <SearchInput onSearch={onHandleSearch} searchTimeout={200} placeholder="Поиск" />
         </div>
         <div className={s.block_news_list}>
            <NewsCardsList shortTextFiltration={search} />
         </div>
         <div className={s.block_load_buttons}>
            <FilledStyledButton text="Загрузить" style="green" onClick={() => {}} />
            <FilledStyledButton text="Загрузить" style="pink" onClick={() => {}} />
            <FilledStyledButton text="Загрузить" style="yellow" onClick={() => {}} />
         </div>
      </PageWrapper>
   )
}
