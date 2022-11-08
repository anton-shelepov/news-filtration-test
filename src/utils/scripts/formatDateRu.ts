export const formatDateRu = (date: string) => {
   const formatDateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
   }

   const formattedDate = new Date(date).toLocaleString("ru", formatDateOptions)

   return formattedDate
}
