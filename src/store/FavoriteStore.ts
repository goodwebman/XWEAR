import { create } from 'zustand'



interface StoreState {
	favorites: string[]
	addFavorite: (item: string) => void
	removeFavorite: (item: string) => void
}

const useFavoritesStore = create<StoreState>((set) => ({
	favorites: [],
	addFavorite: (item) => set((state) => {
	  const newFavorites = [...state.favorites, item];
	  // Обновление localStorage
	  if (typeof window !== "undefined") {
		localStorage.setItem('favorites', JSON.stringify(newFavorites));
	  }
	  return { favorites: newFavorites };
	}),
	removeFavorite: (item) => set((state) => {
	  const newFavorites = state.favorites.filter(fav => fav !== item);
	  // Обновление localStorage
	  if (typeof window !== "undefined") {
		localStorage.setItem('favorites', JSON.stringify(newFavorites));
	  }
	  return { favorites: newFavorites };
	}),
  }));
  
  // Дополним функционал, чтобы инициализировать favorites
  const initializeFavorites = () => {
	if (typeof window !== "undefined") {
	  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
	  // Устанавливаем начальное значение favorites
	  useFavoritesStore.setState({ favorites: storedFavorites });
	}
  };
  
  // Вызываем инициализацию при импорте
  initializeFavorites();
  
  export default useFavoritesStore;