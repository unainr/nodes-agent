export interface TypeLayout{
    children: React.ReactNode
}

export type Product = {
  id: string
  name: string
  description: string | null
  price: string
  unit: string
  stock: number
  imageUrl: string | null
  categoryId: string | null
  isActive: boolean
}