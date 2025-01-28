import React from 'react';
import { Product } from '../../types'


interface ProductListProps {
    products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-2">
          <img src={product.image} alt={product.model} className="w-full h-48 object-cover mb-2" />
          <h3 className="font-bold">{product.brand} {product.model}</h3>
          <p>Цена: {product.price} руб.</p>
            <p>Размер: {product.size}</p>
          <p>Цвет: {product.color}</p>
        </div>
      ))}
       {products.length === 0 && (
          <p>Нет товаров соответствующих фильтру</p>
        )}
    </div>
  );
}

export default ProductList;
