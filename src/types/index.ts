export interface Product {
    id: string;
    type: 'Обувь' | 'Одежда' | 'Аксессуары';
    category: string;
    price: number;
    size: number | string;
    color: string;
    brand: string;
    model: string;
    image: string;
  }
  
  export interface Filters {
    category: string[];
    price: number[];
    size: (number | string)[];
    brand: string[];
    model: string[];
    color: string[];
    sorting: 'asc' | 'desc' | null;
  }
  
  export interface Breadcrumb {
      name: string;
      link?: string
  }
  