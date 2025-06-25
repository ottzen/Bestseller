export interface Product {
  id: number;
  brand: string;
  price: number;
  stock: number;
  color: string;
  size: string[];
  name: {
    dk: string;
    en: string;
  };
  images: string[];
  variant: Variant[];
  categories: string[];
}

export interface Variant {
  stock: number;
  color: string;
  size: string[];
  images: string[];
}