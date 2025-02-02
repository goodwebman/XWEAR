import Cart from '@/components/Basket/Cart'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Categories from '../components/categories/Categories'
import { initialProducts } from '../data'
import { handsomePrice } from '../libs/handsomePrice'
import useFavoritesStore from '../store/FavoriteStore'
import useCartStore from '../store/basketStore'

import toast, {Toaster} from 'react-hot-toast'

function ProductPage() {
	const location = useLocation()
	const products = initialProducts
	const queryParams = new URLSearchParams(location.search)

	const type = queryParams.get('type')
	const category = queryParams.get('category')
	const brand = queryParams.get('brand')
	const model = queryParams.get('model')
	

	const foundProduct = products.find(
		p =>
			p.type === type &&
			p.category === category &&
			p.brand === brand &&
			p.model === model
			
	)

	const { image, price, id, color } = foundProduct
	const sizes = [
		36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43,
		43.5, 44, 44.5,
	]

	if (!foundProduct) {
		return <div>Product not found</div>
	}
	const [selectedSize, setSelectedSize] = useState<string | null>(
		sizes[0].toString()
	)

	const { favorites, addFavorite, removeFavorite } = useFavoritesStore()

	const isFavorite = favorites.includes(id)

	const handleToggleFavorite = e => {
		e.stopPropagation()
		if (isFavorite) {
			removeFavorite(id)
		} else {
			addFavorite(id)
		}
	}

	const handleSizeClick = (size: string) => {
		setSelectedSize(size)
	}

	const { addItem } = useCartStore() // Получаем addItem из нашего хранилища

	const handleAddToCart = () => {
		if (selectedSize) {
			addItem({
				id,
				price,
				brand,
				model,
				image
			})

			toast.success(
				`Товар "${foundProduct.brand} ${foundProduct.model}" размера ${selectedSize} добавлен в корзину!`
			)
		} else {
			alert('Выберете размер')
		}
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<Toaster position="top-center" />
			<section className='max-w-[1300px] mx-auto px-[20px] flex flex-col '>
				<div className='pt-[15px] text-[#8C8F96]  pb-[50px]'>
					<span className=''>Главная &nbsp; /</span>

					<span className=''>&nbsp; Каталог товаров </span>
					<span className='mx-1'>/</span>
					<Link
						to={`/catalog/${type.toLowerCase()}`}
						className='hover:text-gray-700'
					>
						&nbsp; {type} &nbsp;
					</Link>
					<span className='mx-1'>/</span>
					<span className=''>&nbsp; {category} </span>
					<span className='mx-1'>/</span>
					<span className='text-[#121214]'>{`${brand} ${model}`}</span>
				</div>

				<div className='flex flex-col '>
					<div className='flex flex-col w-full max-[1000px]:items-center min-[1000px]:flex-row items-start gap-8'>
						{/* Product Images */}
						<div className='relative mt-[15px]'>
							<img className='w-[350px]' src={image} alt={model} />
							<svg
								onClick={handleToggleFavorite}
								width='17'
								height='17'
								viewBox='0 0 17 17'
								fill={isFavorite ? '#49D0FF' : 'none'}
								xmlns='http://www.w3.org/2000/svg'
								className='absolute top-0 right-6 w-6 h-6 cursor-pointer'
							>
								<path
									d='M8.50526 12.7826L3.86977 15.2105L4.75526 10.0682L1 6.42668L6.18225 5.67848L8.5 1L10.8177 5.67848L16 6.42668L12.2447 10.0682L13.1302 15.2105L8.50526 12.7826Z'
									stroke={isFavorite ? '#49D0FF' : '#121214'}
									strokeWidth='1.6'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>

						{/* Product Details */}
						<div className='md:w-1/2'>
							<h1 className='text-3xl font-bold mb-4'>
								{foundProduct.brand} {foundProduct.model}
							</h1>
							<div className='mb-4'>
								<p>EU Размеры:</p>
								<div className='grid grid-cols-5 max-[500px]:grid-cols-4 gap-2 mt-2'>
									{sizes.map(size => (
										<button
											key={size}
											className={`border border-gray-300 py-2 px-3 rounded text-sm cursor-pointer ${
												selectedSize === String(size)
													? 'bg-blue-100 border-blue-500'
													: 'hover:bg-gray-100'
											}`}
											onClick={() => handleSizeClick(String(size))}
										>
											{size}
											<p className='text-xs max-[400px]:text-[11px] text-gray-500 whitespace-nowrap'>
												{handsomePrice(price)} ₽
											</p>
										</button>
									))}
								</div>
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-[#626262]'>
									<p className='text-[20px] max-[600px]:text-[15px] font-bold '>
										{handsomePrice(price)} ₽
									</p>
									<p className='uppercase font-[700] max-[600px]:text-[15px]'>
										Размер - {selectedSize}{' '}
									</p>
								</div>

								<button
									onClick={handleAddToCart}
									className='bg-[#121214] p-[23px_40px] text-white max-[600px]:p-[10px_10px] rounded max-[600px]:text-[14px] cursor-pointer'
								>
									Добавить в корзину
								</button>
							</div>
							{/* Tabs */}
						</div>
					</div>
					<div className='mt-8 flex flex-col  max-[1000px]:items-center'>
						<div className='border-b border-gray-200 '>
							<ul className='flex '>
								<li className=''>
									<a className='inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'>
										Детали
									</a>
								</li>
								<li className=''>
									<a className='inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'>
										Доставка
									</a>
								</li>
								<li className=''>
									<a
										href='#payment'
										className='inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'
									>
										Оплата
									</a>
								</li>
								<li className=''>
									<a className='inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'>
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div
							className='mt-4 min-w-[350px]  flex px-[20px] flex-col gap-[30px] mb-[70px]'
							id='details'
						>
							<div className='flex justify-between'>
								<p>Артикул</p>
								<span className='font-[800]'>{id}</span>
							</div>
							<div className='flex justify-between'>
								<p>Категория</p>
								<span className='font-[800]'>{category}</span>
							</div>
							<div className='flex justify-between'>
								<p>Бренд</p>
								<span className='font-[800]'>{brand}</span>
							</div>
							<div className='flex justify-between'>
								<p>Модель</p>
								<span className='font-[800]'>{model}</span>
							</div>
							<div className='flex justify-between'>
								<p>Цвет</p>
								<span className='font-[800]'>{color}</span>
							</div>
						</div>

						<Categories
							cat='Интересные предложения'
							isCatalog={true}
							data={initialProducts}
						/>
					</div>
				</div>

				<Cart />
			</section>
		</>
	)
}

export default ProductPage
