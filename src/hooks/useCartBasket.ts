import useCartStore from '@/store/basketStore'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CartItem {
	id: string
	price: number
	brand: string
	model: string
	image: string
	type: string
	category: string
	quantity: number
}
interface CartBasketHookResult {
	isBasketOpen: boolean
	toggleCart: () => void
	closeCart: () => void
	cartItems: CartItem[]
	removeItem: (id: string) => void
	updateItemQuantity: (id: string, quantity: number) => void
	clearCart: () => void
	total: () => number
	cartRef: React.RefObject<HTMLDivElement>
}

const useCartBasket = (): CartBasketHookResult => {
	const [isBasketOpen, setIsBasketOpen] = useState(false)
	const cartItems = useCartStore(state => state.cartItems)
	const removeItem = useCartStore(state => state.removeItem)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
	const clearCart = useCartStore(state => state.clearCart)
	const total = useCartStore(state => state.getTotal)

	const toggleCart = useCallback(() => {
		setIsBasketOpen(prev => !prev)
	}, [])

	const closeCart = useCallback(() => {
		setIsBasketOpen(false)
	}, [])

	const cartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
				closeCart()
			}
		}

		if (isBasketOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isBasketOpen, closeCart])

	return {
		isBasketOpen,
		toggleCart,
		closeCart,
		cartItems,
		removeItem,
		updateItemQuantity,
		clearCart,
		total,
		cartRef,
	}
}

export default useCartBasket
