interface CartItem {
    _id: string;
    coupon: string | null;
    product: Product;
    quantity: number;
  }
  
  interface UserCart {
    _id: string;
    items: CartItem[];
    cartTotal: number;
    discountedTotal: number;
  }
  
  interface CartResponse {
    cart: UserCart;
    message: string;
  }