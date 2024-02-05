export interface UserEntity {
  id: string;
}

export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export type ORDER_STATUS = "created" | "completed";

export interface OrderEntity {
  id: string;
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}
