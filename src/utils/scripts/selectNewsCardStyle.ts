import { IconName } from "components/SvgSelector"
import CSSVariables from "styles/variables.module.scss"

export type NewsStyle = "green" | "pink" | "yellow"

export type SelectedNewsStyle = {
   icon: IconName.FIRE | IconName.PIG | IconName.LIGHTNING
   color: string
}

export const selectNewsStyle = (style: NewsStyle): SelectedNewsStyle => {
   switch (style) {
      case "green":
         return {
            color: CSSVariables.greenColor,
            icon: IconName.PIG,
         }

      case "yellow":
         return {
            color: CSSVariables.yellowColor,
            icon: IconName.FIRE,
         }

      case "pink":
         return {
            color: CSSVariables.pinkColor,
            icon: IconName.LIGHTNING,
         }
   }
}
