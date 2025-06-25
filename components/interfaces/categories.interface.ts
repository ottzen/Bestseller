export interface Category {
  id: string;
  parent_category_id: string;
  level: number;
  name: {
    en: string;
    dk: string;
  };
  categories?: Category[];
}

export interface FlatCategory {
  id: string
  name: string
  level: number
}