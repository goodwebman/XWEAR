import React, { useEffect, useRef, useState } from 'react'
import { Filters } from '../../types'

interface PriceFilterProps {
	onFilterChange: (filters: Partial<Filters>) => void
	initialFilters?: Partial<Filters>
}

const MAX_PRICE_LIMIT = 8000

function PriceFilter({ onFilterChange, initialFilters }: PriceFilterProps) {
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(MAX_PRICE_LIMIT)
	const [inputMinPrice, setInputMinPrice] = useState(0)
	const [inputMaxPrice, setInputMaxPrice] = useState(MAX_PRICE_LIMIT)
	const rangeRef = useRef<HTMLDivElement>(null)
	const minThumbRef = useRef<HTMLDivElement>(null)
	const maxThumbRef = useRef<HTMLDivElement>(null)

	const handleInputMinPriceChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInputMinPrice(parseInt(e.target.value, 10) || 0)
	}

	const handleInputMaxPriceChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInputMaxPrice(parseInt(e.target.value, 10) || 0)
	}

	const handleMinPriceChange = () => {
		const newMinPrice = Math.max(0, Math.min(inputMinPrice, maxPrice))
		setMinPrice(newMinPrice)
		onFilterChange({ price: [newMinPrice, maxPrice] })
	}

	const handleMaxPriceChange = () => {
		const newMaxPrice = Math.min(
			MAX_PRICE_LIMIT,
			Math.max(minPrice, inputMaxPrice)
		)
		setMaxPrice(newMaxPrice)
		onFilterChange({ price: [minPrice, newMaxPrice] })
	}

	useEffect(() => {
		if (initialFilters?.price) {
			const initialMin = initialFilters.price[0]
			const initialMax = Math.min(initialFilters.price[1], MAX_PRICE_LIMIT)
			setMinPrice(initialMin)
			setMaxPrice(initialMax)
			setInputMinPrice(initialMin)
			setInputMaxPrice(initialMax)
		}
	}, [initialFilters?.price])

	useEffect(() => {
		const range = rangeRef.current
		const minThumb = minThumbRef.current
		const maxThumb = maxThumbRef.current

		if (!range || !minThumb || !maxThumb) return

		const setThumbPosition = () => {
			const rangeWidth = range.offsetWidth
			const minPosition = (minPrice / MAX_PRICE_LIMIT) * rangeWidth
			const maxPosition = (maxPrice / MAX_PRICE_LIMIT) * rangeWidth
			minThumb.style.left = `${minPosition}px`
			maxThumb.style.left = `${maxPosition}px`
		}

		setThumbPosition()

		const handleMinDrag = (e: MouseEvent) => {
			e.preventDefault()
			let isDragging = true
			const handleMouseMove = (moveEvent: MouseEvent) => {
				if (!isDragging) return
				const rangeRect = range.getBoundingClientRect()
				const position = moveEvent.clientX - rangeRect.left
				const newPrice = Math.max(
					0,
					Math.min(
						MAX_PRICE_LIMIT,
						Math.round((position / rangeRect.width) * MAX_PRICE_LIMIT)
					)
				)

				requestAnimationFrame(() => {
					setMinPrice(newPrice)
					onFilterChange({ price: [newPrice, maxPrice] })
					setThumbPosition()
				})
			}

			const handleMouseUp = () => {
				isDragging = false
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}

			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		}

		const handleMaxDrag = (e: MouseEvent) => {
			e.preventDefault()
			let isDragging = true

			const handleMouseMove = (moveEvent: MouseEvent) => {
				if (!isDragging) return
				const rangeRect = range.getBoundingClientRect()
				const position = moveEvent.clientX - rangeRect.left
				const newPrice = Math.max(
					0,
					Math.min(
						MAX_PRICE_LIMIT,
						Math.round((position / rangeRect.width) * MAX_PRICE_LIMIT)
					)
				)

				requestAnimationFrame(() => {
					setMaxPrice(newPrice)
					onFilterChange({ price: [minPrice, newPrice] })
					setThumbPosition()
				})
			}

			const handleMouseUp = () => {
				isDragging = false
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}

			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		}

		minThumb.addEventListener('mousedown', handleMinDrag)
		maxThumb.addEventListener('mousedown', handleMaxDrag)

		return () => {
			minThumb.removeEventListener('mousedown', handleMinDrag)
			maxThumb.removeEventListener('mousedown', handleMaxDrag)
		}
	}, [minPrice, maxPrice, onFilterChange])

	return (
		<div className='flex flex-col items-center'>
			<div className='flex items-center mb-4'>
				<div className='relative text-[13px] '>
					<input
						type='number'
						placeholder='Мин. цена'
						className=' rounded p-2 text-center bg-[#F8FAFB] text-[#67708A] max-w-[115px] relative appearance-none'
						value={inputMinPrice}
						onChange={handleInputMinPriceChange}
						onBlur={handleMinPriceChange}
					/>
					<span className='absolute right-6 top-1/2 transform -translate-y-1/2 text-[#8D93AB]'>
						₽
					</span>
				</div>
				<span className='mx-2'>-</span>
				<div className='relative text-[13px]'>
					<input
						type='number'
						placeholder='Макс. цена'
						className='rounded p-2 text-center  bg-[#F8FAFB] text-[#67708A] max-w-[115px] relative appearance-none'
						value={inputMaxPrice}
						onChange={handleInputMaxPriceChange}
						onBlur={handleMaxPriceChange}
					/>
					<span className='absolute right-6 top-1/2 transform -translate-y-1/2 text-[#8D93AB]'>
						₽
					</span>
				</div>
			</div>
			<div
				className='relative w-full h-2 bg-gray-200 rounded-full'
				ref={rangeRef}
			>
				<div
					style={{
						left: `${(minPrice / MAX_PRICE_LIMIT) * 100}%`,
						right: `${100 - (maxPrice / MAX_PRICE_LIMIT) * 100}%`,
					}}
					className='absolute h-2 bg-blue-500 rounded-full top-0 transition-all duration-100'
				/>
				<div
					ref={minThumbRef}
					className='absolute w-4 h-4 bg-white border border-gray-300 rounded-full cursor-pointer -top-1 transition-all duration-100'
				/>
				<div
					ref={maxThumbRef}
					className='absolute w-4 h-4 bg-white border border-gray-300 rounded-full cursor-pointer -top-1 bottom-[-230px] transition-all duration-100'
				/>
			</div>
		</div>
	)
}

export default PriceFilter
