import useFavoritesStore from '@/store/FavoriteStore'
import { useCallback, useEffect, useRef, useState } from 'react'

interface FavoritesDrawerHookResult {
	isDrawerOpen: boolean
	toggleDrawer: () => void
	closeDrawer: () => void
	favorites: string[]
	removeFavorite: (id: string) => void
	drawerRef: React.RefObject<HTMLDivElement>
}

const useFavoritesDrawer = (): FavoritesDrawerHookResult => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const favorites = useFavoritesStore(state => state.favorites)
	const removeFavorite = useFavoritesStore(state => state.removeFavorite)
	const toggleDrawer = useCallback(() => {
		setIsDrawerOpen(prev => !prev)
	}, [])

	const closeDrawer = useCallback(() => {
		setIsDrawerOpen(false)
	}, [])

	const drawerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				drawerRef.current &&
				!drawerRef.current.contains(event.target as Node)
			) {
				closeDrawer()
			}
		}

		if (isDrawerOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isDrawerOpen, closeDrawer])

	return {
		isDrawerOpen,
		toggleDrawer,
		closeDrawer,
		favorites,
		removeFavorite,
		drawerRef,
	}
}

export default useFavoritesDrawer
