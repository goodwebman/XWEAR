import { initialProducts } from '@/data'
import useFavoritesDrawer from '@/hooks/useFavoritesDrawer'
import React from 'react'
import { Link } from 'react-router'

const FavoritesDrawer: React.FC = () => {
	const {
		isDrawerOpen,
		toggleDrawer,
		closeDrawer,
		favorites,
		removeFavorite,
		drawerRef,
	} = useFavoritesDrawer()

	return (
		<div className='flex items-center'>
			<button onClick={toggleDrawer} className='focus:outline-none relative'>
				<svg
					width='20'
					height='18'
					viewBox='0 0 20 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M10.0998 0C10.4032 0 10.6804 0.171547 10.8158 0.442994L13.2554 5.33528L18.7134 6.11815C19.0159 6.16154 19.2673 6.37351 19.3612 6.66436C19.455 6.95522 19.375 7.27414 19.1549 7.48618L15.2046 11.2917L16.1357 16.6634C16.1876 16.9632 16.065 17.2665 15.8193 17.446C15.5736 17.6255 15.2473 17.65 14.9775 17.5093L10.1054 14.9684L5.2215 17.5097C4.95169 17.6501 4.6256 17.6253 4.38007 17.4458C4.13453 17.2663 4.01204 16.9631 4.06398 16.6634L4.99504 11.2917L1.0448 7.48618C0.824691 7.27414 0.744629 6.95522 0.838486 6.66436C0.932342 6.37351 1.18371 6.16154 1.48624 6.11815L6.9443 5.33528L9.3839 0.442994C9.51927 0.171547 9.7965 0 10.0998 0ZM10.0998 2.59269L8.18897 6.42463C8.07176 6.65969 7.84663 6.82223 7.58664 6.85952L3.33368 7.46954L6.41082 10.4339C6.602 10.6181 6.68937 10.8851 6.64403 11.1467L5.91645 15.3444L9.73651 13.3567C9.9682 13.2361 10.2441 13.2363 10.4757 13.357L14.2829 15.3426L13.5556 11.1467C13.5103 10.8851 13.5977 10.6181 13.7888 10.4339L16.866 7.46954L12.613 6.85952C12.353 6.82223 12.1279 6.65969 12.0107 6.42463L10.0998 2.59269Z'
						fill='white'
					/>
				</svg>
			</button>

			<div
				ref={drawerRef}
				className={`fixed top-0 left-0 h-full z-99 bg-white shadow-xl transition-transform transform duration-300 ease-in-out w-[400px] max-[900px]:w-[300px] ${
					isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Заголовок и кнопка закрытия */}
				<div className='p-4 flex justify-between items-center border-b'>
					<h2 className='text-xl font-bold'>Избранное</h2>
					<button onClick={closeDrawer} className='focus:outline-none'>
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

				{/* Содержимое Избранное */}
				<div className='p-4 overflow-y-auto scrollable-container h-[calc(100%-120px)]'>
					{favorites.length === 0 ? (
						<p>Список избранных пуст</p>
					) : (
						<ul>
							{favorites.map(favoriteId => {
								const item = initialProducts.find(
									(product: any) => product.id === favoriteId
								)
								if (item) {
									return (
										<li
											key={favoriteId}
											className='flex items-center justify-between py-8 border-b last:border-b-0'
										>
											<Link
												onClick={closeDrawer}
												to={`/product?type=${item.type}&category=${item.category}&brand=${item.brand}&model=${item.model}`}
												className='flex items-center gap-2'
											>
												<img
													src={item.image}
													alt={item.brand + ' ' + item.model}
													className='w-32 h-32 object-cover rounded'
												/>
												<div className='flex-1'>
													<p className='font-semibold'>
														{item.brand} {item.model}
													</p>
													<div className='flex items-center gap-2'>
														<p>Цена: {item.price}</p>
													</div>
												</div>
											</Link>
											<div className='flex gap-2'>
												<button
													onClick={() => removeFavorite(favoriteId)}
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
									)
								} else {
									return (
										<li
											key={favoriteId}
											className='py-2 border-b last:border-b-0'
										>
											Товар удален
										</li>
									)
								}
							})}
						</ul>
					)}
				</div>
			</div>
			{isDrawerOpen && (
				<div
					onClick={closeDrawer}
					className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
				></div>
			)}
		</div>
	)
}

export default FavoritesDrawer
