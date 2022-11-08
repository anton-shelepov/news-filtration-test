import { ReactNode } from "react"
import s from "./PageWrapper.module.scss"

interface IPageWrapperProps {
   children: ReactNode
}

export const PageWrapper: React.FC<IPageWrapperProps> = ({ children }) => {
   return <div className={s.wrapper}>{children}</div>
}
