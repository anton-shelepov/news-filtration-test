import { IconName, SvgSelector } from "components/SvgSelector"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import CSSVariables from "styles/variables.module.scss"
import s from "./SearchInput.module.scss"

interface ISearchInputProps {
   onSearch: (value: string) => void
   searchTimeout: number
   placeholder: string
}

export const SearchInput: React.FC<ISearchInputProps> = ({ onSearch, searchTimeout, ...restProps }) => {
   const [inputValue, setInputValue] = useState("")
   const searchTimer = useRef(window.setTimeout("", 0))
   const inputRef = useRef<HTMLInputElement>(null)

   const onHandleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const inputChangeEventValue = e.currentTarget.value
      setInputValue(inputChangeEventValue)
   }

   useEffect(() => {
      const updateSearchTimeout = (value: string) => {
         clearTimeout(searchTimer.current)
         searchTimer.current = window.setTimeout(() => {
            onSearch(value)
         }, searchTimeout)
      }

      updateSearchTimeout(inputValue)

      return () => clearTimeout(searchTimer.current)
   }, [inputValue])

   const onHandleContainerClick = () => {
      inputRef.current?.focus()
   }

   return (
      <div className={s.container} onClick={onHandleContainerClick}>
         <input {...restProps} ref={inputRef} value={inputValue} onChange={onHandleChange} type="text" />
         <SvgSelector icon={IconName.SEARCH} color={CSSVariables.inputFontColorPrimary} />
      </div>
   )
}
