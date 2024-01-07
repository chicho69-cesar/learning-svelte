export interface Product {
  name: string
  src: string
  price: string
  quantity: number
}

export type ProductWithDescription = Product & { description: string }
