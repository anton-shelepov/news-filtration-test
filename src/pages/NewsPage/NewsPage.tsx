import { FilledStyledButton } from "components/_buttons/FilledStyledButton"
import { NewsCardsList } from "components/_containers/NewsCardsList"
import { SearchInput } from "components/_inputs/SearchInput"
import { PageWrapper } from "components/_wrappers/PageWrapper"
import { useEffect, useState } from "react"
import { fetchNews } from "redux/slices/newsSlice/newsSlice"
import { useAppDispatch } from "utils/hooks/useAppDispatch"
import { randomFromTo } from "utils/scripts/randomFromTo"
import { NewsStyle } from "utils/scripts/selectNewsCardStyle"
import s from "./NewsPage.module.scss"
import { styledLoadButtonsList } from "./styledLoadButtonsList"

interface INewsPageProps {}

export const NewsPage: React.FC<INewsPageProps> = () => {
   const [search, setSearch] = useState("")
   const dispatch = useAppDispatch()

   const onHandleSearch = (value: string) => {
      setSearch(value)
   }

   useEffect(() => {
      dispatch(fetchNews({ page: 7, style: "green" }))
   }, [dispatch])

   const onHandleLoadButtonClick = (style: NewsStyle) => {
      dispatch(fetchNews({ page: randomFromTo(1, 10), style }))
   }

   return (
      <PageWrapper>
         <div className={s.block_search}>
            <SearchInput onSearch={onHandleSearch} searchTimeout={200} placeholder="Поиск" />
         </div>
         <div className={s.block_news_list}>
            <NewsCardsList shortTextFiltration={search} />
         </div>
         <div className={s.block_load_buttons}>
            {styledLoadButtonsList.map(({ id, style }) => (
               <FilledStyledButton
                  onClick={() => onHandleLoadButtonClick(style)}
                  style={style}
                  text="Загрузить"
                  key={id}
               />
            ))}
         </div>
      </PageWrapper>
   )
}
