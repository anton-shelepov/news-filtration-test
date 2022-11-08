import { ChangeEventHandler } from "react"
import s from "./SearchInput.module.scss"

interface ISearchInputProps {
   value: string
   onChange: ChangeEventHandler<HTMLInputElement>
   placeholder: string
}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {
   return (
      <div className={s.container}>
         <input {...props} type="text" />
         <span className={s.search_icon}></span>
      </div>
   )
}
