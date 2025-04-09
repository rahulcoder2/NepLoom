
export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image: {
    url: string;
  };
  categoryName: string;
  ratings?: number;
  size?: string[];
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: { url: string };
  ratings?: number;
}

