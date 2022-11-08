import { SvgSelector } from "components/SvgSelector"
import { NewsStyle, selectNewsStyle } from "utils/scripts/selectNewsCardStyle"
import s from "./FilledStyledButton.module.scss"

interface IFilledStyledButtonProps {
   text: string
   style: NewsStyle
   onClick: () => void
}

export const FilledStyledButton: React.FC<IFilledStyledButtonProps> = ({ style, text, ...restProps }) => {
   const { color, icon } = selectNewsStyle(style)

   return (
      <button {...restProps} className={s.button_styled} style={{ backgroundColor: color }}>
         {text}
         <SvgSelector color="#ffffff" icon={icon} />
      </button>
   )
}
