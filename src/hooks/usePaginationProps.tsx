import { useEffect, useMemo, useState } from 'react'

interface UsePaginationProps<T> {
	data: T[]
	initialItemsPerPage?: number
}

interface UsePaginationResult<T> {
	currentPage: number
	itemsPerPage: number
	totalPages: number
	nextPage: () => void
	prevPage: () => void
	goToPage: (page: number) => void
	currentItems: T[]
}

function usePagination<T>({
	data,
	initialItemsPerPage = 4,
}: UsePaginationProps<T>): UsePaginationResult<T> {
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth

			if (screenWidth > 950) {
				setItemsPerPage(4)
			} else if (screenWidth > 650) {
				setItemsPerPage(3)
			} else {
				setItemsPerPage(2)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const totalItems = data.length
	const totalPages = useMemo(
		() => Math.ceil(totalItems / itemsPerPage),
		[totalItems, itemsPerPage]
	)

	const nextPage = () => {
		setCurrentPage(prev => (prev + 1) % totalPages)
	}

	const prevPage = () => {
		setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
	}

	const goToPage = (page: number) => {
		setCurrentPage(page)
	}

	const currentItems = useMemo(() => {
		const startIndex = currentPage * itemsPerPage
		return data.slice(startIndex, startIndex + itemsPerPage)
	}, [data, currentPage, itemsPerPage])

	return {
		currentPage,
		itemsPerPage,
		totalPages,
		nextPage,
		prevPage,
		goToPage,
		currentItems,
	}
}

export default usePagination
