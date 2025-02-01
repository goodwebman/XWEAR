import { useEffect, useState } from 'react'

import { initialProducts } from '../../data'
import useProductFilters from '../../hooks/useProductFilters'
import { Filters, Product } from '../../types'
import BrandFilter from './BrandFilter'
import CategoryFilter from './CategoryFilter'
import ColorFilter from './ColorFilter'
import ModelFilter from './ModelFilter'
import PriceFilter from './PriceFilter'
import SizeFilter from './SizeFilter'

interface FilterProps {
	onFilterChange: (filters: Partial<Filters>) => void
	products: Product[]
	initialFilters?: Partial<Filters>
}

function Filter({ onFilterChange, products, initialFilters }: FilterProps) {
	const [showFilters, setShowFilters] = useState(true) // Изначально показываем фильтры на больших экранах
	const [isMobile, setIsMobile] = useState(false)
	const { filters, handleResetFilters } = useProductFilters({
		initialProducts,
	})

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
	const colorHex = getUniqueValues(products, 'colorHex')

	useEffect(() => {
		onFilterChange(filters)
	}, [filters])

	useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
            setShowFilters(window.innerWidth >= 1000)
        };


        handleResize()

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


	

	return (
		<div className='space-y-2'>
			<div
				onClick={() => setShowFilters(!showFilters)}
				className={` rounded max-[1000px]:flex  bg-white border mb-[20px] border-gray-300 p-[20px_25px] hidden flex-col `}
			>
				<button className='w-full flex gap-[20px] justify-between items-center cursor-pointer'>
					<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
						Фильтры
					</h3>
					<span className=''>
						{showFilters ? (
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
			</div>
			{showFilters && (
				<section className=''>
					<div
						className={` rounded  bg-white border mb-[20px] border-gray-300 p-[20px_25px] flex flex-col ${
							openFilters.includes('category') ? 'gap-[30px]' : ''
						}`}
					>
						<button
							className='w-full flex justify-between items-center cursor-pointer'
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
						className={` rounded  bg-white border mb-[20px]  border-gray-300 p-[20px_25px] flex flex-col ${
							openFilters.includes('price') ? 'gap-[30px]' : ''
						}`}
					>
						<button
							className='w-full flex justify-between cursor-pointer items-center'
							onClick={() => handleToggleFilter('price')}
						>
							<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
								Фильтр по цене
							</h3>
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
						className={` rounded mb-[20px] bg-white border border-gray-300 p-[20px_25px] flex flex-col ${
							openFilters.includes('sizes') ? 'gap-[30px]' : ''
						}`}
					>
						<button
							className='w-full flex justify-between cursor-pointer items-center'
							onClick={() => handleToggleFilter('sizes')}
						>
							<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
								Размеры (EU)
							</h3>
							<span className=''>
								{openFilters.includes('sizes') ? (
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
						{openFilters.includes('sizes') && (
							<SizeFilter
								sizes={sizes}
								onFilterChange={onFilterChange}
								initialFilters={initialFilters}
							/>
						)}
					</div>
					<div
						className={` rounded mb-[20px] bg-white border border-gray-300 p-[20px_25px] flex flex-col ${
							openFilters.includes('brand') ? 'gap-[30px]' : ''
						}`}
					>
						<button
							className='w-full flex justify-between cursor-pointer items-center'
							onClick={() => handleToggleFilter('brand')}
						>
							<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
								Бренды
							</h3>
							<span className=''>
								{openFilters.includes('brand') ? (
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

						{openFilters.includes('brand') && (
							<BrandFilter
								brands={brands}
								onFilterChange={onFilterChange}
								initialFilters={initialFilters}
							/>
						)}
					</div>
					<div
						className={` rounded mb-[20px] bg-white border border-gray-300 p-[20px_25px] flex flex-col ${
							openFilters.includes('model') ? 'gap-[30px]' : ''
						}`}
					>
						<button
							className='w-full flex justify-between cursor-pointer items-center'
							onClick={() => handleToggleFilter('model')}
						>
							<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
								Модель
							</h3>
							<span className=''>
								{openFilters.includes('model') ? (
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

						{openFilters.includes('model') && (
							<ModelFilter
								models={models}
								onFilterChange={onFilterChange}
								initialFilters={initialFilters}
							/>
						)}
					</div>
					<div
						className={` rounded  bg-white border mb-[20px] border-gray-300 p-[20px_25px] flex flex-col ${
							openFilters.includes('color') ? 'gap-[30px]' : ''
						}`}
					>
						<button
							className='w-full flex justify-between cursor-pointer items-center'
							onClick={() => handleToggleFilter('color')}
						>
							<h3 className='font-[900] text-[#121214] text-[13px] uppercase '>
								Цвет
							</h3>
							<span className=''>
								{openFilters.includes('color') ? (
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
						{openFilters.includes('color') && (
							<ColorFilter
								colors={colors}
								colorHex={colorHex}
								onFilterChange={onFilterChange}
								initialFilters={initialFilters}
							/>
						)}
					</div>
					<button
						className='flex items-center cursor-pointer mb-[20px] font-[900] text-[13px] p-[20px_55px] text-[#121214] whitespace-nowrap gap-[7.5px] border rounded-md mt-[20px] border-[#E6E7EB]'
						onClick={handleResetFilters}
					>
						<svg
							width='9'
							height='8'
							viewBox='0 0 9 8'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1 7.49954L7.99954 0.5M8 7.49977L1.00046 0.50023'
								stroke='#2C2C2C'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>

						<p className='uppercase'>Сбросить все фильтры</p>
					</button>
				</section>
			)}
		</div>
	)
}

export default Filter
