import { Types, ObjectId } from "mongoose";

export interface ProductEntity {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
}
export interface UserEntity {
  _id: Types.ObjectId;
}
export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  _id: ObjectId;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export type ORDER_STATUS = "created" | "completed";

export interface OrderEntity {
  _id: Types.ObjectId;
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
