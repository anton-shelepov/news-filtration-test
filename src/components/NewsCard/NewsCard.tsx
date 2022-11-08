import { SvgSelector } from "components/SvgSelector"
import { INewsCardModel } from "models/newsCardModel"
import { useMemo } from "react"
import { formatDateRu } from "utils/scripts/formatDateRu"
import { NewsStyle, selectNewsStyle } from "utils/scripts/selectNewsCardStyle"
import s from "./NewsCard.module.scss"

interface INewsCardProps {
   data: INewsCardModel
   cardStyle: NewsStyle
}

export const NewsCard: React.FC<INewsCardProps> = ({
   cardStyle,
   data: { datePublish, image, shortText },
}) => {
   const memoizedCardStyle = useMemo(() => cardStyle, [])

   const { color, icon } = selectNewsStyle(memoizedCardStyle)

   return (
      <div className={s.container}>
         <div className={s.block_top}>
            <img src={image} alt="news image" />
         </div>
         <div className={s.block_bottom}>
            <h2 className={s.short_text}>{shortText}</h2>
            <span className={s.date_styled} style={{ color }}>
               <SvgSelector icon={icon} color={color} />
               {formatDateRu(datePublish)}
            </span>
         </div>
      </div>
   )
}
