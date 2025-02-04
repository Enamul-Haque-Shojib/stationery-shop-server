

export type TOrderProduct = {
  productTitle: string;
  productCategory: string;
  userEmail: string ;
  quantity: number;
  price: number;
  approveOrder: 'Pending' | 'Shipping' | 'Cancelled'
}




export type TProduct = {
    title: string;
    productImgUrl: string;
    brand: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
  };