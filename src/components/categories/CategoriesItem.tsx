import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handsomePrice } from '../../libs/handsomePrice'
import useFavoritesStore from '../../store/FavoriteStore'

type Props = {
	id: string
	img: string
	model: string
	price: number
	brand?: string
	type: string // Add type here
	category: string // Add category here
}

const CategoriesItem = ({
	id,
	img,
	model,
	price,
	brand,
	type,
	category,
}: Props) => {
	const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
	const navigate = useNavigate()

	const isFavorite = favorites.includes(id)

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (isFavorite) {
			removeFavorite(id)
		} else {
			addFavorite(id)
		}
	}

	const handleProductClick = () => {
		const url = `/product?type=${encodeURIComponent(
			type
		)}&category=${encodeURIComponent(category)}&brand=${encodeURIComponent(
			brand || ''
		)}&model=${encodeURIComponent(model)}`
		navigate(url)
	}

	return (
		<button
			onClick={handleProductClick}
			className='text-left flex flex-col justify-center cursor-pointer min-w-[160px]'
		>
			<div className='relative mt-[15px]'>
				<img src={img} alt={model} />
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

			<h2 className='font-[800] text-[20px] leading-[25px] pb-[5px]'>
				{brand} {model}
			</h2>
			<p className='text-[16px] font-[400] align-text-bottom'>
				от {handsomePrice(price)} ₽
			</p>
		</button>
	)
}

export default CategoriesItem
