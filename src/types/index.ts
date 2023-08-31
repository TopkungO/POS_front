export type Role = "CLIENT" | "ITEMEDITOR" | "ADMIN" | "SUPERADMIN";

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: Role[];
  status: boolean;
  tokenVersion: number;
  createdAt: string;
  updatedAt: string;
}

export type loginType = Pick<User, "username" | "password">;
export type logoutType = Pick<User, "username">;

export type listUserType = Omit<User, "password" | "tokenVersion">;

export interface CategoryType {
  _id: string;
  category: string;
}

export interface ProductType {
  _id: string;
  productId: number;
  name: string;
  description: string;
  category: string[];
  costPrice: number;
  price: number;
  stock: number;
  sold: number;
  images: [];
  count:number
  createdAt: Date;
  updatedAt: Date;
}
