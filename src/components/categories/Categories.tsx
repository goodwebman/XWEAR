import { useEffect, useState } from 'react'
import { shoes } from '../../data'
import CategoriesItem from './CategoriesItem'
import Pagination from './Pagination'

const Categories = ({ cat }: { cat: string }) => {
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(4)

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth

			if (screenWidth > 950) {
				setItemsPerPage(4)
			} else if (screenWidth < 950 && screenWidth > 650) {
				setItemsPerPage(3)
			} else if (screenWidth < 650) {
				setItemsPerPage(2)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [itemsPerPage])

	const totalItems = shoes.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	const nextPage = () => {
		setCurrentPage(prev => (prev + 1) % totalPages)
	}

	const prevPage = () => {
		setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
	}

	const goToPage = page => {
		setCurrentPage(page)
	}

	const getCurrentItems = () => {
		const startIndex = currentPage * itemsPerPage
		return shoes.slice(startIndex, startIndex + itemsPerPage)
	}

	const currentItems = getCurrentItems()

	return (
		<section className='px-[20px] max-w-[1362px] m-auto mt-[50px]'>
			<h1 className='font-[900] text-[32px] uppercase leading-[42px] max-[500px]:text-[25px] text-[#121214]'>
				{cat}
			</h1>

			<div className='relative flex flex-col items-center mt-[10px]'>
				<div className='grid max-[950px]:grid-cols-3 max-[650px]:grid-cols-2 grid-cols-4 gap-4 '>
					{currentItems.map(shoe => (
						<CategoriesItem
							key={shoe.id}
							id={shoe.id}
							img={shoe.img}
							model={shoe.model}
							price={shoe.price}
						/>
					))}
				</div>

				<Pagination prevPage={prevPage} nextPage={nextPage} totalPages={totalPages} goToPage={goToPage} currentPage={currentPage}/>
			</div>
		</section>
	)
}

export default Categories
