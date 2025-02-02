import { create } from 'zustand';

interface Item {
    id: string;
    image: string;
    brand: string
    model: string
    price: number;
    quantity: number;
}

interface CartState {
    cartItems: Item[];
    addItem: (item: Omit<Item, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateItemQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

const CART_STORAGE_KEY = 'cart-items';

const useCartStore = create<CartState>((set, get) => ({
    cartItems: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'),

    addItem: (item) => {
        const existingItem = get().cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            set((state) => {
                const updatedCart = state.cartItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
                return ({ cartItems: updatedCart });
            });

        } else {
            set((state) => {
                const updatedCart = [...state.cartItems, { ...item, quantity: 1 }]
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
                return ({ cartItems: updatedCart })
            });
        }
    },

    removeItem: (id) => {
        set((state) => {
            const updatedCart = state.cartItems.filter((item) => item.id !== id);
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
            return ({ cartItems: updatedCart })
        });
    },

    updateItemQuantity: (id, quantity) => {
        set((state) => {
            const updatedCart = state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
            return ({ cartItems: updatedCart })
        });
    },

    clearCart: () => {
        set(() => {
            localStorage.removeItem(CART_STORAGE_KEY);
            return ({ cartItems: [] })
        });
    },

    getTotal: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
}));


export default useCartStore;
