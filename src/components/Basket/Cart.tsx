import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import useCartStore from '../../store/basketStore'

const Cart: React.FC = () => {
	const [isBasketOpen, setIsBasketOpen] = useState(false)
	const cartItems = useCartStore(state => state.cartItems)
	const removeItem = useCartStore(state => state.removeItem)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
	const clearCart = useCartStore(state => state.clearCart)
	const total = useCartStore(state => state.getTotal)

	const toggleCart = () => {
		setIsBasketOpen(prev => !prev)
	}

	const closeCart = () => {
		setIsBasketOpen(false)
	}

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

	

	return (
		<div className='flex gap-[6px] items-center'>
			<button onClick={toggleCart} className='focus:outline-none relative'>
				<img src='/basket.svg' alt='' />
				{cartItems.length > 0 && (
					<span className='absolute top-[-3px] right-[-4px] bg-[#49D0FF] text-white text-xs rounded-full px-2 py-0.5 transform translate-x-2 -translate-y-1'>
						{cartItems.length}
					</span>
				)}
			</button>

			{/* Выдвигающаяся корзина */}
			<div
				ref={cartRef}
				className={`fixed top-0 right-0 h-full  z-99 bg-white shadow-xl transition-transform transform duration-300 ease-in-out w-[400px] max-[900px]:w-[300px]  ${
					isBasketOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Заголовок и кнопка закрытия */}
				<div className='p-4 flex justify-between  items-center border-b'>
					<h2 className='text-xl font-bold'>Корзина</h2>
					<button onClick={closeCart} className='focus:outline-none'>
						<svg
							className='h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>

				{/* Содержимое корзины */}
				<div className='p-4 overflow-y-auto h-[calc(100%-170px)]'>
					{cartItems.length === 0 ? (
						<p>Корзина пуста</p>
					) : (
						<ul>
							{cartItems.map(item => (
								<li
									key={item.id}
									className='flex items-center justify-between gap-[20px] py-2 border-b last:border-b-0'
								>
									<div className='flex flex-col '>
										<p className='font-semibold'>
											{item.brand} {item.model}
										</p>
										<Link
										onClick={closeCart}
											to={`/product?type=${item.type}&category=${item.category}&brand=${item.brand}&model=${item.model}`}
										>
											<img src={item.image} alt='no image' />
										</Link>
										<div className='flex items-center gap-2'>
											<p>Цена: {item.price}</p>
											<p>Кол-во: {item.quantity}</p>
										</div>
									</div>
									<div className='flex space-x-2'>
										<button
											onClick={() =>
												updateItemQuantity(item.id, item.quantity - 1)
											}
											disabled={item.quantity <= 1}
											className='bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none disabled:opacity-50'
										>
											-
										</button>
										<button
											onClick={() =>
												updateItemQuantity(item.id, item.quantity + 1)
											}
											className='bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none'
										>
											+
										</button>
										<button
											onClick={() => removeItem(item.id)}
											className='text-red-500 hover:text-red-700 focus:outline-none'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='w-5 h-5'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				{/* Нижняя панель с итогом и кнопкой очистки */}
				{cartItems.length > 0 && (
					<div className='p-4 flex flex-col items-center gap-3 border-t absolute bottom-0 left-0 right-0 bg-white'>
						<p className='font-semibold text-lg'>Итого: {total()}</p>
						<button
							onClick={clearCart}
							className='bg-red-500 hover:bg-red-700 text-white rounded py-2 px-4 focus:outline-none'
						>
							Очистить корзину
						</button>
					</div>
				)}
			</div>
			{isBasketOpen && (
				<div
					onClick={closeCart}
					className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
				></div>
			)}
		</div>
	)
}

export default Cart
