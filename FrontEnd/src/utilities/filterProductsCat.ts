import { Product } from "@/interface/Product"

export default function filterProductCat(catList: Product[], id: string) {
  return catList.filter((el, i) => el._id !== id)
}