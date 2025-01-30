import { useState } from 'react'
import { Filters, Product } from '../../types'
import BrandFilter from './BrandFilter'
import CategoryFilter from './CategoryFilter'
import ColorFilter from './ColorFilter'
import ModelFilter from './ModelFilter'
import PriceFilter from './PriceFilter'
import SizeFilter from './SizeFilter'
import SortingFilter from './SortingFilter'

interface FilterProps {
	onFilterChange: (filters: Partial<Filters>) => void
	products: Product[]
	initialFilters?: Partial<Filters>
}

function Filter({ onFilterChange, products, initialFilters }: FilterProps) {
	const [openFilters, setOpenFilters] = useState<string[]>([
		'category',
		'price',
		'sizes',
		'brand',
		'model',
		'color',
		'sorting',
	])

	const handleToggleFilter = (filterName: string) => {
		if (openFilters.includes(filterName)) {
			setOpenFilters(openFilters.filter(item => item !== filterName))
		} else {
			setOpenFilters([...openFilters, filterName])
		}
	}

	const getUniqueValues = (products: Product[], key: keyof Product): any[] => {
		return [...new Set(products.map(item => item[key]))]
	}
	const categories = getUniqueValues(products, 'category')
	const sizes = getUniqueValues(products, 'size')
	const brands = getUniqueValues(products, 'brand')
	const models = getUniqueValues(products, 'model')
	const colors = getUniqueValues(products, 'color')
	return (
		<div className='space-y-2'>
			<div
				className={` rounded  bg-white border border-gray-300 p-[20px_25px] flex flex-col ${
					openFilters.includes('category') ? 'gap-[30px]' : ''
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('category')}
				>
					<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
						Категория
					</h3>
					<span className=''>
						{openFilters.includes('category') ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='black'
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
								stroke='black'
								className='size-4 opacity-60'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m19.5 8.25-7.5 7.5-7.5-7.5'
								/>
							</svg>
						)}
					</span>
				</button>

				{openFilters.includes('category') && (
					<CategoryFilter
						categories={categories}
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
			<div
				className={` rounded  bg-white border border-gray-300 p-[20px_25px] flex flex-col ${
					openFilters.includes('price') ? 'gap-[30px]' : ''
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('price')}
				>
					<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>Фильтр по цене</h3>
					<span className=''>
						{openFilters.includes('price') ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='black'
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
								stroke='black'
								className='size-4 opacity-60'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m19.5 8.25-7.5 7.5-7.5-7.5'
								/>
							</svg>
						)}
					</span>
				</button>
				{openFilters.includes('price') && (
					<PriceFilter
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
			<div
				className={`border rounded p-2  ${
					openFilters.includes('sizes') ? 'bg-gray-100' : 'bg-white'
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('sizes')}
				>
					<h3 className='font-bold'>Размеры</h3>
					<span>{openFilters.includes('sizes') ? '▲' : '▼'}</span>
				</button>
				{openFilters.includes('sizes') && (
					<SizeFilter
						sizes={sizes}
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
			<div
				className={`border rounded p-2  ${
					openFilters.includes('brand') ? 'bg-gray-100' : 'bg-white'
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('brand')}
				>
					<h3 className='font-bold'>Бренды</h3>
					<span>{openFilters.includes('brand') ? '▲' : '▼'}</span>
				</button>
				{openFilters.includes('brand') && (
					<BrandFilter
						brands={brands}
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
			<div
				className={`border rounded p-2  ${
					openFilters.includes('model') ? 'bg-gray-100' : 'bg-white'
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('model')}
				>
					<h3 className='font-bold'>Модели</h3>
					<span>{openFilters.includes('model') ? '▲' : '▼'}</span>
				</button>
				{openFilters.includes('model') && (
					<ModelFilter
						models={models}
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
			<div
				className={`border rounded p-2  ${
					openFilters.includes('color') ? 'bg-gray-100' : 'bg-white'
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('color')}
				>
					<h3 className='font-bold'>Цвета</h3>
					<span>{openFilters.includes('color') ? '▲' : '▼'}</span>
				</button>
				{openFilters.includes('color') && (
					<ColorFilter
						colors={colors}
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
			<div
				className={`border rounded p-2  ${
					openFilters.includes('sorting') ? 'bg-gray-100' : 'bg-white'
				}`}
			>
				<button
					className='w-full flex justify-between items-center'
					onClick={() => handleToggleFilter('sorting')}
				>
					<h3 className='font-bold'>Сортировка</h3>
					<span>{openFilters.includes('sorting') ? '▲' : '▼'}</span>
				</button>
				{openFilters.includes('sorting') && (
					<SortingFilter
						onFilterChange={onFilterChange}
						initialFilters={initialFilters}
					/>
				)}
			</div>
		</div>
	)
}

export default Filter
