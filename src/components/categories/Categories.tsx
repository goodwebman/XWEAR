import { useEffect, useState } from 'react'
import CategoriesItem from './CategoriesItem'
import Pagination from './Pagination'
import usePagination from '../../hooks/usePaginationProps'

interface Item {
	cat: string;
	img: string;
	model: string;
	price: number;
    id: string;
    
}

interface MyComponentProps {
  data: Item[];
  cat: string;
}

const Categories = ({ cat, data} : MyComponentProps) => {
	const {
        currentPage,
        itemsPerPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        currentItems,
    } = usePagination<Item>({ data });

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

				<Pagination
					prevPage={prevPage}
					nextPage={nextPage}
					totalPages={totalPages}
					goToPage={goToPage}
					currentPage={currentPage}
				/>
			</div>
		</section>
	)
}

export default Categories
