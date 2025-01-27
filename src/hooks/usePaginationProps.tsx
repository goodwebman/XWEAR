import { useCallback, useEffect, useMemo, useState } from 'react'

interface UsePaginationProps<T> {
	data: T[]
	isBlog?: boolean
	initialItemsPerPage?: number
}

interface UsePaginationResult<T> {
	currentPage: number
	itemsPerPage: number
	totalPages: number
	nextPage: () => void
	prevPage: () => void
	showAll: () => void
	goToPage: (page: number) => void
	currentItems: T[]
}

function usePagination<T>({
	data,
	isBlog,
	initialItemsPerPage = 4,
}: UsePaginationProps<T>): UsePaginationResult<T> {
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
	const [showAllItems, setShowAllItems] = useState(false)

	const totalItems = data.length

	const handleResize = useCallback(() => {
		const screenWidth = window.innerWidth
		let calculatedItemsPerPage: number

		if (isBlog) {
			if (screenWidth <= 500) {
				calculatedItemsPerPage = showAllItems ? totalItems : 1
			} else if (screenWidth <= 1050) {
				calculatedItemsPerPage = showAllItems ? totalItems : 2
			} else {
				calculatedItemsPerPage = showAllItems ? totalItems : 3
			}
		} else if (screenWidth >= 950) {
			calculatedItemsPerPage = showAllItems ? totalItems : 4
		} else if (screenWidth >= 650) {
			calculatedItemsPerPage = showAllItems ? totalItems : 3
		} else {
			calculatedItemsPerPage = showAllItems ? totalItems : 2
		}

		setItemsPerPage(calculatedItemsPerPage)
	}, [isBlog, showAllItems, totalItems])

	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	const showAll = useCallback(() => {
		setShowAllItems(prev => !prev)
	}, [])

	const totalPages = useMemo(
		() => Math.ceil(totalItems / itemsPerPage),
		[totalItems, itemsPerPage]
	)

	const nextPage = useCallback(() => {
		setCurrentPage(prev => (prev + 1) % totalPages)
	}, [totalPages])

	const prevPage = useCallback(() => {
		setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
	}, [totalPages])

	const goToPage = useCallback((page: number) => {
		setCurrentPage(page)
	}, [])

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
		showAll,
	}
}

export default usePagination
