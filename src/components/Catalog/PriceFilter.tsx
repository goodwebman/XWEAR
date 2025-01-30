import React, { useEffect, useRef, useState } from 'react'
import { Filters } from '../../types'

interface PriceFilterProps {
	onFilterChange: (filters: Partial<Filters>) => void
	initialFilters?: Partial<Filters>
}

function PriceFilter({ onFilterChange, initialFilters }: PriceFilterProps) {
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(8000)
	const rangeRef = useRef<HTMLDivElement>(null)
	const minThumbRef = useRef<HTMLDivElement>(null)
	const maxThumbRef = useRef<HTMLDivElement>(null)

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMinPrice = parseInt(e.target.value, 10)
		setMinPrice(newMinPrice)
		onFilterChange({ price: [newMinPrice, maxPrice] })
	}

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMaxPrice = parseInt(e.target.value, 10)
		setMaxPrice(newMaxPrice)
		onFilterChange({ price: [minPrice, newMaxPrice] })
	}

	useEffect(() => {
		if (initialFilters?.price) {
			setMinPrice(initialFilters.price[0])
			setMaxPrice(initialFilters.price[1])
		}
	}, [initialFilters?.price])

	useEffect(() => {
		const range = rangeRef.current
		const minThumb = minThumbRef.current
		const maxThumb = maxThumbRef.current

		if (!range || !minThumb || !maxThumb) return

		const setThumbPosition = () => {
			const rangeWidth = range.offsetWidth
			const minPosition = (minPrice / 8000) * rangeWidth
			const maxPosition = (maxPrice / 8000) * rangeWidth
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
					Math.min(10000, Math.round((position / rangeRect.width) * 8000))
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
					Math.min(8000, Math.round((position / rangeRect.width) * 8000))
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
						value={minPrice}
						onChange={handleMinPriceChange}
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
						value={maxPrice}
						onChange={handleMaxPriceChange}
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
						left: `${(minPrice / 8000) * 100}%`,
						right: `${100 - (maxPrice / 8000) * 100}%`,
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
