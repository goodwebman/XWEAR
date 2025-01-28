import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Filters } from '../types'
import { initialProducts } from '../data'
import Filter from '../components/Catalog/Filter'
import ProductList from '../components/Catalog/ProductList'


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
		{ name: 'Каталог товаров', link: '/' },
		{
			name: type.charAt(0).toUpperCase() + type.slice(1),
			link: `/catalog/${type}`,
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
			filters.size.forEach(size => params.append('size', size.toString()))
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

	const handleFilterChange = (newFilters: Partial<Filters>) => {
		setFilters({ ...filters, ...newFilters })
	}
	return (
		<div>
			<div className='bg-gray-200 p-2'>
				{breadcrumbs.map((crumb, index) => (
					<span key={index}>
						{index !== 0 && ' / '}
						{crumb.link ? <a href={crumb.link}>{crumb.name}</a> : crumb.name}
					</span>
				))}
			</div>
			<div className='flex flex-row '>
				<div className='w-1/4 p-4 bg-gray-100'>
					<Filter onFilterChange={handleFilterChange} products={typeProducts} />
				</div>
				<div className='w-3/4 p-4 '>
					<ProductList products={filteredProducts} />
				</div>
			</div>
		</div>
	)
}

export default CatalogPage
