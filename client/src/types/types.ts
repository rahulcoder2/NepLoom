export enum LOGIN_TYPES {
  emailPassword = "EMAIL_PASSWORD",
  google = "GOOGLE",
}

/* USER ROLES */
export enum USER_ROLES {
  admin = "ADMIN",
  user = "USER",
}
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
