import useCartStore from '@/store/basketStore'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { initialProducts } from '../../data'
import { useSearch } from '../../hooks/SearchContext'
import SearchInput from '../catalog/SearchInput'

interface NavItem {
	name: string
	path: string
	dropdown?: NavItem[]
}

const Navigation: React.FC = () => {
	const { handleSearch } = useSearch() // Получаем handleSearch из контекста

	const [showSearchInput, setShowSearchInput] = useState<boolean>(false)
	const location = useLocation()
	const isCatalogPage = location.pathname.startsWith('/catalog')
	const isProductPage = location.pathname.startsWith('/product')
	const isMainPage = location.pathname

	const handleClearSearch = () => {
		handleSearch('') // Сбрасываем поиск на пустую строку
	}

	const handleToggleSearchInput = useCallback(() => {
		setShowSearchInput(!showSearchInput)
		handleClearSearch()
	}, [showSearchInput])

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	const menuRef = useRef<HTMLDivElement>(null)

	const toggleMenu = (): void => {
		setIsMenuOpen(!isMenuOpen)
	}
	const handleClickOutside = (event: MouseEvent): void => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsMenuOpen(false)
		}
	}

	useEffect(() => {
		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isMenuOpen])

	//updaTE

	const navigate = useNavigate()
	const [_, setTypes] = useState<string[]>([])
	const [navItems, setNavItems] = useState<NavItem[]>([])
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const uniqueTypes = [
			...new Set(initialProducts.map(product => product.type)),
		].map(type => type.toLowerCase())
		setTypes(uniqueTypes)
		const initialNavItems = [
			{
				name: 'Каталог',
				path: '/catalog',
				dropdown: uniqueTypes.map(type => ({
					name: type.charAt(0).toUpperCase() + type.slice(1),
					path: `/catalog/${type}`,
				})),
			},
			{
				name: 'Расчет стоимости',
				path: '/',
			},
			{
				name: 'Информация',
				path: '/',
			},
		]
		setNavItems(initialNavItems)
	}, [])

	const handleToggleDropdown = (name: string) => {
		setOpenDropdown(openDropdown === name ? null : name)
	}

	const handleNavClick = (path: string) => {
		setIsMenuOpen(!isMenuOpen)
		setOpenDropdown(null)
		navigate(path)
	}

	// basket

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
		<nav className='bg-[#121214] '>
			<div className='max-w-[1300px] min-h-[115px] px-[30px] m-auto py-[32px] flex items-center justify-between'>
				{/* LOGO */}
				{!showSearchInput && (
					<div className='flex gap-[54px] max-[400px]:gap-[20px]'>
						<button
							onClick={toggleMenu}
							className='hidden max-[500px]:block cursor-pointer'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='white'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 9h16.5m-16.5 6.75h16.5'
								/>
							</svg>
						</button>
						<a href='/'>
							<img src='/logo.svg' alt='' />
						</a>

						<button
							onClick={toggleMenu}
							className='hidden max-[970px]:block cursor-pointer max-[500px]:hidden'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='white'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 9h16.5m-16.5 6.75h16.5'
								/>
							</svg>
						</button>
					</div>
				)}

				{isMenuOpen && (
					<div
						className='fixed inset-0 transition-opacity duration-300 ease-in-out'
						onClick={toggleMenu}
					></div>
				)}

				<nav
					className={`${
						isMenuOpen ? 'left-0' : 'left-[-100%]'
					}    fixed top-0 min-[970px]:hidden  w-[100%] h-full bg-[#121214] overflow-auto z-10  duration-300`}
				>
					<button onClick={toggleMenu} className='cursor-pointer p-4 '>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='white'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>

					<ul className='flex flex-col pl-[20px] justify-start  gap-[48px]'>
						{navItems.map(item => (
							<li key={item.name} className='relative group'>
								{item.dropdown ? (
									<div ref={dropdownRef}>
										<button
											className=' text-white gap-[4px] py-2  rounded focus:outline-none flex items-center'
											onClick={() => handleToggleDropdown(item.name)}
										>
											<p className='text-white font-[600] leading-[17px] cursor-pointer'>
												{item.name}
											</p>
											<div>
												{openDropdown ? (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m4.5 15.75 7.5-7.5 7.5 7.5'
														/>
													</svg>
												) : (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m19.5 8.25-7.5 7.5-7.5-7.5'
														/>
													</svg>
												)}
											</div>
										</button>
										{openDropdown === item.name && (
											<div className=' flex flex-col pt-[20px] gap-[15px] mt-2 bg-[#121214]  rounded shadow-lg z-10 p-[20] w-[200px]  h-48'>
												{item.dropdown.map(dropdownItem => (
													<button
														key={dropdownItem.name}
														className='block px-4 py-2 cursor-pointer text-white hover:underline w-full text-left'
														onClick={() => handleNavClick(dropdownItem.path)}
													>
														{dropdownItem.name}
													</button>
												))}
											</div>
										)}
									</div>
								) : (
									<button
										className='  text-white font-[600] leading-[17px]  relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:transition-all pb-[6px] before:duration-500 before:ease-in-out group-hover:before:w-full cursor-pointer'
										onClick={() => handleNavClick(item.path)}
									>
										{item.name}
									</button>
								)}
							</li>
						))}
					</ul>
				</nav>

				{/* NAV ITEMS */}
				{!showSearchInput && (
					<ul className='flex max-[970px]:hidden items-center gap-[48px]'>
						{navItems.map(item => (
							<li key={item.name} className='relative group'>
								{item.dropdown ? (
									<div ref={dropdownRef}>
										<button
											className=' text-white gap-[4px] py-2 px-4 rounded focus:outline-none flex items-center'
											onClick={() => handleToggleDropdown(item.name)}
										>
											<p className='text-white font-[600] leading-[17px] cursor-pointer'>
												{item.name}
											</p>
											<div>
												{openDropdown ? (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m4.5 15.75 7.5-7.5 7.5 7.5'
														/>
													</svg>
												) : (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m19.5 8.25-7.5 7.5-7.5-7.5'
														/>
													</svg>
												)}
											</div>
										</button>
										{openDropdown === item.name && (
											<div className='absolute flex flex-col pt-[20px] gap-[15px] mt-2 bg-[#121214]  rounded shadow-lg z-10 py-[20px] w-[200px]  '>
												{item.dropdown.map(dropdownItem => (
													<button
														key={dropdownItem.name}
														className='block px-4 py-2 cursor-pointer text-white hover:underline w-full text-left'
														onClick={() => handleNavClick(dropdownItem.path)}
													>
														{dropdownItem.name}
													</button>
												))}
											</div>
										)}
									</div>
								) : (
									<button
										className='  text-white font-[600] leading-[17px]  relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:transition-all pb-[6px] before:duration-500 before:ease-in-out group-hover:before:w-full cursor-pointer'
										onClick={() => handleNavClick(item.path)}
									>
										{item.name}
									</button>
								)}
							</li>
						))}
					</ul>
				)}

				{showSearchInput && (
					<button className='w-full flex-1 mx-[20px] min-w-[250px] max-[380px]:min-w-[140px] '>
						<SearchInput onSearch={handleSearch} />
					</button>
				)}
				{/* NAV ICONS */}
				<div className='flex items-center gap-[32px] max-[400px]:gap-[20px]'>
					{(isCatalogPage || isProductPage) && (
						<button
							onClick={handleToggleSearchInput}
							className='cursor-pointer'
						>
							<img src='/search.svg' alt='search' />
						</button>
					)}

					{isMainPage === '/' && <button className='w-[18px]'></button>}

					{!showSearchInput && (
						<div className='flex items-center gap-[32px]'>
							<button className='cursor-pointer'>
								<img src='/favorites.svg' alt='fav' />
							</button>

							<div className='flex gap-[6px] items-center'>
								<button
									onClick={toggleCart}
									className='focus:outline-none relative'
								>
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
									className={`fixed top-0 right-0 h-full w-[500px] z-99 bg-white shadow-xl transition-transform transform duration-300 ease-in-out ${
										isBasketOpen ? 'translate-x-0' : 'translate-x-full'
									}`}
								>
									{/* Заголовок и кнопка закрытия */}
									<div className='p-4 flex justify-between items-center border-b'>
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
									<div className='p-4 overflow-y-auto h-[calc(100%-60px)]'>
										{cartItems.length === 0 ? (
											<p>Корзина пуста</p>
										) : (
											<ul>
												{cartItems.map(item => (
													<li
														key={item.id}
														className='flex items-center justify-between py-2 border-b last:border-b-0'
													>
														<div className='flex-1'>
															<p className='font-semibold'>{item.brand}</p>
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
										<div className='p-4 flex flex-col items-center gap-3 border-t'>
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
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navigation
