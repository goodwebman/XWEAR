import { initialProducts } from '@/data'
import useCartStore from '@/store/basketStore'
import useFavoritesStore from '@/store/FavoriteStore'
import { Product } from '@/types'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom';


interface ProductDetailsHookResult {
  product: Product | null;
  image: string | undefined;
  price: number | undefined;
  type: string;
  category: string;
  brand: string;
  model: string;
  id: string | undefined;
  color: string | undefined;
  sizes: number[];
  selectedSize: string | null;
  isFavorite: boolean;
  handleToggleFavorite: (e: React.MouseEvent) => void;
  handleSizeClick: (size: string) => void;
  handleAddToCart: () => void;
}

const useProductDetails = (): ProductDetailsHookResult => {
  const location = useLocation();
  const products = initialProducts;
  const queryParams = new URLSearchParams(location.search);

  const type = queryParams.get('type');
  const category = queryParams.get('category');
  const brand = queryParams.get('brand');
  const model = queryParams.get('model');

  const foundProduct = products.find(
    p =>
      p.type === type &&
      p.category === category &&
      p.brand === brand &&
      p.model === model
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(
    foundProduct ? "36": null
  );
    const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = foundProduct ? favorites.includes(foundProduct.id) : false
    

    const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (foundProduct) {
      if (isFavorite) {
            removeFavorite(foundProduct.id);
      } else {
        addFavorite(foundProduct.id);
      }
        }
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

   const { addItem } = useCartStore();

    const handleAddToCart = () => {
    if (foundProduct && selectedSize) {
      addItem({
        id: foundProduct.id,
        price: foundProduct.price,
        brand: foundProduct.brand,
        model: foundProduct.model,
        image: foundProduct.image,
        type: foundProduct.type,
        category: foundProduct.category,
      });

      toast.success(
        `Товар "${foundProduct.brand} ${foundProduct.model}" размера ${selectedSize} добавлен в корзину!`
      );
    } else {
      alert('Выберете размер');
    }
  };

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    product: foundProduct || null,
    type: foundProduct.type,
    image: foundProduct.image,
    price: foundProduct.price,
    model: foundProduct.model,
    id: foundProduct.id,
    brand: foundProduct.brand,
    color: foundProduct.color,
    category: foundProduct.category,
    sizes: [
      36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43,
      43.5, 44, 44.5,
    ],
    selectedSize,
    
    isFavorite,
    handleToggleFavorite,
    handleSizeClick,
    handleAddToCart,
    
    
  };
};

export default useProductDetails;
