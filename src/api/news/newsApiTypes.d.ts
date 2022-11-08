export type GetNewsByPageResponseData = {
   status: string
   message: string
   data: {
      news: {
         title: string
         shortText: string
         datePublish: string
         image: string
         slug: string
      }[]
   }
   seo: {
      title: string
      description: string
      keywords: string
      h1: string
      canonical: string
      seoText: string
   }
   pageCount: number
}
