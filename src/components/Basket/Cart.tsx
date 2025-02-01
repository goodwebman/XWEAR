import React from 'react'
import useCartStore from '../../store/basketStore'

const Cart: React.FC = () => {
	const cartItems = useCartStore(state => state.cartItems)
	const removeItem = useCartStore(state => state.removeItem)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
	const clearCart = useCartStore(state => state.clearCart)
	const total = useCartStore(state => state.getTotal)

	if (cartItems.length === 0) {
		return <p>Корзина пуста</p>
	}

	return (
		<div>
			<h2>Корзина</h2>
			<ul>
				{cartItems.map(item => (
					<li key={item.id}>
						
						<button
							onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
							disabled={item.quantity <= 1}
						>
							-
						</button>
						<button
							onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
						>
							+
						</button>
						<button onClick={() => removeItem(item.id)}>Удалить</button>
					</li>
				))}
			</ul>
			<p>Итого: {total()}</p>
			<button onClick={clearCart}>Очистить корзину</button>
		</div>
	)
}

export default Cart
