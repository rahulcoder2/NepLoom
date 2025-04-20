interface Image {
    url: string;
    _id: string;
  }
  
  interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    stock: number;
    image: Image;
    category: string;
    categoryName: string;
    ratings: number;
    size: string[];
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Products {
    products: Product[];
    totalProducts: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  }
  
  interface ProductsResponse {
    products: Products;
    message: string;
  }