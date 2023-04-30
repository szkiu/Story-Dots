export interface Product {
  id: string;
  _id?: string;
  authorId: string;
  author: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  time: number;
  price: number;
}