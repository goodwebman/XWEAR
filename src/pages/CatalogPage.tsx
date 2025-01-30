import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Filter from '../components/catalog/Filter'
import ProductList from '../components/catalog/ProductList'
import { initialProducts } from '../data'
import { Breadcrumb, Filters } from '../types'

function CatalogPage() {
	const { type } = useParams<{ type: string }>()
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	const initialFilters: Filters = {
		category: searchParams.getAll('category'),
		price:
			searchParams.getAll('price').length > 0
				? searchParams.getAll('price').map(Number)
				: [0, 10000],
		size: searchParams.getAll('size'),
		brand: searchParams.getAll('brand'),
		model: searchParams.getAll('model'),
		color: searchParams.getAll('color'),
		sorting: searchParams.get('sorting') as 'asc' | 'desc' | null,
	}

	const [filters, setFilters] = useState<Filters>(initialFilters)

	const breadcrumbs: Breadcrumb[] = [
		{ name: 'Каталог товаров' },
		{
			name: type.charAt(0).toUpperCase() + type.slice(1),
		},
	]

	const filteredProducts = useMemo(() => {
		let filtered = initialProducts.filter(
			product => product.type.toLowerCase() === type
		)

		// Фильтрация по категории
		if (filters.category.length > 0) {
			filtered = filtered.filter(product =>
				filters.category.includes(product.category)
			)
		}

		// Фильтрация по цене
		if (filters.price && filters.price.length === 2) {
			filtered = filtered.filter(
				product =>
					product.price >= filters.price[0] && product.price <= filters.price[1]
			)
		}

		// Фильтрация по размеру
		if (filters.size.length > 0) {
			filtered = filtered.filter(product => {
				if (typeof product.size === 'number') {
					return filters.size.includes(product.size.toString())
				} else {
					return filters.size.includes(product.size)
				}
			})
		}

		// Фильтрация по бренду
		if (filters.brand.length > 0) {
			filtered = filtered.filter(product =>
				filters.brand.includes(product.brand)
			)
		}
		// Фильтрация по модели
		if (filters.model.length > 0) {
			filtered = filtered.filter(product =>
				filters.model.includes(product.model)
			)
		}
		// Фильтрация по цвету
		if (filters.color.length > 0) {
			filtered = filtered.filter(product =>
				filters.color.includes(product.color)
			)
		}
		// Сортировка
		if (filters.sorting === 'asc') {
			filtered.sort((a, b) => a.price - b.price)
		} else if (filters.sorting === 'desc') {
			filtered.sort((a, b) => b.price - a.price)
		}

		return filtered
	}, [filters, type])

	const typeProducts = useMemo(() => {
		return initialProducts.filter(
			product => product.type.toLowerCase() === type
		)
	}, [type])

	useEffect(() => {
		const params = new URLSearchParams()
		if (filters.category.length > 0) {
			filters.category.forEach(category => params.append('category', category))
		}
		if (filters.price && filters.price.length === 2) {
			params.append('price', filters.price[0].toString())
			params.append('price', filters.price[1].toString())
		}
		if (filters.size.length > 0) {
			filters.size.forEach(size => {
				if (typeof size === 'number') {
					params.append('size', size.toString())
				} else {
					params.append('size', size)
				}
			})
		}
		if (filters.brand.length > 0) {
			filters.brand.forEach(brand => params.append('brand', brand))
		}
		if (filters.model.length > 0) {
			filters.model.forEach(model => params.append('model', model))
		}
		if (filters.color.length > 0) {
			filters.color.forEach(color => params.append('color', color))
		}
		if (filters.sorting) {
			params.set('sorting', filters.sorting)
		}
		navigate({
			pathname: `/catalog/${type}`,
			search: params.toString(),
		})
	}, [filters, type, navigate])

	const handleResetFilters = () => {
		setFilters({
			category: [],
			price: [0, 8000],
			size: [],
			brand: [],
			model: [],
			color: [],
			sorting: null,
		})
	}

	const handleFilterChange = (newFilters: Partial<Filters>) => {
		setFilters({ ...filters, ...newFilters })
	}

	return (
		<div className='max-w-[1300px] mx-auto px-[20px]'>
			<div className='b p-2'>
				{breadcrumbs.map((crumb, index) => (
					<span key={index}>
						{index !== 0 && ' / '}
						{crumb.link ? <a href={crumb.link}>{crumb.name}</a> : crumb.name}
					</span>
				))}
			</div>
			<div className='flex flex-row '>
				<div className=' '>
					<Filter
						onFilterChange={handleFilterChange}
						products={typeProducts}
						initialFilters={filters}
					/>

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
				</div>
				<div className='w-3/4 pl-[20px] '>
					<div className='mb-4'>
						<h2 className='text-2xl font-bold'>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</h2>
						<p>{filteredProducts.length} товаров</p>
					</div>
					<ProductList products={filteredProducts} />
				</div>
			</div>
		</div>
	)
}

export default CatalogPage
