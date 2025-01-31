import { useEffect, useState } from 'react'
import Filter from '../components/catalog/Filter'
import ProductList from '../components/catalog/ProductList'
import SortingFilter from '../components/catalog/SortingFilter'
import Pagination from '../components/Pagination'

import { initialProducts } from '../data'
import { useSearch } from '../hooks/SearchContext'
import usePagination from '../hooks/usePaginationProps'
import useProductFilters from '../hooks/useProductFilters'
import { handsomeItemsCount } from '../libs/handsomeItemsCount'

function CatalogPage() {
	const { searchTerm } = useSearch()
	const isCatalog = true
	const [filteredProductsAfterSearch, setFilteredProductsAfterSearch] =
		useState(initialProducts)
	const { filters, filteredProducts, typeProducts, handleFilterChange, type } =
		useProductFilters({ initialProducts: filteredProductsAfterSearch })

	const {
		currentPage,
		totalPages,
		nextPage,
		prevPage,
		goToPage,
		currentItems,
	} = usePagination({
		data: filteredProducts,
		isCatalog,
	})

	useEffect(() => {
		const filter = () => {
			if (!searchTerm) {
				setFilteredProductsAfterSearch(initialProducts)
				return
			}
			const lowerCaseTerm = searchTerm.toLowerCase()
			const searchWords = lowerCaseTerm.split(' ').filter(word => word) // Разбиваем на слова и убираем пустые
			const filtered = initialProducts.filter(product => {
				const productName = product.model.toLowerCase()
				const productBrand = product.brand.toLowerCase()
				return searchWords.every(
					word => productName.includes(word) || productBrand.includes(word)
				)
			})
			setFilteredProductsAfterSearch(filtered)
		}
		filter()
	}, [searchTerm])
	return (
		<div className='max-w-[1300px] mx-auto px-[20px]'>
			<div className='pt-[15px] pb-[50px]'>
				<div className='text-[#8C8F96] max-[380px]:text-[15px]'>
					Главная &nbsp; / &nbsp; Каталог товаров &nbsp; / &nbsp;{' '}
					<span className='text-[#121214]'>
						{type[0].toUpperCase() + type.slice(1)}
					</span>
				</div>
			</div>
			<div className='flex max-[1000px]:flex-col'>
				<div className='flex items-center justify-between min-[1000px]:hidden '>
					<div className='mb-4 max-[620px]:hidden'>
						<h2 className='text-[32px] font-[900]'>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</h2>
						<p>
							{filteredProducts.length} {handsomeItemsCount(filteredProducts)}{' '}
						</p>
					</div>
					<div className='max-[620px]:hidden'>
						<SortingFilter onFilterChange={handleFilterChange} />
					</div>
					<div className='mb-[30px] hidden max-[620px]:block'>
						<h2 className='text-[32px] font-[900]'>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</h2>
						<p>
							{filteredProducts.length} {handsomeItemsCount(filteredProducts)}{' '}
						</p>
					</div>
				</div>
				<div className=' '>
					<Filter
						onFilterChange={handleFilterChange}
						products={typeProducts}
						initialFilters={filters}
					/>
				</div>
				<div className=' justify-center max-[620px]:flex hidden mb-[20px] max-[460px]:text-[12px]'>
					<SortingFilter onFilterChange={handleFilterChange} />
				</div>
				<div className='min-[1000px]:w-3/4 pl-[20px] '>
					<div className='flex items-center justify-between max-[1000px]:hidden'>
						<div className='mb-4'>
							<h2 className='text-[32px] font-[900]'>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</h2>
							<p>
								{filteredProducts.length} {handsomeItemsCount(filteredProducts)}{' '}
							</p>
						</div>
						<SortingFilter onFilterChange={handleFilterChange} />
					</div>
					<div className='grid grid-cols-3 max-[1000px]:grid-cols-3 max-[1100px]:grid-cols-2 max-[860px]:grid-cols-2 gap-4 mb-[40px]'>
						{currentItems.map(product => (
							<ProductList
								id={product.id}
								type={product.type}
								category={product.category}
								price={product.price}
								size={product.size}
								color={product.color}
								brand={product.brand}
								model={product.model}
								image={product.image}
								colorHex={product.colorHex}
							/>
						))}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						nextPage={nextPage}
						prevPage={prevPage}
						goToPage={goToPage}
						isCatalog={true}
					/>
				</div>
			</div>
		</div>
	)
}

export default CatalogPage
